import { createAgentInputs } from '../factories'

const model = 'acquisition'

export default [
  {
    as: 'h2',
    componentName: 'TranslatedHeader',
    textKey: 'headers.acquisition',
  },
  {
    componentName: 'AddButton',
    hideWhenShowingInitiallyHidden: true,
    textKey: 'other.addAcquisition',
  },
  // {
  //   componentName: 'SingleDate',
  //   name: 'individual.acquisition.date',
  // },
  ...createAgentInputs({
    baseName: 'individual.acquisition.handedInByAgent',
    initiallyHidden: true,
    model,
  }),
  {
    componentName: 'RemarksTogglable',
    emptyStateTextKey: 'remarks.emptyState.acquisition',
    initiallyHidden: true,
    model,
    name: 'individual.acquisition.remarks',
    resultPrefixTextKey: 'remarks.resultPrefix.acquisition',
  },
]
