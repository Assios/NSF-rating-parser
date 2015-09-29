Template.player.onRendered(function() {

	Session.set('img_url', '/images/mysteryman.png');

});

Template.player.helpers({

	loadImage: function(fide_id) {
	  var img = new Image();
	  img.addEventListener('load', function() { // addeventlistener is better than onload
	    if (img.width !== 80) {
	      Session.set('img_url', img.src);
	    } else {
	      Session.set('img_url', '/images/mysteryman.png');
	    }
	  });
	  
	  img.src = 'https://ratings.fide.com/card.php?code=' + fide_id;
	},

	lastElement: function(list) {
		return _.last(list);
	},

	getImage: function() {
		return Session.get('img_url');
	},

	merge_lists: function(first, second) {
		// Must be same length
		result = [];

		for (var i = 0; i < first.length; i++) {
			result.push([first[i], second[i]]);
		}

		return result;

	},

	ratingChart: function() {

			dates = [];

			for (var i = 0; i < this.nsf_categories.length; i++) {
				dates.push(Date.UTC(this.nsf_categories[i][0], this.nsf_categories[i][1]));
			}

			var nsf_elos_peak = [],
      majorPeakVal = 70,
      len = this.nsf_elos.length,
      i,
      prevVal = this.nsf_elos[i],
      lab = '';

	    for (i = 0; i < len; i++) {
	        if (this.nsf_elos[i] - prevVal > majorPeakVal) {
	            lab = '+' + (this.nsf_elos[i] - prevVal);
	        } else if (prevVal - this.nsf_elos[i] > majorPeakVal) {
	            lab = (this.nsf_elos[i] - prevVal);
	        } else {
	            lab = '';
	        }
	        nsf_elos_peak.push({
	            y: this.nsf_elos[i],
	            label: lab
	        });
	        prevVal = this.nsf_elos[i];
	    }

			nsf_date_elos = [];
			
			for (var i = 0; i < dates.length; i++) {
				nsf_date_elos.push([dates[i], this.nsf_elos[i]])
			}

			fide_date_elos = [];
			
			for (var i = 0; i < dates.length; i++) {
				fide_date_elos.push([dates[i], this.fide_elos[i]])
			}

			blitz_date_elos = [];

			for (var i = 0; i < dates.length; i++) {
				blitz_date_elos.push([dates[i], this.blitz_elos[i]])
			}

			rapid_date_elos = [];

			for (var i = 0; i < dates.length; i++) {
				rapid_date_elos.push([dates[i], this.rapid_elos[i]])
			}

			var title_text;

			if (this.name.slice(-1) == 's')
				title_text = this.name + '\' ratingprogresjon';
			else
				title_text = this.name + 's ratingprogresjon';

	    return {
	    		chart: {
	    			zoomType: 'x'
	    		},
	        title: {
	            text: title_text,
	            x: -20 //center
	        },
	        xAxis: {
	        		type: 'datetime',
	        },
	        yAxis: {
	            title: {
	                text: 'Elo'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        plotOptions: {
	            series: {
	                dataLabels: {
	                    enabled: true,
	                    format: '{point.label}'
	                }
	            }
	        },
	        series: [{
	          name: 'Norsk elo (Offisiell)',
	          data: nsf_date_elos
	        },
	        {	
	        	name: 'FIDE elo',
	        	data: fide_date_elos
					},
					{
	        	name: 'Lyn',
	        	data: blitz_date_elos
					},
					{
	        	name: 'Hurtig',
	        	data: rapid_date_elos
					}],
	        credits: false,
	    };
	}
});
