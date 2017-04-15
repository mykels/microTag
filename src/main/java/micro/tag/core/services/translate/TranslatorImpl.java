package micro.tag.core.services.translate;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.translate.Translate;
import com.google.api.services.translate.Translate.Translations;
import com.google.api.services.translate.model.TranslationsResource;
import micro.tag.domain.model.language.Language;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TranslatorImpl implements Translator {
	private static final org.apache.logging.log4j.Logger logger = LogManager.getLogger(TranslatorImpl.class);

	private Translate translate;
	private Environment env;

	@Autowired
	public TranslatorImpl(Environment env) {
		this.env = env;
	}

	@PostConstruct
	public void onInit() throws Exception {
		initializeTranslate();
		logger.info("==== Translator is initialized ====");
	}

	private void initializeTranslate() throws Exception {
		NetHttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
		JacksonFactory jacksonFactory = JacksonFactory.getDefaultInstance();
		this.translate = new Translate.Builder(httpTransport, jacksonFactory, null)
				.setApplicationName(env.getProperty("application.name"))
				.build();
	}

	@Override
	public String translate(String text, Language language) throws Exception {
		return translate(Collections.singletonList(text.toLowerCase()), language).get(0);
	}

	@Override
	public List<String> translate(List<String> lst, Language language) throws Exception {
		Translations translations = this.translate.new Translations();
		Translate.Translations.List list = translations.list(lst, language.name().toUpperCase());
		list.setKey(env.getProperty("translate.api.key"));

		return list.execute().getTranslations().stream()
				.map(TranslationsResource::getTranslatedText)
				.collect(Collectors.toList());
	}
}
