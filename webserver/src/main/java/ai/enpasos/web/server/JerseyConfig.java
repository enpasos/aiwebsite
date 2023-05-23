package ai.enpasos.web.server;



import ai.enpasos.web.server.service.HelloService;
import ai.enpasos.web.server.service.MuZeroService;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JerseyConfig extends ResourceConfig {

    public JerseyConfig() {

        register(MuZeroService.class);
        register(HelloService.class);
    }
}

