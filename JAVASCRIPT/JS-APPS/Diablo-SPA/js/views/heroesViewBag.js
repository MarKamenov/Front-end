var app = app || {};

app.heroesViewBag = (function(){

	function showHeroes(selector, heroes){
	if (heroes.length != 0)	{
	$.get('templates/heroes.html',function(templ){
		heroes = mapHeroProperties(heroes);
		 var rendered = Mustache.render(templ, {heroes: heroes});
                $(selector).html(rendered);
	});	
	}else{
		 $.get('templates/no-heroes.html', function (templ) {
                $(selector).html(templ);
            });
		};
	};
	function showAddHero(selector, heroClasses) {
        $.get('templates/add-hero.html', function (templ) {
            var rendered = Mustache.render(templ, {classes: heroClasses});
            $(selector).html(rendered);

            $('#addHero').on('click', function () {
                var name = $('#name').val();
                var heroClass = $('input[name=class]:checked').val();
                Sammy(function () {
                    this.trigger('addHero', {name: name, class: heroClass});
                });
            });
        });
    };
	function mapHeroProperties(myHeroes){
		return myHeroes.map(function(hero){
		var imageUrl,
            className = hero["class"]["name"].toLowerCase();
            if (className == "barbarian") {
                imageUrl = "imgs/barbarian.png"	
            }else if(className == "amazon"){
            	 imageUrl = "imgs/amazon.png"
            }
             return {
                id: hero._id,
                name: hero.name,
                imageUrl: imageUrl
            };
		});
	};
	function showHero(selector, hero) {
        $.get('templates/hero.html', function (templ) {
           hero = mapHeroPropertiesWithItems(hero);

            var rendered = Mustache.render(templ, hero);
            $(selector).html(rendered);
        })
    }
    function mapHeroPropertiesWithItems(hero){
    	var items;
    	if(hero.items != undefined){
    	 items = hero.items.map	(function(item){
    	 	return {
                    name: item.name,
                    attackPoints: item["attack-points"],
                    defensePoints: item["defense-points"],
                    lifePoints: item["life-points"],
                    type: item.type.name
                }
            });
    	}else{
    		items = [];
    	}
    	 var baseAttackPoints = hero["class"]["attack-points"],
            baseDefensePoints = hero["class"]["defense-points"],
            baseLifePoints = hero["class"]["life-points"];

         var attackPointsFromItems = 0, defensePointsFromItems = 0, lifePointsFromItems = 0;

          items.forEach(function (item) {
            attackPointsFromItems += Number(item.attackPoints);
            defensePointsFromItems += Number(item.defensePoints);
            lifePointsFromItems += Number(item.lifePoints);
        });
         var attackPoints = baseAttackPoints + attackPointsFromItems,
            defensePoints = baseDefensePoints + defensePointsFromItems,
            lifePoints = baseLifePoints + lifePointsFromItems;

        var imageUrl,
        className = hero["class"]["name"].toLowerCase();

        if (className == "barbarian") {
            imageUrl = "imgs/barbarian.png"
        } else if (className == "amazon") {
            imageUrl = "imgs/amazon.png"
        }

      return {
            id: hero._id,
            name: hero.name,
            attackPoints: attackPoints,
            defensePoints: defensePoints,
            lifePoints: lifePoints,
            imageUrl: imageUrl,
            items: items
        }  
    }
	 return {
        load: function () {
            return {
                showHeroes: showHeroes,
                showAddHero: showAddHero,
                showHero: showHero
            }
        }
    }
})();