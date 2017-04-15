package micro.tag.domain.model.stream;

import java.util.*;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class StreamDecorator {
	public static <T> StreamExtension<T> of(T[] array) {
		return new StreamExtension<>(Arrays.stream(array));
	}

	public static <T> StreamExtension<T> of(Collection<T> collection) {
		return new StreamExtension<>(collection.stream());
	}

	public static <T> StreamExtension<T> of(Iterator<T> iterator) {
		Spliterator<T> spliterator = Spliterators.spliteratorUnknownSize(iterator, Spliterator.ORDERED);
		Stream<T> stream = StreamSupport.stream(spliterator, false);
		return new StreamExtension<>(stream);
	}
}

