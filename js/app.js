
(function() {
	
	

    var output = PUBNUB.$('output'), 
        input = PUBNUB.$('input'), 
        button = PUBNUB.$('button'),
        avatar = PUBNUB.$('avatar'),
        presence = PUBNUB.$('presence'),
		user = PUBNUB.$('interesse');
		
		
	
		
		

    var channel = 'mchat';
	
	
    // Assign a random avatar in random color
    avatar.className = 'face-' + ((Math.random() * 13 + 1) >>> 0) + ' color-' + ((Math.random() * 10 + 1) >>> 0);

    var p = PUBNUB.init({
        subscribe_key: 'sub-c-d02c7896-6399-11e6-8de8-02ee2ddab7fe',
        publish_key:   'pub-c-9217d596-d001-46c7-92f2-02e142fc5b60'
    });

    p.subscribe({
        channel  : channel,
		
        callback : function(m) { 
            output.innerHTML = '<img src="'+ m.user +'"><p><i class="' + m.avatar + '"></i><span>' +  m.text.replace( /[<>]/ig, '' ) + '</span></p>' + output.innerHTML; 
        },
        presence: function(m){
            if(m.occupancy > 1) {
                presence.textContent = m.occupancy + ' people online';
            } else {
                presence.textContent = 'Nobody else is online';
            }
        }
    });

    p.bind('keyup', input, function(e) {
        (e.keyCode || e.charCode) === 13 && publish()
    });

    p.bind('click', button, publish);

    function publish() {
        p.publish({
            channel : channel,
            			
            message : {avatar: avatar.className, user: $('#interesse:checked').val(), text: input.value}, 
            x : (input.value='')
        });
    }


})();