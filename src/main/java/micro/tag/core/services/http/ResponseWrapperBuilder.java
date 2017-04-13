package micro.tag.core.services.http;

public class ResponseWrapperBuilder<T> {
	private ResponseWrapper<T> responseWrapper;

	private ResponseWrapperBuilder() {
		this.responseWrapper = new ResponseWrapper<>();
		status(ResponseStatus.SUCCESS);
	}

	public static ResponseWrapperBuilder<Object> of(Object entity) {
		return new ResponseWrapperBuilder<>().entity(entity);
	}

	public static ResponseWrapperBuilder<Object> of(ResponseStatus responseStatus) {
		return new ResponseWrapperBuilder<>().status(responseStatus);
	}

	public ResponseWrapperBuilder<T> entity(T entity) {
		responseWrapper.setData(entity);
		return this;
	}

	public ResponseWrapperBuilder<T> error(String error) {
		responseWrapper.setError(new ResponseError(error));
		return this;
	}

	public ResponseWrapperBuilder<T> error(Exception e) {
		responseWrapper.setError(new ResponseError(e.getMessage()));
		return this;
	}

	public ResponseWrapperBuilder<T> status(ResponseStatus status) {
		responseWrapper.setStatus(status.name());
		return this;
	}

	public ResponseWrapper<T> build() {
		return responseWrapper;
	}
}
