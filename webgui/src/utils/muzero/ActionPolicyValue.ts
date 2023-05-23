export interface ActionPolicyValue {
  action: number;
  policyValue: number;
}

export function createActionPolicyValue(someActions: number[], policyValues: number[]): ActionPolicyValue[] {
  let actionPolicyValue: ActionPolicyValue[] = [];
  for (let a = 0; a < someActions.length; a++) {
    let action: number = someActions[a];
    actionPolicyValue.push(<ActionPolicyValue>{
      action: action,
      policyValue: policyValues[action]
    })
  }
  return actionPolicyValue
}
