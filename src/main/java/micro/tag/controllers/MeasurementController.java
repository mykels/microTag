package micro.tag.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import micro.tag.core.services.http.ResponseWrapperBuilder;
import micro.tag.core.services.json.JsonSerializer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;

@RestController
@CrossOrigin
public class MeasurementController {
	private static final Logger logger = LogManager.getLogger(MeasurementController.class);

	private JsonSerializer jsonSerializer;
	private Environment env;

	@Autowired
	public MeasurementController(JsonSerializer jsonSerializer, Environment env) {
		this.jsonSerializer = jsonSerializer;
		this.env = env;
	}

	@PostConstruct
	public void onInit() {
		logger.info("==== MeasurementController is initialized ====");
	}

	@RequestMapping(path = "/measurement/run", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity run() {
		logger.info("Running measurement .... ");
		JsonNode result = generateMeasurement();

		return jsonSerializer.toJson(ResponseWrapperBuilder.of(result).build())
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.badRequest().body(null));
	}

	private JsonNode generateMeasurement() {
		com.fasterxml.jackson.databind.node.ObjectNode measurement = new com.fasterxml.jackson.databind.node.ObjectNode(JsonNodeFactory.instance);
		measurement.set("result", generateResult());
		return measurement;
	}

	private ArrayNode generateResult() {
		ArrayNode arrayNode = new ArrayNode(JsonNodeFactory.instance);
		arrayNode.add("google_base");
		arrayNode.add("google_israel");

		return arrayNode;
	}
}
