package ai.enpasos.web.api;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Consumes({"application/json"})
@Produces({"application/json"})
public interface MuZeroApi {

    @POST
    @Path("test")
    ResponseDTO<String> test(String input);

//    @POST
//    @Path("tictactoe/nextMove")
//    ResponseDTO<String> nextMoveTicTacToe(ActionsDTO dto);
//
//
//    @POST
//    @Path("go/nextMove")
//    ResponseDTO<GoActionDTO> nextMoveGo(GoActionsDTO dto);
//
//    @POST
//    @Path("go/result")
//    ResponseDTO<GoResultDTO> resultGo(GoActionsDTO dto);

}
