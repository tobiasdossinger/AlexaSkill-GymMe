/**
 * Created by sashthecash on 21/06/2017.
 */

const
		AlexaComplexAnswer = require( './sensory/alexa/AlexaComplexAnswer' );

class Execution {

	/**  @param {AlexaRequestVO} alexaRequest */
	static exec ( alexaRequest ) {
		return Promise.resolve( alexaRequest )
				.then( Execution.handleIntent )
				.then( alexaRequest => {
					alexaRequest.answer = AlexaComplexAnswer.buildComplexAnwser( alexaRequest );
					return alexaRequest;
				} )
	}

	/**  @param {AlexaRequestVO} alexaRequestVO */
	static handleIntent ( alexaRequest ) {

		// vui implementation magic 3 lines! Dont Touch!
		if ( alexaRequest.reqSessionData.subIntent &&
				alexaRequest.reqSessionData.subIntent [ alexaRequest.intentName ] ) {
			alexaRequest.intentName = alexaRequest.reqSessionData.subIntent [ alexaRequest.intentName ];
		}

		let intentMethod = alexaRequest.intentName;

		// alexaRequest.vReq     = {}; // data extracted out of the request
		// alexaRequest.vRes     = {}; // data generated to answer
		// alexaRequest.vResLoop = {}; // data generated to answer in loops

		/** check if a Method exists – named like the intent.. */
		return ( typeof Execution[ intentMethod ] === 'function' ) ?
		       Execution[ intentMethod ]( alexaRequest ) :
		       Execution.GenericVuiRequest( alexaRequest );
	}
	/**
	 * ProfilName = Registered users
	 */
	/**  @param {AlexaRequestVO} alexaRequestVO */
	static ProfilName (alexaRequest) {
		let name = alexaRequest.slots['profilVar'];
		// TODO: save name for later

		alexaRequest.vRes = { profilName : name };
		return new Promise( resolve => resolve( alexaRequest ) );
	}


	/**
	 * AskExercise = DataBase --> Sheet('EXERCISE')
	 */

	/**  @param {AlexaRequestVO} alexaRequestVO */
	static AskJumpingJackIntent (alexaRequest) {
		let explainJumpingJack = alexaRequest.dataBase[0].Description;

		alexaRequest.vRes = { exerciseJumpingJack : explainJumpingJack};
		return new Promise( resolve => resolve( alexaRequest ) );
	}

	/**  @param {AlexaRequestVO} alexaRequestVO */
	static AskCrunchesIntent (alexaRequest) {
		let explainCrunches = alexaRequest.dataBase[1].Description;

		alexaRequest.vRes = { exerciseCrunches : explainCrunches};
		return new Promise( resolve => resolve( alexaRequest ) );
	}
	/**  @param {AlexaRequestVO} alexaRequestVO */
	static AskSquadsIntent (alexaRequest) {
		let explainSquads = alexaRequest.dataBase[2].Description;

		alexaRequest.vRes = { exerciseSquads : explainSquads};
		return new Promise( resolve => resolve( alexaRequest ) );
	}

	/**  @param {AlexaRequestVO} alexaRequestVO */
	static AskPushUpsIntent (alexaRequest) {
		let explainPushUps = alexaRequest.dataBase[3].Description;

		alexaRequest.vRes = { exercisePushUps : explainPushUps};
		return new Promise( resolve => resolve( alexaRequest ) );
	}
	

	/**
	 * 
	 * 
	 */

	/**  @param {AlexaRequestVO} alexaRequestVO */
	static GenericVuiRequest ( alexaRequest ) {
		return new Promise( resolve => resolve( alexaRequest ) );
	}

}

module.exports = Execution;
