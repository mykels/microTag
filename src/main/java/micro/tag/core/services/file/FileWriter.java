package micro.tag.core.services.file;

import org.apache.commons.io.FileUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;

@Service
public class FileWriter {
	private static final Logger logger = LogManager.getLogger(FileWriter.class);

	private Environment env;

	@Autowired
	public FileWriter(Environment env) {
		this.env = env;
	}

	@PostConstruct
	public void onInit() {
		logger.info("==== FileWriter is initialized ====");
	}

	public void write(String fileName, String data) throws IOException {
		File file = new File(env.getProperty("resource.path") + File.separator + fileName);
		FileUtils.write(file, data, "UTF-8");
	}

}
