package micro.tag.domain.model.stream;

import java.util.List;
import java.util.Optional;
import java.util.function.BiPredicate;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class StreamExtension<T> {
	private Stream<T> stream;

	StreamExtension(Stream<T> stream) {
		this.stream = stream;
	}

	public <U> Optional<T> findEqual(U itemToFind) {
		return findEqual(itemToFind, item -> item);
	}

	public <U> Optional<T> findEqual(U itemToFind, Function<T, U> itemManipulator) {
		return findEqual(itemToFind, itemManipulator, Object::equals);
	}

	public Optional<T> findEqualIgnoreCase(String itemToFind, Function<T, String> itemManipulator) {
		return findEqual(itemToFind, itemManipulator, String::equalsIgnoreCase);
	}

	public <U> Optional<T> findEqual(U itemToFind, Function<T, U> itemManipulator,
	                                 BiPredicate<U, U> equalizationPredicate) {
		return filterAndFetch(item -> equalizationPredicate.test(itemManipulator.apply(item), itemToFind));
	}

	public Optional<T> filterAndFetch(Predicate<? super T> predicate) {
		return stream.filter(predicate).findFirst();
	}

	public <R> StreamExtension<R> map(Function<? super T, ? extends R> mapper) {
		return new StreamExtension<>(stream.map(mapper));
	}

	public List<T> toList() {
		return stream.collect(Collectors.toList());
	}

	public String concat() {
		return concat(",");
	}

	public String concat(String delimiter) {
		return stream.map(String::valueOf).collect(Collectors.joining(delimiter));
	}
}
