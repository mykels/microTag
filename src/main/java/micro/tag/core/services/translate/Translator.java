package micro.tag.core.services.translate;

import micro.tag.domain.model.language.Language;

import java.util.List;

public interface Translator {
	String translate(String text, Language language) throws Exception;

	List<String> translate(List<String> lst, Language language) throws Exception;
}
