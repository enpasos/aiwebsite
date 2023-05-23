package ai.enpasos.web.server.service;


//import ai.enpasos.muzero.go.config.GoGame;
//import ai.enpasos.muzero.go.config.environment.scoring.GameResult;
//import ai.enpasos.muzero.platform.agent.intuitive.Inference;
//import ai.enpasos.muzero.platform.config.GameType;
//import ai.enpasos.muzero.platform.config.MuZeroConfig;
//import ai.enpasos.muzero.tictactoe.run.TicTacToeInferenceHelper;
//import ai.enpasos.web.api.*;
import ai.enpasos.web.api.MuZeroApi;
import ai.enpasos.web.api.ResponseDTO;
import jakarta.ws.rs.Path;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;

//import static ai.enpasos.muzero.platform.config.GameType.*;



@Slf4j
@Controller
@Path("muzero")
public class MuZeroService implements MuZeroApi {

    @Value("${ai.networkdir}")
    private String networkDir;

    @Override
    public ResponseDTO<String> test(String input) {
        return ResponseDTO.<String>builder().success(true).payload(input + " ... testes").build();
    }

//    @Autowired
//    TicTacToeInferenceHelper inferenceHelper;
//
//    @Autowired
//    Inference inference;
//
//    @Autowired
//    MuZeroConfig config;
//
//
//    @Override
//    public ResponseDTO<String> nextMoveTicTacToe(ActionsDTO dto) {
//
//        config.setActiveGame(TICTACTOE);
//
//        String nextMove =  inferenceHelper.aiDecision(dto.getActions(), dto.isMcts(), networkDir);
//
//        return ResponseDTO.ok(nextMove);
//    }
//
//    private List<Integer> genericActionFormat(GoActionsDTO dto, int size) {
//
//        if (size == 9) {
//            config.setActiveGame(GO_9);
//        } else {
//            config.setActiveGame(GO_5);
//        }
//
//        List<Integer> actions = dto.getActions().stream().map(a -> {
//            if ("play".equals(a.getType())) {
//                return a.getRow() * size + a.getCol();
//            } else { // if ("pass".equals(a.getType())) {
//                return size * size;
//            }
//        }).collect(Collectors.toList());
//        return actions;
//    }
//
//
//    @Override
//    public ResponseDTO<GoActionDTO> nextMoveGo(GoActionsDTO dto) {
//        int size = dto.getSize();
//
//        if (size == 9) {
//            config.setActiveGame(GO_9);
//        } else {
//            config.setActiveGame(GO_5);
//        }
//
//
//        List<Integer> actions = genericActionFormat(dto, size);
//
//        log.info(actions.toString());
//        if (dto.getSlowThinkingBudget() <= 100) // no deny of service attacs ;-)
//            config.setNumSimulations(dto.getSlowThinkingBudget());
//
//        int nextMoveInt = inference.aiDecision(actions, dto.isMcts(), networkDir);
//
//
//        ResponseDTO<GoActionDTO> responseDTO = new ResponseDTO<>();
//        GoActionDTO goActionDTO = new GoActionDTO();
//        if (nextMoveInt == size * size) {
//            goActionDTO.setType("pass");
//        } else {
//            goActionDTO.setType("play");
//            goActionDTO.setCol(nextMoveInt % size);
//            goActionDTO.setRow((nextMoveInt - goActionDTO.getCol()) / size);
//        }
//        responseDTO.setPayload(goActionDTO);
//        responseDTO.setSuccess(true);
//
//        return responseDTO;
//    }
//
//    @Override
//    public ResponseDTO<GoResultDTO> resultGo(GoActionsDTO dto) {
//        int size = dto.getSize();
//        List<Integer> actions = genericActionFormat(dto, size);
//        GoGame game = (GoGame) inference.getGame(actions);
//        GameResult r = game.getEnvironment().getResult();
//        GoResultDTO goResultDTO = null;
//        if (r == null)  {
//            goResultDTO = GoResultDTO.builder()
//                    .gameOver(game.getEnvironment().terminal())
//                    .build();
//        } else {
//            goResultDTO = GoResultDTO.builder()
//                    .komi(r.getKomi())
//                    .blackCaptures(r.getNumBlackCaptures())
//                    .blackTerritory(r.getNumBlackTerritory())
//                    .blackStones(r.getNumBlackStones())
//                    .black(r.getNumBlackStones() + r.getNumBlackTerritory()) // + r.getNumBlackCaptures())
//                    .whiteCaptures(r.getNumWhiteCaptures())
//                    .whiteTerritory(r.getNumWhiteTerritory())
//                    .whiteStones(r.getNumWhiteStones())
//                    .white(r.getNumWhiteStones() + r.getNumWhiteTerritory() + r.getKomi())   //+ r.getNumWhiteCaptures()
//                    .dame(r.getNumDame())
//                    .resultStr(r.toString())
//                    .gameOver(game.getEnvironment().terminal())
//                    .build();
//        }
//        ResponseDTO<GoResultDTO> responseDTO = new ResponseDTO<>();
//        responseDTO.setPayload(goResultDTO);
//        responseDTO.setSuccess(true);
//
//        return responseDTO;
//    }
}
