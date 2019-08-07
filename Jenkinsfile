import org.jenkinsci.plugins.workflow.steps.FlowInterruptedException

pipeline {

	agent none

	environment {
	    MyKeyID="myCustomValue1"
	}
	
	stages {
	
stage("stage master") {
		steps {
    			script {
					stage("inner stage 1") {
						script {
							node {
								println "inner stage 1"
							}

							
						}
					}

					stage("inner stage 2") {
						script {
							node {
								println "inner stage 2"
							}	
						}
					}
							

						}
					}
				}

	stage('Descargar codigo fuente') {
	    environment {
    	    MyKeyID="myCustomValue2x"
    	}
    	steps {
    		script {
          		node {
						    highlightStage("Descargar codigo fuente")
                checkout scm
        				println "Mi primer stage. MyKeyID value es: ${MyKeyID}"
                bat "
                  npm install
                "
          		}
        	}
    	}
	} 
	
	stage('Input test') {
    	steps {
    		script {
				try {
					timeout(time: 60, unit: "SECONDS"){
						input(message: "Esta seguro de hacer un deploy en produccion ?")
					}
				}
				catch(FlowInterruptedException error){
					def user = error.getCauses()[0].getUser().toString()
					
					// SYSTEM means timeout.
					if('SYSTEM' == user) { 
						println "Ejecucion del pipeline abortado automaticamente por el sistema. ${user}"
						}
					// If user is distinct from SYSTEM, then a jenkins user aborted the pipeline deploy manually.
					else {
						println "Ejecucion del pipeline abortado por el usuario ${user}."
					}
					
				}
				finally {
					node {
						println "Iniciando el deploy a produccion. "
					}
				}
				
        	}
    	}
	}
	
	stage('Fin') {
    	steps {
    		script {
          		node {
        			println "Mi segundo stage esta en ejecucion. KeyID: $MyKeyID" 
          		}
        	}
    	}
	}
	    
}

}



def highlightStage(stageName) {
	//ansiColor('xterm') {
		echo "\033[42m  +++++++++++++++++++ ${stageName} Stage +++++++++++++++++++ \033[0m"
	//}
}
