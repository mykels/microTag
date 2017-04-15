package micro.tag.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import micro.tag.core.services.file.FileWriter;
import micro.tag.core.services.http.ResponseWrapperBuilder;
import micro.tag.core.services.json.JsonSerializer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@RestController
@CrossOrigin
public class ReportController {
	private static final Logger logger = LogManager.getLogger(ReportController.class);
	private final JsonSerializer jsonSerializer;
	private final micro.tag.core.services.file.FileReader fileReader;
	private FileWriter fileWriter;
	private Environment env;

	private ObjectNode deviceSettings;

	@Autowired
	public ReportController(JsonSerializer jsonSerializer,
	                        micro.tag.core.services.file.FileReader fileReader,
	                        FileWriter fileWriter,
	                        Environment env) {
		this.jsonSerializer = jsonSerializer;
		this.fileReader = fileReader;
		this.fileWriter = fileWriter;
		this.env = env;
	}


	@PostConstruct
	public void onInit() {
		logger.info("==== ReportController is initialized ====");
	}

	@RequestMapping(path = "/report/{startDate}/{endDate}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity getByDate(@PathVariable String startDate, @PathVariable String endDate) {
		logger.info("Getting reports from {} to {}", startDate, endDate);
		JsonNode reports = generateReports();
		return jsonSerializer.toJson(ResponseWrapperBuilder.of(reports).build())
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.badRequest().body(null));
	}

	private JsonNode generateReports() {
		ArrayNode reports = new ArrayNode(JsonNodeFactory.instance);

		for (int i = 0; i < Math.floor(Math.random() * 100); i++) {
			reports.add(generateReport());
		}

		return reports;
	}

	private ObjectNode generateReport() {
		ObjectNode reportNode = new ObjectNode(JsonNodeFactory.instance);

		int reportDayOfMonth = (int) (Math.floor(Math.random() * 1000) % 20) + 1;
		int reportMonth = (int) (Math.floor(Math.random() * 1000) % 10) + 1;

		reportNode.put("date", getReportDate(reportDayOfMonth, reportMonth));
		reportNode.put("result", "HIGH EMI");
		reportNode.put("amp", Math.random());
		reportNode.put("snr", Math.random() + 4);
		reportNode.put("tagId", generateString());
		reportNode.put("swId", "G3.5-4-dev");
		reportNode.put("hwId", generateString());
		reportNode.put("serial", "#" + generateString() + "sd2");
		reportNode.put("eSignature", generateString() + "E1FA9208D38FBAA881BE1EFAA741E22C7BBE2B62107D6099227EDA9E6");

		return reportNode;
	}

	private long getReportDate(int dayOfMonth, int month) {
		return LocalDateTime.of(2017, month, dayOfMonth, 0, 0)
				.toInstant(ZoneOffset.ofTotalSeconds(0)).toEpochMilli();
	}

	private String generateString() {
		StringBuilder $ = new StringBuilder();

		String[] template = new String[]{"A", "B", "C", "D", "E", "F", "G"};

		for (int i = 0; i < 5; i++) {
			$.append(template[(int) (Math.random() * 100) % 7]);
		}

		return $.toString();
	}
}
