package ai.enpasos.web.api;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GoResultDTO {
    double komi;
    int dame;
    int whiteTerritory;
    int whiteStones;
    int whiteCaptures;
    int blackTerritory;
    int blackStones;
    int blackCaptures;
    double black;
    double white;
    boolean gameOver;
    String resultStr;
}
