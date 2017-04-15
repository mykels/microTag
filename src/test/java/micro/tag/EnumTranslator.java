package micro.tag;

import micro.tag.core.services.file.FileReader;
import micro.tag.core.services.file.FileWriter;
import micro.tag.core.services.translate.Translator;
import micro.tag.domain.model.language.Language;
import micro.tag.main.Bootstrapper;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.File;
import java.util.Arrays;
import java.util.List;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = Bootstrapper.class)
public class EnumTranslator {
	private static final String sourceFileName = File.separator + "languages" + File.separator + "en.json";
	private static final List<Language> translatedLanguages = Arrays.asList(
			Language.ru,
			Language.it,
			Language.zh,
			Language.ja,
			Language.he);
	@Autowired
	private Translator translator;

	@Autowired
	private FileReader fileReader;

	@Autowired
	private FileWriter fileWriter;

	@Autowired
	private Environment env;

	@Test
	public void translateToLanguages() throws Exception {
		translatedLanguages.forEach(this::translateToLanguages);
	}

	private void translateToLanguages(Language translatedLanguage) {
		System.out.println("=======================================");
		System.out.println("Translating for: " + translatedLanguage.getTongue());

		try {
			String enJsonString = fileReader.read(sourceFileName);
			JSONObject enJson = new JSONObject(enJsonString);

			JSONObject translatedJson = new JSONObject();

			enJson.keys().forEachRemaining(key -> {
				try {
					translatedJson.put((String) key, translateKey(enJson.getString((String) key), translatedLanguage));
				} catch (JSONException e) {
					e.printStackTrace();
				}
			});

			String translatedFileName = File.separator + "languages" + File.separator + translatedLanguage.getName().toLowerCase() + ".json";

			fileWriter.write(translatedFileName, translatedJson.toString());

			System.out.println("Finished translating for: " + translatedLanguage.getTongue());
			System.out.println("=======================================");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private String translateKey(String key, Language translatedLanguage) {
		String translatedKey = null;

		try {
			translatedKey = translator.translate(key.toLowerCase(), translatedLanguage).replace("-", "");
		} catch (Exception e) {
			e.printStackTrace();
		}

		return translatedKey;
	}

}
