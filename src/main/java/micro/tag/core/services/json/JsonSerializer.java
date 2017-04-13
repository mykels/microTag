package micro.tag.core.services.json;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public interface JsonSerializer {
	<T> T fromJson(String json, Class<T> tClass) throws IOException;

	Optional<String> toJson(Object object);
}
