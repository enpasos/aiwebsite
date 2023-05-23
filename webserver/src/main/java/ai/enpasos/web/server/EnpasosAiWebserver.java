package ai.enpasos.web.server;



import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;

@SpringBootApplication()
//@ComponentScan(basePackages = "ai.enpasos.*",
//        excludeFilters = @ComponentScan.Filter(
//                type = FilterType.ASSIGNABLE_TYPE,
//                classes = { TicTacToe.class,  Go.class,  PegSolitair.class}))


public class EnpasosAiWebserver {

    public static void main(String[] args) {
         SpringApplication.run(EnpasosAiWebserver.class, args);
    }




}
