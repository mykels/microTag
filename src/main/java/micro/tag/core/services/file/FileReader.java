package micro.tag.core.services.file;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
public class FileReader {
	private static final Logger logger = LogManager.getLogger(FileReader.class);
	private Environment env;

	@Autowired
	public FileReader(Environment env) {
		this.env = env;
	}

	@PostConstruct
	public void onInit() {
		logger.info("==== FileReader is initialized ====");
	}

	public File getFile(String fileName) throws IOException {
		return new File(env.getProperty("resource.path") + File.separator + fileName);
	}

	public List<String> read(String fileName) throws IOException {
		return Files.readAllLines(Paths.get(getFile(fileName).getAbsolutePath()), Charset.forName("UTF-8"));
	}

}
