pipeline {

	agent none

	environment {
	    MyKeyID="myCustomValue1"
	}
	
	stages {
	
	stage('Init') {
    	steps {
    		script {
          		node {
                      timestamps  {
                          println "Descargar codigo fuente"
			  dir("myFolder") {
				  checkout scm
				  sh """
					npm install
				    """
			  }
			    stash name: "myFolder", include: "myFolder/**"
                      }
        			
          		}
        	}
    	}
	}
		
		
	stage('Analisis de codigo con Sonar') {
    	steps {
    		script {
          		node {
                      timestamps  {
                          unstash "myFolder"
				dir("myFolder") {
        			 sh """
				 	dir
				    """	
				}
                      }
        			
          		}
        	}
    	}
	}
		
		stage('Contenedor Docker') {
    	steps {
    		script {
          		node {
                      timestamps  {
                          unstash "myFolder"
				dir("myFolder") {
        			 bat """
				 	dir
					
					docker login
					docker build -t devops-course:my-etiqueta .
					docker tag devops-course:my-etiqueta daylersalazar/devops-course:my-etiqueta
					docker push daylersalazar/devops-course:my-etiqueta
				    """	
				}
                      }
        			
          		}
        	}
    	}
	}
	
	stage('Deploy') {
    	steps {
    		script {
          		node {
				unstash "${stashName}"
				dir("myFolder") {
        			 sh """
					npm start
				    """	
				}
          		}
        	}
    	}
	}    
}

}
