

export function typescriptDiagnostic(monaco){

    return {
        disabled: () => {

            monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({

                noSemanticValidation: true,
                
                noSyntaxValidation: true,
            });
        },

        activate: () => {

            monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({

                noSemanticValidation: false,
                
                noSyntaxValidation: false,
            });
        }
    }
}