package ai.enpasos.web.server;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class OtherController {
//    @RequestMapping("{?:(?:(?!services|onnx|css|fonts|icons|js|\\.).)*}/**")
//    public String redirectApi() {
//        return "/index.html";
//    }

    @RequestMapping(value = "/**/{[path:[^\\.]*}")
    public String redirect() {
        return "forward:/";
    }

//    @Controller
//    public class ClientForwardController {
//        @GetMapping(value = "/**/{path:[^\\.]*}")
//        public String forward() {
//            return "forward:/";
//        }
//    }
}

