package micro.tag.controllers;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import micro.tag.core.services.http.ResponseStatus;
import micro.tag.core.services.http.ResponseWrapperBuilder;
import micro.tag.core.services.json.JsonSerializer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@RestController
@CrossOrigin
public class LogFileController {
	private static final Logger logger = LogManager.getLogger(LogFileController.class);

	private JsonSerializer jsonSerializer;
	private ArrayNode logFiles;

	@Autowired
	public LogFileController(JsonSerializer jsonSerializer) {
		this.jsonSerializer = jsonSerializer;
	}

	@PostConstruct
	public void onInit() {
		logger.info("==== LogFileController is initialized ====");
		initLogFiles();
	}

	private void initLogFiles() {
		logFiles = new ArrayNode(JsonNodeFactory.instance);

		ObjectNode firstLogFile = new ObjectNode(JsonNodeFactory.instance);
		firstLogFile.put("name", "23Mar17_16_23_213.sLog");
		firstLogFile.put("date", getLogDate(23, 3));

		ObjectNode secondLogFile = new ObjectNode(JsonNodeFactory.instance);
		secondLogFile.put("name", "25Mar17_12_02_311.sLog");
		secondLogFile.put("datHttpHandler.deletee",getLogDate(25, 3));

		ObjectNode thirdLogFile = new ObjectNode(JsonNodeFactory.instance);
		thirdLogFile.put("name", "27Mar17_14_52_413.sLog");
		thirdLogFile.put("date", getLogDate(27, 3));

		logFiles.add(firstLogFile).add(secondLogFile).add(thirdLogFile);
	}

	private long getLogDate(int dayOfMonth, int month) {
		return LocalDateTime.of(2017, month, dayOfMonth, 0, 0)
				.toInstant(ZoneOffset.ofTotalSeconds(0)).toEpochMilli();
	}

	@RequestMapping(path = "/log/files", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity getAll() {
		return jsonSerializer.toJson(ResponseWrapperBuilder.of(logFiles).build())
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.badRequest().body(null));
	}

	@RequestMapping(path = "/log/files/{logFileName}", method = RequestMethod.DELETE, produces = "application/json")
	public ResponseEntity delete(@PathVariable String logFileName) {
		ResponseStatus responseStatus = deleteLogFile(logFileName) ? ResponseStatus.SUCCESS : ResponseStatus.FAILURE;
		return jsonSerializer.toJson(ResponseWrapperBuilder.of(responseStatus).build())
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.badRequest().body(null));
	}

	private boolean deleteLogFile(String logFileName) {
		for (int i = 0; i < logFiles.size(); i++) {
			if (logFiles.get(i).get("name").toString().contains(logFileName)) {
				logFiles.remove(i);
				return true;
			}
		}

		return false;
	}
}
