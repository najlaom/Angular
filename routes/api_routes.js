const express = require ('express'); 
const postcontroller = require ('../controller/post_controller'); 
const playercontroller = require ('../controller/player_controller');
const itemcontroller = require ('../controller/item_controller');
const partnercontroller = require ('../controller/partner_controller');
const eventcontroller = require ('../controller/event_controller');
const publicitycontroller = require ('../controller/publicity_controller');
const accessorycontroller = require ('../controller/accessory_controller');
const admincontroller = require('../controller/admin_conroller');
const playerAccessorycontroller = require('../controller/playerAccessoire_controller');
const playerPublicitycontroller = require('../controller/publicityPlayer_controller');
const playerItemcontroller = require('../controller/playerArticle_controller');
const playerEventcontroller = require('../controller/eventPlayer_controller');


const router = express.Router ();

//////*****Admin*****///////
router.post('/register', admincontroller.addAdmin);
router.post('/login',admincontroller.login);
router.get('/username',admincontroller.getAdmin);


////////Post/////
router.post ('/add',postcontroller.addPost)
router.get('/posts',postcontroller.showPost);
router.get('/post/:id',postcontroller.singlePost); 
router.patch('/updatePost/:id',postcontroller.updatePost);
router.delete('/remove/:id', postcontroller.deletePost);

//////**********Player *********//////
router.post ('/addPlayer',playercontroller.addPlayer)
router.get ('/players',playercontroller.listPlayer)
router.get ('/player/:id',playercontroller.singlePlayer)
router.patch('/updatePlayer/:id',playercontroller.updatePlayer);
router.delete('/removePlayer/:id', playercontroller.deletePlayer);
//////******* Article Player *******////
router.post('/addPlayerArticle/',playerItemcontroller.addPlayerArticle);
router.get ('/showPlayerArticle',playerItemcontroller.showPlayerArticle)

////********* Item*********////
//router.post ('/addItem',itemcontroller.addItem)
router.get ('/items',itemcontroller.listItem)
router.get ('/items/:id',itemcontroller.listItemByPartner);
router.get ('/item/:id',itemcontroller.singleItem)
router.patch('/updateItem/:id',itemcontroller.updateItem)
router.delete('/removeItem/:id', itemcontroller.deleteItem);


////******* Partner ******////
router.post ('/signin',partnercontroller.signIn)
router.post ('/signup',partnercontroller.addAdmin)
router.get ('/partners',partnercontroller.listPartner)
router.get ('/partner/:id',partnercontroller.singlePartner)
router.patch('/updatePartner/:id',partnercontroller.updatePartner);
router.delete('/removePartner/:id', partnercontroller.deletePartner);


//////******* Event *******////
router.post ('/addEvent',eventcontroller.addEvent);
router.get ('/events',eventcontroller.listEvent);
router.get ('/events/:id',eventcontroller.listEventByPartner);
router.get ('/event/:id',eventcontroller.singleEvent);
router.patch ('/updateEvent/:id',eventcontroller.updateEvent);
router.delete('/removeEvent/:id', eventcontroller.deleteEvent);
//////******* Event Player *******////
router.post('/addEventPlayer',playerEventcontroller.addEventPlayer);
router.get ('/showEventPlayer',playerEventcontroller.showEventPlayer)

//////******* Publicity *******////
router.post ('/addPublicity',publicitycontroller.addPublicity)
router.get ('/publicities',publicitycontroller.listPublicity)
router.get ('/publicities/:id',publicitycontroller.listPublicityByPartner)
router.get ('/publicity/:id',publicitycontroller.singlePublicity)
router.patch('/updatePublicity/:id',publicitycontroller.updatePublicity);
router.delete('/removePublicity/:id', publicitycontroller.deletePublicity);
//////******* Publicity Player *******////
router.post('/addPublicityPlayer',playerPublicitycontroller.addPublicityPlayer);
router.get ('/showPublicityPlayer',playerPublicitycontroller.singlePublicityPlayer)


//////******* Accessory *******////
//router.post ('/addAccessory',accessorycontroller.addAccessory);
router.get ('/accessories',accessorycontroller.listAccessory);
router.get ('/accessory/:id',accessorycontroller.singleAccessory);
router.patch ('/updateAccessory/:id',accessorycontroller.updateAccessory);
router.delete('/removeAccessory/:id', accessorycontroller.deleteAccessory);
//////******* Accessory Player *******////
router.post('/addAccessoryPlayer',playerAccessorycontroller.addAccessoryPlayer);
router.get ('/showAccessoryPlayer',playerAccessorycontroller.singleAccessoryPlayer);











module.exports = router;
