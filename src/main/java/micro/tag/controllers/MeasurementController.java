package micro.tag.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
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
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.Function;

@RestController
@CrossOrigin
public class MeasurementController {
	private static final Logger logger = LogManager.getLogger(MeasurementController.class);

	private JsonSerializer jsonSerializer;
	private Environment env;

	private int pointCount = 1;

	@Autowired
	public MeasurementController(JsonSerializer jsonSerializer, Environment env) {
		this.jsonSerializer = jsonSerializer;
		this.env = env;
	}

	@PostConstruct
	public void onInit() {
		logger.info("==== MeasurementController is initialized ====");
	}

	@RequestMapping(path = "/measurement/points", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity getPoints() {
		logger.info("Getting measurement points .... ");
		JsonNode points = generateMeasurementPoints();

		return jsonSerializer.toJson(ResponseWrapperBuilder.of(points).build())
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.badRequest().body(null));
	}

	@RequestMapping(path = "/measurement/point", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity getPoint() {
		logger.info("Getting measurement point .... ");
		JsonNode points = generateMeasurementPoint();

		return jsonSerializer.toJson(ResponseWrapperBuilder.of(points).build())
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.badRequest().body(null));
	}

	private JsonNode generateMeasurementPoint() {
		return generatePoint(pointCount++, randomInInterval(1400, 3600));
	}

	private int randomInInterval(int min, int max) {
		return ThreadLocalRandom.current().nextInt(min, max + 1);
	}

	@RequestMapping(path = "/measurement/session/points", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity getSessionPoints() {
		logger.info("Getting measurement session points .... ");
		pointCount = 1;

		JsonNode points = generateMeasurementSessionPoints();

		return jsonSerializer.toJson(ResponseWrapperBuilder.of(points).build())
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.badRequest().body(null));
	}

	private JsonNode generateMeasurementSessionPoints() {
		com.fasterxml.jackson.databind.node.ObjectNode points = new com.fasterxml.jackson.databind.node.ObjectNode(JsonNodeFactory.instance);
		points.set("minLine", generateMinLinePoints());
		points.set("maxLine", generateMaxLinePoints());
		return points;
	}

	private JsonNode generateMinLinePoints() {
		return this.generateMeasurementPoints(i -> 1500.0);
	}

	private JsonNode generateMaxLinePoints() {
		return this.generateMeasurementPoints(i -> 3500.0);
	}

	private JsonNode generateMeasurementPoints() {
		com.fasterxml.jackson.databind.node.ObjectNode points = new com.fasterxml.jackson.databind.node.ObjectNode(JsonNodeFactory.instance);
		points.set("powTwo", generatePowTwoPoints());
		points.set("powThree", generatePowFourPoints());
		points.set("log", generateLogPoints());
		return points;
	}

	private ArrayNode generatePowTwoPoints() {
		return this.generateMeasurementPoints(i -> Math.pow(i, 2));
	}

	private ArrayNode generatePowFourPoints() {
		return this.generateMeasurementPoints(i -> Math.pow(i, 3));
	}

	private JsonNode generateLogPoints() {
		return this.generateMeasurementPoints(i -> Math.log(i) * 400);
	}

	private ArrayNode generateMeasurementPoints(Function<Integer, Double> func) {
		ArrayNode points = new ArrayNode(JsonNodeFactory.instance);

		for (int i = 1; i <= 10; i++) {
			points.add(generatePoint(i, func.apply(i)));
		}

		return points;
	}

	private ObjectNode generatePoint(double x, double y) {
		ObjectNode point = new ObjectNode(JsonNodeFactory.instance);
		point.put("x", x);
		point.put("y", y);
		return point;
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
