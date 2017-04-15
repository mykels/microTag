package micro.tag.controllers;

import micro.tag.core.services.file.ZipCreator;
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

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class LogController {
	private static final Logger logger = LogManager.getLogger(LogController.class);

	private ZipCreator zipCreator;
	private JsonSerializer jsonSerializer;
	private Environment env;

	@Autowired
	public LogController(ZipCreator zipCreator, JsonSerializer jsonSerializer, Environment env) {
		this.zipCreator = zipCreator;
		this.jsonSerializer = jsonSerializer;
		this.env = env;
	}

	@PostConstruct
	public void onInit() {
		logger.info("==== LogController is initialized ====");
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
		File file = new File(getLogPathFor(fileName));
		InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

		return ResponseEntity.ok()
				.header("Content-Disposition", String.format("attachment; filename=%s.sLog", fileName))
				.contentLength(file.length())
				.contentType(MediaType.parseMediaType("application/octet-stream"))
				.body(resource);
	}

	private ResponseEntity<Resource> downloadMultipleFiles(String[] filesToDownload) throws Exception {
		File zipFile = zipCreator.create(prepareLogPaths(filesToDownload), "logs.zip");

		InputStreamResource resource = new InputStreamResource(new FileInputStream(zipFile));

		return ResponseEntity.ok()
				.header("Content-Disposition", "attachment; filename=logs.zip")
				.contentLength(zipFile.length())
				.contentType(MediaType.parseMediaType("application/zip"))
				.body(resource);
	}

	private List<File> prepareLogPaths(String[] filesToDownload) {
		return Arrays.stream(filesToDownload)
				.map(this::getLogPathFor)
				.map(File::new)
				.collect(Collectors.toList());
	}

	private String getLogPathFor(String fileName) {
		if (!fileName.endsWith(".sLog")) {
			fileName += ".sLog";
		}

		return env.getProperty("resource.path") + File.separator + "logs" + File.separator + fileName;
	}
}
