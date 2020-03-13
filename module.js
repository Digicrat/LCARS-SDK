var uiColors = ['bg-blue-1', 'bg-blue-2','bg-blue-3','bg-blue-4','bg-green-1','bg-green-2','bg-green-3','bg-green-4'];

var utils = {
    complexButtonRA : function(text) { return utils.complexButton(text, true,true) },
    complexButtonA : function(text) { return utils.complexButton(text, true,false) },
    complexButtonAR : function(text) { return utils.complexButton(text, false,true) },
    complexButton : function(text, leftRound, rightRound) {
        return {type:'complexButton',
                children:[
                    {type:'cap', version:(leftRound ? 'round-left' : 'left')},
                    {type:'block'},
                    {type:'text', text:text},
                    {type:'button', version: (rightRound ? 'round-right' : 'right')}
                ],
                colors:LCARS.helper.aRandColorGroup(uiColors, 4)
               };

    },
    button : function(label, version = "round-left") {
        return {type: 'button', version:version,
                label: label, size:'large',
                //style:styles.bottomLeft,
                color:LCARS.helper.aRandColor(uiColors)};
    },
    buttonLeft : function(label) { return utils.button(label, 'round-left'); },
    buttonRight : function(label) { return utils.button(label, 'round-right'); },
};
var styles = {
    bottomLeft : {'margin-bottom':'30px', 'text-align':'left'},
    bottomRight: {'margin-bottom':'30px', 'text-align':'right'},
};


var simpleBar = {type:'bar', color:LCARS.helper.aRandColor(uiColors), flexc:'h'};

var col = {type:'column',
               style:{'justify-content':'flex-end'},
               flexc:'v', flex:'v',
           children:[
               //simpleBar, // Needs to be bound to a given size, else it looks odd.
               {type:'row', flex:'h', children:[ // BUG: This should scale to available width
                   {type: 'column', flexC:'h', children: [
                       utils.buttonLeft('Lefty'),
                       utils.complexButtonA("Type A"), // BUG: If this line is omitted, simple buttons fail to show
                       utils.buttonLeft('Simple Left'),
                       
                   ]},
                   {type: 'column', flexC:'h', children: [
                       // BUG: If this line is omitted, simple buttons fail to show
                       // BUG2: When shown on it's own, this has a rounded right-edge, but in a col here it's truncated
                       utils.complexButtonAR("Type AR"),
                       
                       utils.buttonRight('Righty'),
                       utils.buttonRight('Simple Right'),

                   ]},
               ]},
               {type:'row', flex:'h', children:[
                   utils.complexButtonA("Type A"),
                   utils.complexButtonRA("Type RA"), // BUG: round-right doesn't show here
                   utils.complexButtonAR("Type AR"), // BUG: round-right doesn't show here
               ]},
               utils.complexButtonA('Complex-A'),
               utils.complexButtonAR('Complex-AR'),
               utils.complexButtonRA('Round About'),
           ]
              };
var leftelbow = {type:'elbow', version:'horizontal', direction:'top-left', color:LCARS.helper.aRandColor(uiColors), class:'step-two'};
var rightelbow = {type:'elbow', version:'horizontal', direction:'top-right', color:LCARS.helper.aRandColor(uiColors), class:'step-two'};

var exampleUI = {type:'wrapper', id:'wpr_viewport', version:'row', flex:'h',
                     children:[leftelbow, col, rightelbow]
                    };


$(document).ready(function(){
     $('body').append( LCARS.create(exampleUI).dom );
});
