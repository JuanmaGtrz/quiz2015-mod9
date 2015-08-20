var express = require( 'express' );
var router = express.Router();

var quizController = require( "../controllers/quiz_controller" );
var commentController = require( "../controllers/comment_controller" );
var sessionController = require( "../controllers/session_controller" );

/* GET home page. */
router.get( '/', function ( req, res ) {
    res.render( 'index', { title: 'Quiz', errors: [ ] } );
} );

router.get( '/author', function ( req, res ) {
    res.render( 'author', {
        nombre: 'JuanmaGtrz',
        foto: '/images/author.png',
        errors: [ ]
    } );
} );

//Autoload
router.param( "quizId", quizController.load );
router.param( "commentId", commentController.load );

router.get( "/login", sessionController.new );
router.post( "/login", sessionController.create );
router.get( "/logout", sessionController.destroy );

//Rutas
router.get( "/quizes", quizController.index );
router.get( "/quizes/:quizId(\\d+)", quizController.show );
router.get( "/quizes/:quizId(\\d+)/answer", quizController.answer );
router.get( "/quizes/:quizId(\\d+)/edit", sessionController.loginRequired, quizController.edit );
router.put( "/quizes/:quizId(\\d+)", sessionController.loginRequired, quizController.update );
router.delete( "/quizes/:quizId(\\d+)", sessionController.loginRequired, quizController.destroy );
router.get( "/quizes/new", sessionController.loginRequired, quizController.new );
router.post( "/quizes/create", sessionController.loginRequired, quizController.create );
router.get( "/quizes/statistics", quizController.statistics );

router.get( "/quizes/:quizId(\\d+)/comments/new", commentController.new );
router.post( "/quizes/:quizId(\\d+)/comments", commentController.create );
router.get( "/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish", sessionController.loginRequired, commentController.publish );

module.exports = router;