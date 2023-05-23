package ai.enpasos.web.server.service;


import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import org.springframework.stereotype.Service;

@Service
@Path("hello")
public class HelloService {

    @GET
    @Produces("text/plain")
    public String hello() {
        return "Hello from Spring";
    }
}
