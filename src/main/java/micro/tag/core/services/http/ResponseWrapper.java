package micro.tag.core.services.http;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ResponseWrapper<T> {
	@JsonProperty
	private String status;

	@JsonProperty
	private boolean success;

	@JsonProperty
	private T data;

	@JsonProperty
	private ResponseError error;


	public String isStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
		setSuccess(ResponseStatus.SUCCESS.name().equals(status));
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public ResponseError getError() {
		return error;
	}

	public void setError(ResponseError error) {
		this.error = error;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
}
