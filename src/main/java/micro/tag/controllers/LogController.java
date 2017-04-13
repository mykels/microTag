package micro.tag.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import micro.tag.core.services.file.ZipCreator;
import micro.tag.core.services.http.ResponseStatus;
import micro.tag.core.services.http.ResponseWrapperBuilder;
import micro.tag.core.services.json.JsonSerializer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.Arrays;

@RestController
@CrossOrigin
public class LogController {
	private static final Logger logger = LogManager.getLogger(LogController.class);

	private ZipCreator zipCreator;
	private JsonSerializer jsonSerializer;

	@Autowired
	public LogController(ZipCreator zipCreator, JsonSerializer jsonSerializer) {
		this.zipCreator = zipCreator;
		this.jsonSerializer = jsonSerializer;
	}

	@PostConstruct
	public void onInit() {
		logger.info("==== LogController is initialized ====");
	}


	@RequestMapping(path = "/logs/{logFileName}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity getLogs(@PathVariable String logFileName) {
		try {
			JsonNode logsJson = generateLogs(logFileName);
			return jsonSerializer.toJson(ResponseWrapperBuilder.of(logsJson).build())
					.map(ResponseEntity::ok)
					.orElse(ResponseEntity.badRequest().body(null));
		} catch (JSONException e) {
			return jsonSerializer.toJson(ResponseWrapperBuilder.of(ResponseStatus.FAILURE).error(e).build())
					.map(ResponseEntity::ok)
					.orElse(ResponseEntity.badRequest().body(null));
		}
	}

	private JsonNode generateLogs(String logFileName) throws JSONException {
		ObjectNode logsJson = new ObjectNode(JsonNodeFactory.instance);
		ArrayNode logLines = new ArrayNode(JsonNodeFactory.instance);

		logsJson.set("logs", logLines);

		for (int i = 0; i <= 1000; i++) {

			if (logFileName.contains("311")) {
				break;
			}

			String level = generateLogLevel();

			ObjectNode logLine = new ObjectNode(JsonNodeFactory.instance);
			logLine.put("index", i + 1);
			logLine.put("level", level);
			logLine.put("value", String.format("%s This is log line #%s for %s and it should be treated accordingly",
					level, i + 1, logFileName));

			logLines.add(logLine);
		}

		return logsJson;
	}

	private String generateLogLevel() {
		int random = (int) Math.floor(Math.random() * 100);
		return random % 2 == 0 ? "DEBUG" : "NORMAL";
	}

	@RequestMapping(path = "/logs/download/{logs}", method = RequestMethod.GET)
	public ResponseEntity<Resource> download(@PathVariable String logs) {

		try {
			String[] logsToDownload = logs.split(",");

			if (logsToDownload.length == 0) {
				logger.error("No Files provided for download!");
			} else if (logsToDownload.length == 1) {
				return downloadSingleFile(logsToDownload[0]);
			} else {
				return downloadMultipleFiles(logsToDownload);
			}
		} catch (Exception e) {
			logger.error("Error while downloading files, see causing exception", e);
		}
		return (ResponseEntity<Resource>) ResponseEntity.badRequest();
	}

	private ResponseEntity<Resource> downloadSingleFile(String fileName) throws FileNotFoundException {
		File file = new File("C:\\devl\\work\\MicroTag\\logs\\sportale.txt");
		InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

		return ResponseEntity.ok()
				.header("Content-Disposition", String.format("attachment; filename=%s.sLog", fileName))
				.contentLength(file.length())
				.contentType(MediaType.parseMediaType("application/octet-stream"))
				.body(resource);
	}

	private ResponseEntity<Resource> downloadMultipleFiles(String[] filesToDownload) throws Exception {

		File sportale = new File("C:\\devl\\work\\MicroTag\\logs\\sportale.txt");
		File sportaleServer = new File("C:\\devl\\work\\MicroTag\\logs\\sportale-server.txt");

		File zipFile = zipCreator.create(Arrays.asList(sportale, sportaleServer), "logs.zip");

		InputStreamResource resource = new InputStreamResource(new FileInputStream(zipFile));

		return ResponseEntity.ok()
				.header("Content-Disposition", "attachment; filename=logs.zip")
				.contentLength(zipFile.length())
				.contentType(MediaType.parseMediaType("application/zip"))
				.body(resource);
	}
}
