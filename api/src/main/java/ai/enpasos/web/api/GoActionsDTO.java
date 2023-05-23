package ai.enpasos.web.api;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GoActionsDTO {
    List<GoActionDTO> actions;
    boolean mcts;
    int size;
    int slowThinkingBudget;
}
