package micro.tag.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import micro.tag.core.services.file.FileWriter;
import micro.tag.core.services.http.ResponseStatus;
import micro.tag.core.services.http.ResponseWrapperBuilder;
import micro.tag.core.services.json.JsonSerializer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class DeviceController {
	private static final Logger logger = LogManager.getLogger(DeviceController.class);
	private final JsonSerializer jsonSerializer;
	private final micro.tag.core.services.file.FileReader fileReader;
	private FileWriter fileWriter;
	private Environment env;

	private ObjectNode deviceSettings;

	@Autowired
	public DeviceController(JsonSerializer jsonSerializer,
	                        micro.tag.core.services.file.FileReader fileReader,
	                        micro.tag.core.services.file.FileWriter fileWriter,
	                        Environment env) {
		this.jsonSerializer = jsonSerializer;
		this.fileReader = fileReader;
		this.fileWriter = fileWriter;
		this.env = env;
	}


	@PostConstruct
	public void onInit() {
		logger.info("==== DeviceController is initialized ====");

		initDeviceConfiguration();
	}

	private void initDeviceConfiguration() {
		try {
			String deviceSettingsStr = fileReader.read("device-settings.json");
			ObjectMapper objectMapper = new ObjectMapper();
			deviceSettings = (ObjectNode) objectMapper.readTree(deviceSettingsStr);
		} catch (IOException e) {
			logger.error("Error while loading device settings, see causing exception", e);
		}
	}

	@RequestMapping(path = "/device/settings", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity get() {
		logger.info("Getting device settings ...");

		return jsonSerializer.toJson(ResponseWrapperBuilder.of(deviceSettings).build())
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.badRequest().body(null));
	}

	@RequestMapping(path = "/device/settings", method = RequestMethod.POST, produces = "application/json")
	public ResponseEntity save(@RequestBody String body) throws IOException {
		logger.info("Saving device settings ...");
		saveSettings(body);
		logger.info("Device settings are saved!");


		return jsonSerializer.toJson(ResponseWrapperBuilder.of(deviceSettings).build())
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.badRequest().body(null));
	}

	@RequestMapping(path = "/device/settings/download", method = RequestMethod.GET)
	public ResponseEntity<Resource> download() throws IOException {
		logger.info("Downloading device settings ...");

		File deviceSettings = fileReader.getFile("device-settings.json");
		InputStreamResource resource = new InputStreamResource(new FileInputStream(deviceSettings));

		return ResponseEntity.ok()
				.header("Content-Disposition", "attachment; filename=device-settings.json")
				.contentLength(deviceSettings.length())
				.contentType(MediaType.parseMediaType("application/octet-stream"))
				.body(resource);
	}

	@RequestMapping(value = "/device/settings/upload", method = RequestMethod.PUT)
	public ResponseEntity upload(@RequestParam("file") MultipartFile file,
	                             RedirectAttributes redirectAttributes) {

		try {
			logger.info("Uploading device settings ...");

			File uploadedConfiguration = multipartToFile(file);
			String deviceSettingsStr = Files.readAllLines(Paths.get(uploadedConfiguration.getAbsolutePath()),
					Charset.forName("UTF-8")).stream().collect(Collectors.joining("\n"));

			saveSettings(deviceSettingsStr);

			return jsonSerializer.toJson(ResponseWrapperBuilder
					.of(ResponseStatus.SUCCESS).build())
					.map(ResponseEntity::ok)
					.orElse(ResponseEntity.badRequest().body(null));

		} catch (IOException e) {
			logger.error("Error while handling uploaded file, see causing exception: ", e);
		}

		return ResponseEntity.badRequest().body(null);
	}

	private File multipartToFile(MultipartFile multipart) throws IllegalStateException, IOException {
		File updatedSettings = new File(env.getProperty("resource.path") +
				File.separator + multipart.getOriginalFilename());

		multipart.transferTo(updatedSettings);
		return updatedSettings;
	}

	private void saveSettings(String settings) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		JsonNode updatedDeviceSettings = mapper.readTree(settings);
		updatedDeviceSettings(updatedDeviceSettings);
		fileWriter.write("device-settings.json", deviceSettings.toString());
	}

	private void updatedDeviceSettings(JsonNode updatedDeviceSettings) {
		updateSetting("wifiApName", updatedDeviceSettings);
		updateSetting("wifiApPassword", updatedDeviceSettings);
		updateSetting("mdDnsName", updatedDeviceSettings);
		updateSetting("secureServer", updatedDeviceSettings);
		updateSetting("volume", updatedDeviceSettings);
		updateSetting("lcdBrightness", updatedDeviceSettings);
		updateSetting("logLevel", updatedDeviceSettings);
	}

	private void updateSetting(String field, JsonNode updatedDeviceSettings) {
		deviceSettings.set(field, updatedDeviceSettings.get(field));
	}

}
