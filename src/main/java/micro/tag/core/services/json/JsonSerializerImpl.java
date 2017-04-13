package micro.tag.core.services.json;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.Optional;

@Component
public class JsonSerializerImpl implements JsonSerializer {
	private static final Logger logger = LogManager.getLogger(JsonSerializerImpl.class);

	@PostConstruct
	public void onInit() {
		logger.info("==== JsonSerializer is initialized ====");
	}

	@Override
	public <T> T fromJson(String json, Class<T> tClass) throws IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.readValue(json, tClass);
	}

	@Override
	public Optional<String> toJson(Object object) {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.setVisibility(PropertyAccessor.FIELD,
				JsonAutoDetect.Visibility.ANY);
		try {
			return Optional.ofNullable(objectMapper.writeValueAsString(object));
		} catch (JsonProcessingException e) {
			logger.warn("Error while serializing object, see causing exception", e);
			return Optional.empty();
		}
	}
}
