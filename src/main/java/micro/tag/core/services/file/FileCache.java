package micro.tag.core.services.file;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class FileCache {
	private static final Logger logger = LogManager.getLogger(FileCache.class);
	private Map<String, byte[]> byteMap;

	@PostConstruct
	public void onInit() {
		logger.info("==== FileCache is initialized ====");
		byteMap = new HashMap<>();
	}

	public void put(String key, byte[] fileBytes) {
		byteMap.put(key, fileBytes);
	}

	public Optional<byte[]> get(String key) {
		return Optional.ofNullable(byteMap.get(key));
	}
}
