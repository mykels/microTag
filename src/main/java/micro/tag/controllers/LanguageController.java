package micro.tag.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import micro.tag.core.services.http.ResponseStatus;
import micro.tag.core.services.http.ResponseWrapperBuilder;
import micro.tag.core.services.json.JsonSerializer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class LanguageController {
	private static final Logger logger = LogManager.getLogger(LanguageController.class);
	private final JsonSerializer jsonSerializer;
	private final micro.tag.core.services.file.FileReader fileReader;
	private Environment env;

	@Autowired
	public LanguageController(JsonSerializer jsonSerializer,
	                          micro.tag.core.services.file.FileReader fileReader,
	                          Environment env) {
		this.jsonSerializer = jsonSerializer;
		this.fileReader = fileReader;
		this.env = env;
	}

	@PostConstruct
	public void onInit() {
		logger.info("==== LanguageController is initialized ====");
	}

	@RequestMapping(path = "/languages", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity getAvailable() {
		logger.info("Getting languages ...");

		List<String> languages = getLanguages();

		return jsonSerializer.toJson(ResponseWrapperBuilder.of(languages).build())
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.badRequest().body(null));
	}

	@RequestMapping(path = "/languages/translation/{translationFileName}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity getTranslation(@PathVariable String translationFileName) {
		logger.info("Getting language translation for {} ...", translationFileName);

		if (!translationFileName.endsWith(".json")) {
			translationFileName += ".json";
		}

		try {
			String translation = fileReader.read(File.separator + "languages" + File.separator + translationFileName);

			ObjectMapper objectMapper = new ObjectMapper();
			return jsonSerializer.toJson(ResponseWrapperBuilder.of(objectMapper.readTree(translation)).build())
					.map(ResponseEntity::ok)
					.orElse(ResponseEntity.badRequest().body(null));
		} catch (Exception e) {
			logger.error("Error while reading translation, see causing exception", e);
		}

		return jsonSerializer.toJson(ResponseWrapperBuilder.of(ResponseStatus.FAILURE).build())
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.badRequest().body(null));
	}

	private List<String> getLanguages() {
		List<String> languages = new ArrayList<>();
		File file = new File(env.getProperty("resource.path") + File.separator + "languages");

		if (file.exists() && file.isDirectory()) {
			File[] files = file.listFiles();

			if (files != null && files.length > 0) {
				for (File language : files) {
					languages.add(language.getName());
				}
			}
		}

		return languages;
	}
}
