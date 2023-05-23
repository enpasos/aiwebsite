package ai.enpasos.web.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDTO<T> {
    private boolean success;
    private String error;
    private T payload;

    public ResponseDTO(final T payload) {
        this.payload = payload;
    }

    public static <T> ResponseDTO<T> error(final String message) {
        final ResponseDTO<T> r = new ResponseDTO<>();
        r.setSuccess(false);
        r.setError(message);
        return r;
    }

    public static <T> ResponseDTO<T> error(final T payload, final String message) {
        final ResponseDTO<T> r = new ResponseDTO<>();
        r.setSuccess(false);
        r.setError(message);
        r.setPayload(payload);
        return r;
    }

    public static <T> ResponseDTO<T> ok() {
        final ResponseDTO<T> r = new ResponseDTO<>();
        r.setSuccess(true);
        return r;
    }

    public static <T> ResponseDTO<T> ok(final T payload) {
        final ResponseDTO<T> r = new ResponseDTO<>();
        r.setSuccess(true);
        r.setPayload(payload);
        return r;
    }
}
