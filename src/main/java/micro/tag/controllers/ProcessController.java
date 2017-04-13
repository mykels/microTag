package micro.tag.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;

@RestController
@CrossOrigin
public class ProcessController {
	private static final Logger logger = LogManager.getLogger(ProcessController.class);

	@PostConstruct
	public void onInit() {
		logger.info("==== ProcessController is initialized ====");
	}

	@RequestMapping(value = "/kill", method = RequestMethod.GET)
	public ResponseEntity kill() {
		logger.warn("Killing application gracefully ...");
		System.exit(0);
		return ResponseEntity.ok("killed");
	}
}
