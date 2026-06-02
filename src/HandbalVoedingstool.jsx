import React, { useState, useMemo, useEffect } from 'react';

// =============================================================================
// RECEPTENDATABANK — 267 recepten, 6 keukens, 170 ingrediënten
// =============================================================================
const RECIPES_DB = {"metadata":{"versie":"5.0","totaal_recepten":400,"recepten_per_type":{"ontbijt":68,"lunch":93,"diner":122,"snack":47,"post_workout":34,"pre_bed":25,"pre_workout":11},"recepten_per_keuken":{"belgisch_nederlands":105,"mediterraans":64,"aziatisch":68,"mexicaans":49,"indisch":41,"midden_oosters":48,"afrikaans":25},"recepten_per_eiwit_niveau":{"zuivel_ei":109,"vlees_vis":236,"veganistisch":46,"vegetarisch":9},"doelgroep":"handbalspelers m/v 18-25 jaar","datum":"2026-04-30"},"ingredienten_database":{"kipfilet":{"e":23,"c":0,"v":1.5,"kcal":110,"cat":"eiwit_dier"},"kalkoenfilet":{"e":22,"c":0,"v":1.5,"kcal":105,"cat":"eiwit_dier"},"kippenboutje_zonder_vel":{"e":20,"c":0,"v":7,"kcal":145,"cat":"eiwit_dier"},"rundsbiefstuk_mager":{"e":26,"c":0,"v":6,"kcal":165,"cat":"eiwit_dier"},"varkenshaas":{"e":22,"c":0,"v":4,"kcal":130,"cat":"eiwit_dier"},"rundsgehakt_5pct":{"e":21,"c":0,"v":5,"kcal":135,"cat":"eiwit_dier"},"lamsvlees_mager":{"e":25,"c":0,"v":8,"kcal":175,"cat":"eiwit_dier"},"ham_mager":{"e":22,"c":1,"v":4,"kcal":130,"cat":"eiwit_dier"},"chorizo":{"e":24,"c":2,"v":38,"kcal":455,"cat":"eiwit_dier"},"kalkoenspek":{"e":28,"c":1,"v":8,"kcal":190,"cat":"eiwit_dier"},"shoarmavlees_kip":{"e":24,"c":1,"v":8,"kcal":175,"cat":"eiwit_dier"},"zalm_vers":{"e":20,"c":0,"v":13,"kcal":200,"cat":"eiwit_dier"},"tonijn_vers":{"e":24,"c":0,"v":1,"kcal":110,"cat":"eiwit_dier"},"kabeljauw":{"e":18,"c":0,"v":1,"kcal":80,"cat":"eiwit_dier"},"tilapia":{"e":21,"c":0,"v":2,"kcal":100,"cat":"eiwit_dier"},"garnalen_gepeld":{"e":20,"c":1,"v":1,"kcal":95,"cat":"eiwit_dier"},"tonijn_blik_water":{"e":25,"c":0,"v":1,"kcal":115,"cat":"eiwit_dier"},"ansjovis_blik":{"e":28,"c":0,"v":10,"kcal":210,"cat":"eiwit_dier"},"mosselen":{"e":18,"c":4,"v":2,"kcal":110,"cat":"eiwit_dier"},"sardientjes_blik":{"e":25,"c":0,"v":11,"kcal":200,"cat":"eiwit_dier"},"scampi":{"e":20,"c":1,"v":1,"kcal":95,"cat":"eiwit_dier"},"ei":{"e":6,"c":0.5,"v":5,"kcal":70,"cat":"eiwit_dier","per_stuk":true},"eiwit":{"e":3.5,"c":0.3,"v":0,"kcal":17,"cat":"eiwit_dier","per_stuk":true},"griekse_yoghurt_0pct":{"e":10,"c":4,"v":0,"kcal":56,"cat":"zuivel"},"magere_kwark":{"e":12,"c":4,"v":0.3,"kcal":70,"cat":"zuivel"},"skyr":{"e":11,"c":4,"v":0.2,"kcal":65,"cat":"zuivel"},"cottage_cheese":{"e":11,"c":3,"v":4,"kcal":95,"cat":"zuivel"},"feta":{"e":14,"c":4,"v":21,"kcal":264,"cat":"zuivel"},"halloumi":{"e":22,"c":2,"v":25,"kcal":320,"cat":"zuivel"},"mozzarella_light":{"e":18,"c":1,"v":12,"kcal":185,"cat":"zuivel"},"harde_kaas":{"e":25,"c":1,"v":28,"kcal":360,"cat":"zuivel"},"ricotta":{"e":11,"c":3,"v":13,"kcal":174,"cat":"zuivel"},"halfvolle_melk":{"e":3.4,"c":4.7,"v":1.5,"kcal":47,"cat":"zuivel"},"kefir":{"e":3.5,"c":4,"v":1.5,"kcal":45,"cat":"zuivel"},"labneh":{"e":9,"c":4,"v":13,"kcal":175,"cat":"zuivel"},"yoghurt_natuur":{"e":5,"c":4,"v":1.5,"kcal":50,"cat":"zuivel"},"boter":{"e":0.9,"c":0.1,"v":81,"kcal":720,"cat":"vet_gezond"},"ghee":{"e":0.3,"c":0,"v":100,"kcal":900,"cat":"vet_gezond"},"tofu_naturel":{"e":12,"c":2,"v":7,"kcal":120,"cat":"eiwit_plant"},"tofu_gerookt":{"e":16,"c":2,"v":9,"kcal":145,"cat":"eiwit_plant"},"tempeh":{"e":19,"c":9,"v":11,"kcal":195,"cat":"eiwit_plant"},"linzen_gekookt":{"e":9,"c":20,"v":0.4,"kcal":116,"cat":"eiwit_plant"},"kikkererwten_gekookt":{"e":9,"c":27,"v":3,"kcal":165,"cat":"eiwit_plant"},"zwarte_bonen_gekookt":{"e":9,"c":24,"v":0.5,"kcal":130,"cat":"eiwit_plant"},"rode_kidneybonen":{"e":9,"c":22,"v":0.5,"kcal":125,"cat":"eiwit_plant"},"pintobonen":{"e":9,"c":26,"v":0.7,"kcal":145,"cat":"eiwit_plant"},"edamame":{"e":12,"c":9,"v":5,"kcal":125,"cat":"eiwit_plant"},"seitan":{"e":25,"c":14,"v":2,"kcal":175,"cat":"eiwit_plant"},"rode_linzen_droog":{"e":25,"c":60,"v":1,"kcal":350,"cat":"eiwit_plant"},"groene_linzen_droog":{"e":25,"c":60,"v":1,"kcal":345,"cat":"eiwit_plant"},"falafel":{"e":13,"c":32,"v":18,"kcal":333,"cat":"eiwit_plant"},"havermout":{"e":13,"c":60,"v":7,"kcal":370,"cat":"ch_complex"},"rijst_basmati_droog":{"e":7,"c":78,"v":1,"kcal":350,"cat":"ch_complex"},"rijst_volkoren_droog":{"e":7,"c":75,"v":3,"kcal":360,"cat":"ch_complex"},"rijst_jasmine_droog":{"e":7,"c":78,"v":1,"kcal":350,"cat":"ch_complex"},"pasta_droog":{"e":12,"c":73,"v":1.5,"kcal":360,"cat":"ch_complex"},"pasta_volkoren_droog":{"e":13,"c":70,"v":2,"kcal":350,"cat":"ch_complex"},"quinoa_droog":{"e":14,"c":64,"v":6,"kcal":370,"cat":"ch_complex"},"boekweit_droog":{"e":13,"c":71,"v":3,"kcal":343,"cat":"ch_complex"},"couscous_droog":{"e":13,"c":72,"v":1,"kcal":365,"cat":"ch_complex"},"bulgur_droog":{"e":12,"c":76,"v":1,"kcal":360,"cat":"ch_complex"},"freekeh_droog":{"e":14,"c":72,"v":2,"kcal":360,"cat":"ch_complex"},"aardappel":{"e":2,"c":17,"v":0.1,"kcal":80,"cat":"ch_complex"},"zoete_aardappel":{"e":1.6,"c":20,"v":0.1,"kcal":90,"cat":"ch_complex"},"volkoren_brood":{"e":9,"c":42,"v":3,"kcal":240,"cat":"ch_complex"},"spelt_brood":{"e":11,"c":40,"v":2.5,"kcal":235,"cat":"ch_complex"},"wrap_volkoren":{"e":9,"c":50,"v":7,"kcal":290,"cat":"ch_complex"},"tortillawrap_mais":{"e":8,"c":49,"v":4,"kcal":250,"cat":"ch_complex"},"pita_volkoren":{"e":10,"c":54,"v":2,"kcal":270,"cat":"ch_complex"},"naan_brood":{"e":9,"c":50,"v":5,"kcal":280,"cat":"ch_complex"},"rijstwafels":{"e":8,"c":81,"v":3,"kcal":380,"cat":"ch_complex"},"ciabatta":{"e":9,"c":53,"v":2,"kcal":270,"cat":"ch_complex"},"rijstnoedels_droog":{"e":6,"c":80,"v":1,"kcal":365,"cat":"ch_complex"},"udonnoedels_droog":{"e":11,"c":76,"v":1,"kcal":355,"cat":"ch_complex"},"soba_noedels_droog":{"e":13,"c":73,"v":2,"kcal":350,"cat":"ch_complex"},"rijstpasta_droog":{"e":7,"c":80,"v":1,"kcal":360,"cat":"ch_complex_gv"},"glutenvrij_brood":{"e":5,"c":50,"v":5,"kcal":260,"cat":"ch_complex_gv"},"gv_havermout":{"e":13,"c":60,"v":7,"kcal":370,"cat":"ch_complex_gv"},"polenta_droog":{"e":8,"c":75,"v":1,"kcal":360,"cat":"ch_complex_gv"},"banaan":{"e":1.1,"c":23,"v":0.3,"kcal":95,"cat":"fruit","per_stuk":true,"stuk_g":120},"appel":{"e":0.3,"c":14,"v":0.2,"kcal":60,"cat":"fruit","per_stuk":true,"stuk_g":150},"peer":{"e":0.4,"c":15,"v":0.1,"kcal":60,"cat":"fruit","per_stuk":true,"stuk_g":150},"blauwe_bessen":{"e":0.7,"c":14,"v":0.3,"kcal":60,"cat":"fruit"},"aardbeien":{"e":0.7,"c":8,"v":0.3,"kcal":35,"cat":"fruit"},"frambozen":{"e":1.2,"c":12,"v":0.7,"kcal":55,"cat":"fruit"},"sinaasappel":{"e":0.9,"c":12,"v":0.1,"kcal":50,"cat":"fruit","per_stuk":true,"stuk_g":150},"kiwi":{"e":1.1,"c":15,"v":0.5,"kcal":65,"cat":"fruit","per_stuk":true,"stuk_g":80},"ananas":{"e":0.5,"c":13,"v":0.1,"kcal":50,"cat":"fruit"},"mango":{"e":0.8,"c":15,"v":0.4,"kcal":60,"cat":"fruit"},"druiven":{"e":0.7,"c":17,"v":0.2,"kcal":70,"cat":"fruit"},"diepvries_bessen":{"e":0.7,"c":14,"v":0.3,"kcal":60,"cat":"fruit"},"perzik":{"e":0.9,"c":10,"v":0.3,"kcal":40,"cat":"fruit"},"granaatappel":{"e":1.7,"c":19,"v":1.2,"kcal":85,"cat":"fruit"},"limoen":{"e":0.7,"c":11,"v":0.2,"kcal":30,"cat":"fruit"},"broccoli":{"e":3,"c":5,"v":0.4,"kcal":35,"cat":"groenten"},"bloemkool":{"e":2,"c":4,"v":0.3,"kcal":25,"cat":"groenten"},"spinazie":{"e":3,"c":1,"v":0.4,"kcal":25,"cat":"groenten"},"wortel":{"e":0.9,"c":8,"v":0.2,"kcal":40,"cat":"groenten"},"courgette":{"e":1.2,"c":3,"v":0.3,"kcal":18,"cat":"groenten"},"paprika":{"e":1,"c":6,"v":0.3,"kcal":30,"cat":"groenten"},"tomaat":{"e":0.9,"c":4,"v":0.2,"kcal":20,"cat":"groenten"},"komkommer":{"e":0.7,"c":3,"v":0.1,"kcal":15,"cat":"groenten"},"sla":{"e":1.4,"c":2,"v":0.2,"kcal":15,"cat":"groenten"},"rucola":{"e":2.6,"c":3.7,"v":0.7,"kcal":25,"cat":"groenten"},"champignons":{"e":3,"c":3,"v":0.3,"kcal":22,"cat":"groenten"},"ui":{"e":1.1,"c":9,"v":0.1,"kcal":40,"cat":"groenten"},"lente_ui":{"e":1.8,"c":7,"v":0.2,"kcal":32,"cat":"groenten"},"knoflook":{"e":6,"c":33,"v":0.5,"kcal":150,"cat":"groenten"},"asperges":{"e":2.2,"c":4,"v":0.1,"kcal":20,"cat":"groenten"},"boontjes":{"e":1.8,"c":7,"v":0.2,"kcal":30,"cat":"groenten"},"rode_kool":{"e":1.4,"c":7,"v":0.2,"kcal":30,"cat":"groenten"},"witte_kool":{"e":1.3,"c":6,"v":0.1,"kcal":25,"cat":"groenten"},"spruitjes":{"e":3.4,"c":9,"v":0.3,"kcal":45,"cat":"groenten"},"witloof":{"e":0.9,"c":4,"v":0.1,"kcal":17,"cat":"groenten"},"aubergine":{"e":1,"c":6,"v":0.2,"kcal":25,"cat":"groenten"},"okra":{"e":1.9,"c":7,"v":0.2,"kcal":33,"cat":"groenten"},"boonensprutten":{"e":3,"c":6,"v":0.2,"kcal":30,"cat":"groenten"},"bok_choi":{"e":1.5,"c":2,"v":0.2,"kcal":13,"cat":"groenten"},"shiitake":{"e":2.2,"c":7,"v":0.5,"kcal":35,"cat":"groenten"},"diepvries_spinazie":{"e":3,"c":1,"v":0.4,"kcal":25,"cat":"groenten"},"diepvries_broccoli":{"e":3,"c":5,"v":0.4,"kcal":35,"cat":"groenten"},"diepvries_groentemix":{"e":2,"c":7,"v":0.3,"kcal":40,"cat":"groenten"},"passata_tomatensaus":{"e":1.5,"c":6,"v":0.3,"kcal":30,"cat":"groenten"},"tomatenpuree":{"e":4,"c":19,"v":0.5,"kcal":90,"cat":"groenten"},"salsa_verde":{"e":1.3,"c":5,"v":1,"kcal":30,"cat":"groenten"},"olijven_groen":{"e":1,"c":4,"v":11,"kcal":115,"cat":"vet_gezond"},"zongedroogde_tomaten":{"e":4,"c":30,"v":12,"kcal":215,"cat":"groenten"},"olijfolie":{"e":0,"c":0,"v":100,"kcal":900,"cat":"vet_gezond"},"raapzaadolie":{"e":0,"c":0,"v":100,"kcal":900,"cat":"vet_gezond"},"sesamolie":{"e":0,"c":0,"v":100,"kcal":900,"cat":"vet_gezond"},"kokosolie":{"e":0,"c":0,"v":100,"kcal":900,"cat":"vet_gezond"},"avocado":{"e":2,"c":9,"v":15,"kcal":160,"cat":"vet_gezond"},"amandelen":{"e":21,"c":22,"v":50,"kcal":580,"cat":"vet_gezond"},"walnoten":{"e":15,"c":14,"v":65,"kcal":650,"cat":"vet_gezond"},"cashewnoten":{"e":18,"c":30,"v":44,"kcal":555,"cat":"vet_gezond"},"pistachenoten":{"e":20,"c":28,"v":45,"kcal":560,"cat":"vet_gezond"},"pinda's":{"e":26,"c":16,"v":49,"kcal":570,"cat":"vet_gezond"},"pindakaas_100pct":{"e":25,"c":20,"v":50,"kcal":600,"cat":"vet_gezond"},"amandelpasta":{"e":21,"c":19,"v":56,"kcal":615,"cat":"vet_gezond"},"tahini":{"e":17,"c":21,"v":54,"kcal":600,"cat":"vet_gezond"},"lijnzaad":{"e":18,"c":29,"v":42,"kcal":530,"cat":"vet_gezond"},"chiazaad":{"e":17,"c":42,"v":31,"kcal":485,"cat":"vet_gezond"},"zonnebloempitten":{"e":21,"c":20,"v":51,"kcal":580,"cat":"vet_gezond"},"pompoenpitten":{"e":19,"c":54,"v":19,"kcal":446,"cat":"vet_gezond"},"sesamzaad":{"e":18,"c":23,"v":50,"kcal":575,"cat":"vet_gezond"},"soyamelk_ongezoet":{"e":3.3,"c":0.6,"v":1.8,"kcal":33,"cat":"zuivel_plant"},"havermelk_ongezoet":{"e":1,"c":6.5,"v":1.5,"kcal":45,"cat":"zuivel_plant"},"amandelmelk_ongezoet":{"e":0.5,"c":0.3,"v":1.5,"kcal":17,"cat":"zuivel_plant"},"kokosmelk_blik":{"e":2,"c":3,"v":21,"kcal":200,"cat":"zuivel_plant"},"soyayoghurt":{"e":4,"c":2,"v":2,"kcal":45,"cat":"zuivel_plant"},"lactosevrije_kwark":{"e":12,"c":4,"v":0.3,"kcal":70,"cat":"zuivel_plant"},"lactosevrije_yoghurt":{"e":4,"c":4,"v":1.5,"kcal":45,"cat":"zuivel_plant"},"honing":{"e":0.3,"c":82,"v":0,"kcal":305,"cat":"ch_snel"},"ahornsiroop":{"e":0,"c":67,"v":0,"kcal":260,"cat":"ch_snel"},"rozijnen":{"e":3,"c":79,"v":0.5,"kcal":300,"cat":"ch_snel"},"dadels":{"e":1.8,"c":75,"v":0.2,"kcal":280,"cat":"ch_snel"},"abrikozen_gedroogd":{"e":3.4,"c":63,"v":0.5,"kcal":240,"cat":"ch_snel"},"soyasaus":{"e":8,"c":5,"v":0,"kcal":53,"cat":"diversen"},"rode_currypasta":{"e":2,"c":9,"v":8,"kcal":110,"cat":"diversen"},"groene_currypasta":{"e":2,"c":8,"v":7,"kcal":100,"cat":"diversen"},"harissa":{"e":4,"c":13,"v":8,"kcal":130,"cat":"diversen"},"miso_pasta":{"e":12,"c":26,"v":6,"kcal":200,"cat":"diversen"},"mosterd":{"e":4,"c":5,"v":4,"kcal":80,"cat":"diversen"},"oestersaus":{"e":1,"c":14,"v":0,"kcal":60,"cat":"diversen"},"kokosroom":{"e":2,"c":6,"v":22,"kcal":230,"cat":"vet_gezond"},"whey_concentraat":{"e":75,"c":8,"v":6,"kcal":380,"cat":"supp_eiwit"},"whey_isolaat":{"e":90,"c":1,"v":1,"kcal":380,"cat":"supp_eiwit"},"caseine":{"e":80,"c":5,"v":2,"kcal":370,"cat":"supp_eiwit"},"soja_eiwitpoeder":{"e":80,"c":5,"v":2,"kcal":370,"cat":"supp_eiwit"},"erwten_eiwitpoeder":{"e":80,"c":5,"v":5,"kcal":380,"cat":"supp_eiwit"},"fonio_droog":{"e":8.7,"c":75,"v":1.5,"kcal":360,"categorie":"granen"},"teff_droog":{"e":13,"c":73,"v":2.4,"kcal":367,"categorie":"granen"},"injera":{"e":4.5,"c":30,"v":1,"kcal":150,"categorie":"granen"},"citroen":{"e":1.1,"c":9,"v":0.3,"kcal":29,"categorie":"fruit","per_stuk":true,"stuk_g":80},"yam_gekookt":{"e":1.5,"c":27,"v":0.2,"kcal":116,"categorie":"groenten"},"cassave_gekookt":{"e":1.4,"c":38,"v":0.3,"kcal":160,"categorie":"groenten"},"plantain_gekookt":{"e":1.3,"c":32,"v":0.4,"kcal":122,"categorie":"groenten"},"kapitein_vis":{"e":18,"c":0,"v":4,"kcal":110,"categorie":"vis"},"berbere_kruiden":{"e":13,"c":50,"v":12,"kcal":320,"categorie":"kruiden"},"ras_el_hanout":{"e":13,"c":50,"v":14,"kcal":340,"categorie":"kruiden"},"nigeriaanse_pepersoep_kruiden":{"e":10,"c":40,"v":10,"kcal":280,"categorie":"kruiden"},"okra_gekookt":{"e":1.9,"c":7,"v":0.2,"kcal":33,"categorie":"groenten"},"moringa_blad_droog":{"e":27,"c":38,"v":5,"kcal":290,"categorie":"groenten"},"rode_palmoolie":{"e":0,"c":0,"v":100,"kcal":884,"categorie":"vetten"},"scotch_bonnet_peper":{"e":1.9,"c":9,"v":0.4,"kcal":40,"categorie":"groenten"},"boekweitpasta_droog":{"e":13,"c":71,"v":2.7,"kcal":366,"categorie":"granen"},"linzenpasta_droog":{"e":25,"c":53,"v":2,"kcal":340,"categorie":"granen"},"kikkererwtenpasta_droog":{"e":22,"c":58,"v":6,"kcal":360,"categorie":"granen"},"boekweit_pannenkoek":{"e":6,"c":28,"v":2,"kcal":160,"categorie":"granen"},"maismeel":{"e":9,"c":76,"v":4,"kcal":365,"categorie":"granen"},"tortilla_mais_klein":{"e":5,"c":30,"v":2,"kcal":160,"categorie":"granen","per_stuk":true,"stuk_g":30},"rijstcrackers":{"e":8,"c":81,"v":4,"kcal":390,"categorie":"granen"},"kokosmeel":{"e":19,"c":60,"v":9,"kcal":400,"categorie":"granen"},"maizena":{"e":0.3,"c":91,"v":0,"kcal":380,"categorie":"granen"},"kokosyoghurt_naturel":{"e":1.5,"c":8,"v":6,"kcal":80,"categorie":"zuivel"},"voedingsgist":{"e":50,"c":35,"v":7,"kcal":380,"categorie":"kruiden"},"rijstmelk_ongezoet":{"e":0.3,"c":9,"v":1,"kcal":47,"categorie":"drank"},"noten_eiwitpoeder":{"e":25,"c":35,"v":25,"kcal":460,"categorie":"supplement"},"ricepoeder_eiwit":{"e":80,"c":5,"v":1,"kcal":360,"categorie":"supplement"}},"ingredient_categorieen":{"eiwit_dier":["kipfilet","kalkoenfilet","kippenboutje_zonder_vel","rundsbiefstuk_mager","varkenshaas","rundsgehakt_5pct","lamsvlees_mager","ham_mager","chorizo","kalkoenspek","shoarmavlees_kip","zalm_vers","tonijn_vers","kabeljauw","tilapia","garnalen_gepeld","tonijn_blik_water","ansjovis_blik","mosselen","sardientjes_blik","scampi","ei","eiwit"],"zuivel":["griekse_yoghurt_0pct","magere_kwark","skyr","cottage_cheese","feta","halloumi","mozzarella_light","harde_kaas","ricotta","halfvolle_melk","kefir","labneh","yoghurt_natuur"],"vet_gezond":["boter","ghee","olijven_groen","olijfolie","raapzaadolie","sesamolie","kokosolie","avocado","amandelen","walnoten","cashewnoten","pistachenoten","pinda's","pindakaas_100pct","amandelpasta","tahini","lijnzaad","chiazaad","zonnebloempitten","pompoenpitten","sesamzaad","kokosroom"],"eiwit_plant":["tofu_naturel","tofu_gerookt","tempeh","linzen_gekookt","kikkererwten_gekookt","zwarte_bonen_gekookt","rode_kidneybonen","pintobonen","edamame","seitan","rode_linzen_droog","groene_linzen_droog","falafel"],"ch_complex":["havermout","rijst_basmati_droog","rijst_volkoren_droog","rijst_jasmine_droog","pasta_droog","pasta_volkoren_droog","quinoa_droog","boekweit_droog","couscous_droog","bulgur_droog","freekeh_droog","aardappel","zoete_aardappel","volkoren_brood","spelt_brood","wrap_volkoren","tortillawrap_mais","pita_volkoren","naan_brood","rijstwafels","ciabatta","rijstnoedels_droog","udonnoedels_droog","soba_noedels_droog"],"ch_complex_gv":["rijstpasta_droog","glutenvrij_brood","gv_havermout","polenta_droog"],"fruit":["banaan","appel","peer","blauwe_bessen","aardbeien","frambozen","sinaasappel","kiwi","ananas","mango","druiven","diepvries_bessen","perzik","granaatappel","limoen"],"groenten":["broccoli","bloemkool","spinazie","wortel","courgette","paprika","tomaat","komkommer","sla","rucola","champignons","ui","lente_ui","knoflook","asperges","boontjes","rode_kool","witte_kool","spruitjes","witloof","aubergine","okra","boonensprutten","bok_choi","shiitake","diepvries_spinazie","diepvries_broccoli","diepvries_groentemix","passata_tomatensaus","tomatenpuree","salsa_verde","zongedroogde_tomaten"],"zuivel_plant":["soyamelk_ongezoet","havermelk_ongezoet","amandelmelk_ongezoet","kokosmelk_blik","soyayoghurt","lactosevrije_kwark","lactosevrije_yoghurt"],"ch_snel":["honing","ahornsiroop","rozijnen","dadels","abrikozen_gedroogd"],"diversen":["soyasaus","rode_currypasta","groene_currypasta","harissa","miso_pasta","mosterd","oestersaus"],"supp_eiwit":["whey_concentraat","whey_isolaat","caseine","soja_eiwitpoeder","erwten_eiwitpoeder"]},"recepten":[{"id":1,"naam":"Havermout met banaan en pindakaas","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":24.0,"ch_g":90.3,"vet_g":17.2,"kcal":618},"ingredienten":[{"item":"havermout","gram":80},{"item":"halfvolle_melk","gram":250},{"item":"banaan","gram":1},{"item":"pindakaas_100pct","gram":15}],"instructies":"Kook havermout met melk 5 min. Snij banaan, voeg toe met pindakaas.","kooktijd_min":8,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":"Klassieke pre-training keuze"},{"id":2,"naam":"Havermout met kwark en bessen","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":34.8,"ch_g":68.3,"vet_g":14.8,"kcal":550},"ingredienten":[{"item":"havermout","gram":60},{"item":"magere_kwark","gram":200},{"item":"diepvries_bessen","gram":100},{"item":"honing","gram":10},{"item":"walnoten","gram":15}],"instructies":"Meng alles, eventueel kort opwarmen. Bessen ontdooien er eerst in.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":3,"naam":"Boterhammen met kaas en ham","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":30.7,"ch_g":46.5,"vet_g":14.0,"kcal":445},"ingredienten":[{"item":"volkoren_brood","gram":100},{"item":"ham_mager","gram":60},{"item":"harde_kaas","gram":30},{"item":"tomaat","gram":80},{"item":"sla","gram":20}],"instructies":"Beleg sneetjes met ham, kaas, tomaat en sla.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":4,"naam":"Boterhammen met kipfilet","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":34.5,"ch_g":45.0,"vet_g":11.3,"kcal":433},"ingredienten":[{"item":"volkoren_brood","gram":100},{"item":"kipfilet","gram":80},{"item":"harde_kaas","gram":25},{"item":"komkommer","gram":80},{"item":"sla","gram":20}],"instructies":"Beleg sneetjes met gerookte kipfilet, kaas en groenten.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":5,"naam":"Roerei op volkorenbrood met spek","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":23.5,"ch_g":29.4,"vet_g":11.9,"kcal":322},"ingredienten":[{"item":"ei","gram":3},{"item":"volkoren_brood","gram":60},{"item":"kalkoenspek","gram":30},{"item":"tomaat","gram":80}],"instructies":"Bak kalkoenspek krokant. Klop eieren, scramble. Toast brood. Combineer.","kooktijd_min":10,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":6,"naam":"Pannenkoeken met kwark en jam","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":35.8,"ch_g":61.8,"vet_g":11.4,"kcal":502},"ingredienten":[{"item":"havermout","gram":60},{"item":"ei","gram":2},{"item":"halfvolle_melk","gram":100},{"item":"magere_kwark","gram":150},{"item":"aardbeien","gram":80},{"item":"honing","gram":10}],"instructies":"Mix havermout + ei + melk in blender. Bak kleine pannenkoeken. Top met kwark, aardbeien en honing.","kooktijd_min":15,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":7,"naam":"Skyr-bowl met granola en appel","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":34.1,"ch_g":59.3,"vet_g":12.7,"kcal":492},"ingredienten":[{"item":"skyr","gram":250},{"item":"havermout","gram":30},{"item":"appel","gram":1},{"item":"walnoten","gram":15},{"item":"honing","gram":10}],"instructies":"Skyr in bowl. Top met havermout, gehakte appel, walnoten en honing.","kooktijd_min":4,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":8,"naam":"Boterhammen met magere kwark en kalkoen","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":40.1,"ch_g":50.3,"vet_g":4.9,"kcal":418},"ingredienten":[{"item":"volkoren_brood","gram":100},{"item":"kalkoenfilet","gram":80},{"item":"magere_kwark","gram":100},{"item":"rucola","gram":30},{"item":"tomaat","gram":80}],"instructies":"Smeer kwark op brood, beleg met kalkoen, rucola en tomaat.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":9,"naam":"Boterhammen met kaas, ham en sla","type":"lunch","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":39.7,"ch_g":56.2,"vet_g":18.3,"kcal":560},"ingredienten":[{"item":"volkoren_brood","gram":120},{"item":"ham_mager","gram":80},{"item":"harde_kaas","gram":40},{"item":"sla","gram":30},{"item":"tomaat","gram":100}],"instructies":"Beleg dubbele boterhammen met ham, kaas, sla en tomaat.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":10,"naam":"Volkorenbrood met gerookte zalm","type":"lunch","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":31.3,"ch_g":50.0,"vet_g":25.3,"kcal":551},"ingredienten":[{"item":"volkoren_brood","gram":100},{"item":"zalm_vers","gram":100},{"item":"avocado","gram":60},{"item":"rucola","gram":30},{"item":"komkommer","gram":50}],"instructies":"Beleg brood met zalm, avocado, rucola en komkommer.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":11,"naam":"Salade met kip en aardappel","type":"lunch","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":44.1,"ch_g":47.8,"vet_g":15.3,"kcal":518},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"aardappel","gram":250},{"item":"sla","gram":50},{"item":"tomaat","gram":100},{"item":"ei","gram":1},{"item":"olijfolie","gram":10}],"instructies":"Kook aardappel + ei. Bak kip. Combineer met sla, tomaat en olie.","kooktijd_min":25,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Klassiek met gehakte ei"},{"id":12,"naam":"Witloofsalade met ham en kaas","type":"lunch","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":29.2,"ch_g":30.2,"vet_g":31.8,"kcal":515},"ingredienten":[{"item":"witloof","gram":150},{"item":"ham_mager","gram":80},{"item":"harde_kaas","gram":30},{"item":"walnoten","gram":15},{"item":"appel","gram":1},{"item":"olijfolie","gram":10}],"instructies":"Snij witloof. Combineer met ham, kaas, appel-blokjes, walnoten en olie.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":13,"naam":"Tomatensoep met balletjes en brood","type":"lunch","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":36.4,"ch_g":50.7,"vet_g":18.9,"kcal":521},"ingredienten":[{"item":"rundsgehakt_5pct","gram":120},{"item":"passata_tomatensaus","gram":350},{"item":"ui","gram":50},{"item":"volkoren_brood","gram":60},{"item":"olijfolie","gram":10}],"instructies":"Vorm balletjes, bak. Voeg ui en passata + water toe. Sudder 15 min. Eet met brood.","kooktijd_min":25,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":14,"naam":"Erwtensoep met worst (mager)","type":"lunch","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":39.4,"ch_g":95.0,"vet_g":15.2,"kcal":685},"ingredienten":[{"item":"rode_linzen_droog","gram":80},{"item":"kalkoenspek","gram":50},{"item":"aardappel","gram":200},{"item":"wortel","gram":100},{"item":"ui","gram":50},{"item":"olijfolie","gram":10}],"instructies":"Bak ui. Voeg linzen, gesneden aardappel, wortel, water + bouillon toe. Kook 30 min. Voeg gebakken kalkoenspek toe.","kooktijd_min":40,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Snufje rookgaarheid"},{"id":15,"naam":"Pasta met kipsaus","type":"lunch","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":58.3,"ch_g":92.8,"vet_g":22.2,"kcal":805},"ingredienten":[{"item":"pasta_volkoren_droog","gram":100},{"item":"kipfilet","gram":150},{"item":"passata_tomatensaus","gram":200},{"item":"ui","gram":50},{"item":"paprika","gram":100},{"item":"harde_kaas","gram":25},{"item":"olijfolie","gram":10}],"instructies":"Kook pasta. Bak kip in stukjes met ui en paprika. Voeg passata toe. Combineer.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":16,"naam":"Tomatensalade met tonijn en aardappel","type":"lunch","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":47.6,"ch_g":53.5,"vet_g":14.7,"kcal":550},"ingredienten":[{"item":"tonijn_blik_water","gram":150},{"item":"aardappel","gram":250},{"item":"tomaat","gram":200},{"item":"ei","gram":1},{"item":"ui","gram":30},{"item":"olijfolie","gram":10}],"instructies":"Kook aardappel + ei. Combineer met tonijn, tomaat, ui en olie.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":17,"naam":"Wrap met kalkoen en groenten","type":"lunch","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":38.2,"ch_g":42.5,"vet_g":15.5,"kcal":448},"ingredienten":[{"item":"wrap_volkoren","gram":60},{"item":"kalkoenfilet","gram":120},{"item":"avocado","gram":60},{"item":"paprika","gram":80},{"item":"rucola","gram":30},{"item":"magere_kwark","gram":30}],"instructies":"Smeer kwark op wrap. Vul met kalkoen, avocado, paprika en rucola. Rol op.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":18,"naam":"Hutspot met rookworst light","type":"lunch","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":33.0,"ch_g":79.1,"vet_g":8.0,"kcal":536},"ingredienten":[{"item":"aardappel","gram":300},{"item":"wortel","gram":200},{"item":"ui","gram":100},{"item":"kalkoenspek","gram":80},{"item":"halfvolle_melk","gram":50}],"instructies":"Kook aardappel, wortel, ui samen 25 min. Stamp met melk. Bak kalkoenspek erbij.","kooktijd_min":35,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Comfort food, rijk aan CH"},{"id":19,"naam":"Stoofvlees met aardappelen en rode kool","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":57.5,"ch_g":80.7,"vet_g":21.6,"kcal":759},"ingredienten":[{"item":"rundsbiefstuk_mager","gram":180},{"item":"aardappel","gram":350},{"item":"rode_kool","gram":200},{"item":"ui","gram":80},{"item":"olijfolie","gram":10}],"instructies":"Bak vlees+ui. Stoof 1.5u in bouillon. Kook aardappel en kool apart.","kooktijd_min":100,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Maak voor 4 personen, eet 2 dagen"},{"id":20,"naam":"Witloof in hesp met kaassaus light","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":47.5,"ch_g":73.8,"vet_g":28.8,"kcal":749},"ingredienten":[{"item":"witloof","gram":300},{"item":"ham_mager","gram":100},{"item":"aardappel","gram":300},{"item":"harde_kaas","gram":40},{"item":"halfvolle_melk","gram":200},{"item":"olijfolie","gram":10}],"instructies":"Stoom witloof. Wikkel in ham. Maak lichte kaassaus met melk. Oven 20 min. Kook aardappel.","kooktijd_min":50,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":21,"naam":"Gehaktbal met aardappel en wortel","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":46.1,"ch_g":71.5,"vet_g":19.8,"kcal":673},"ingredienten":[{"item":"rundsgehakt_5pct","gram":180},{"item":"aardappel","gram":300},{"item":"wortel","gram":200},{"item":"ui","gram":50},{"item":"olijfolie","gram":10}],"instructies":"Vorm balletjes, bak. Kook aardappel en wortel. Serveer met saus.","kooktijd_min":35,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Klassiek 'kost en boeren' diner"},{"id":22,"naam":"Vol-au-vent light met rijst","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":58.8,"ch_g":80.8,"vet_g":17.0,"kcal":715},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"rijst_basmati_droog","gram":80},{"item":"champignons","gram":150},{"item":"halfvolle_melk","gram":200},{"item":"ui","gram":50},{"item":"olijfolie","gram":10}],"instructies":"Bak kip + ui + champignons. Maak lichte saus met melk. Serveer met rijst.","kooktijd_min":30,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":23,"naam":"Spaghetti bolognese","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":54.2,"ch_g":93.7,"vet_g":26.0,"kcal":830},"ingredienten":[{"item":"pasta_volkoren_droog","gram":100},{"item":"rundsgehakt_5pct","gram":150},{"item":"passata_tomatensaus","gram":250},{"item":"ui","gram":50},{"item":"wortel","gram":50},{"item":"olijfolie","gram":10},{"item":"harde_kaas","gram":20}],"instructies":"Bak gehakt + ui + wortel. Voeg passata toe, sudder 15 min. Kook pasta. Combineer.","kooktijd_min":25,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":24,"naam":"Aardappelpuree met biefstuk en boontjes","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":59.1,"ch_g":75.8,"vet_g":22.3,"kcal":750},"ingredienten":[{"item":"rundsbiefstuk_mager","gram":180},{"item":"aardappel","gram":350},{"item":"boontjes","gram":200},{"item":"halfvolle_melk","gram":50},{"item":"olijfolie","gram":10}],"instructies":"Kook aardappel, pureer met melk. Bak biefstuk. Stoom boontjes.","kooktijd_min":30,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":25,"naam":"Varkenshaas met aardappelpartjes en spruitjes","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":53.4,"ch_g":77.5,"vet_g":23.1,"kcal":739},"ingredienten":[{"item":"varkenshaas","gram":180},{"item":"aardappel","gram":350},{"item":"spruitjes","gram":200},{"item":"olijfolie","gram":15}],"instructies":"Aardappelpartjes 25 min in oven. Bak varkenshaas. Stoom spruitjes.","kooktijd_min":35,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":26,"naam":"Vissticks-style: gepaneerde kabeljauw met frieten en erwten","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":46.8,"ch_g":88.8,"vet_g":22.0,"kcal":740},"ingredienten":[{"item":"kabeljauw","gram":180},{"item":"zoete_aardappel","gram":300},{"item":"ei","gram":1},{"item":"havermout","gram":30},{"item":"boontjes","gram":150},{"item":"olijfolie","gram":15}],"instructies":"Paneer kabeljauw met ei en havermout-kruim. Maak zoete aardappelfrieten in oven. Stoom erwten.","kooktijd_min":35,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":27,"naam":"Kip met mosterdsaus en aardappel","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":58.4,"ch_g":75.0,"vet_g":15.9,"kcal":697},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"aardappel","gram":350},{"item":"broccoli","gram":200},{"item":"mosterd","gram":15},{"item":"halfvolle_melk","gram":100},{"item":"olijfolie","gram":10}],"instructies":"Bak kip. Maak saus met melk + mosterd. Kook aardappel en broccoli.","kooktijd_min":28,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":28,"naam":"Gestoofde rundvlees met champignons en pasta","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":67.3,"ch_g":82.5,"vet_g":23.7,"kcal":811},"ingredienten":[{"item":"rundsbiefstuk_mager","gram":180},{"item":"pasta_volkoren_droog","gram":90},{"item":"champignons","gram":200},{"item":"ui","gram":50},{"item":"passata_tomatensaus","gram":150},{"item":"olijfolie","gram":10}],"instructies":"Bak vlees + ui + champignons. Voeg passata toe, sudder 30 min. Kook pasta. Combineer.","kooktijd_min":50,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":29,"naam":"Lasagne met spinazie en gehakt","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":63.3,"ch_g":57.9,"vet_g":28.3,"kcal":758},"ingredienten":[{"item":"rundsgehakt_5pct","gram":180},{"item":"pasta_droog","gram":60},{"item":"passata_tomatensaus","gram":200},{"item":"diepvries_spinazie","gram":150},{"item":"mozzarella_light","gram":60},{"item":"olijfolie","gram":10}],"instructies":"Maak ragout van gehakt+passata. Wissel met spinazie en pasta-vellen. Top kaas. 35 min oven.","kooktijd_min":60,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":30,"naam":"Salade met varkenshaas, appel en walnoten","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":49.4,"ch_g":68.1,"vet_g":31.1,"kcal":756},"ingredienten":[{"item":"varkenshaas","gram":180},{"item":"aardappel","gram":250},{"item":"rucola","gram":50},{"item":"appel","gram":1},{"item":"walnoten","gram":20},{"item":"olijfolie","gram":10}],"instructies":"Kook aardappel. Bak varkenshaas. Combineer met rucola, gesneden appel en walnoten.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":31,"naam":"Magere kwark met honing en walnoten","type":"snack","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":26.3,"ch_g":18.3,"vet_g":10.3,"kcal":268},"ingredienten":[{"item":"magere_kwark","gram":200},{"item":"honing","gram":10},{"item":"walnoten","gram":15}],"instructies":"Combineer in bowl.","kooktijd_min":2,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":32,"naam":"Hardgekookt ei met sneetje brood","type":"snack","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":11.7,"ch_g":13.3,"vet_g":8.4,"kcal":177},"ingredienten":[{"item":"ei","gram":3},{"item":"volkoren_brood","gram":30}],"instructies":"Kook eieren 8 min. Eet met brood en zout.","kooktijd_min":10,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":33,"naam":"Kalkoen-roulades met kaas","type":"snack","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":26.7,"ch_g":16.5,"vet_g":10.2,"kcal":268},"ingredienten":[{"item":"kalkoenfilet","gram":80},{"item":"harde_kaas","gram":30},{"item":"rijstwafels","gram":20}],"instructies":"Rol kalkoen rond kaas. Eet met rijstwafels.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":34,"naam":"Banaan met pindakaas","type":"snack","keuken":"belgisch_nederlands","eiwit_niveau":"veganistisch","macros":{"eiwit_g":6.3,"ch_g":31.6,"vet_g":10.4,"kcal":234},"ingredienten":[{"item":"banaan","gram":1},{"item":"pindakaas_100pct","gram":20}],"instructies":"Snij banaan, dip in pindakaas.","kooktijd_min":2,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":35,"naam":"Skyr met granola en appel","type":"snack","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":26.4,"ch_g":51.1,"vet_g":2.8,"kcal":346},"ingredienten":[{"item":"skyr","gram":200},{"item":"havermout","gram":30},{"item":"appel","gram":1},{"item":"honing","gram":5}],"instructies":"Combineer.","kooktijd_min":4,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":36,"naam":"Cottage cheese met komkommer","type":"snack","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":22.7,"ch_g":9.0,"vet_g":8.1,"kcal":205},"ingredienten":[{"item":"cottage_cheese","gram":200},{"item":"komkommer","gram":100}],"instructies":"Combineer met peper.","kooktijd_min":2,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":37,"naam":"Recovery: kip met aardappel en groenten","type":"post_workout","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":43.2,"ch_g":61.5,"vet_g":2.8,"kcal":450},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"aardappel","gram":300},{"item":"boontjes","gram":150}],"instructies":"Kook aardappel. Bak kip. Stoom boontjes.","kooktijd_min":25,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":38,"naam":"Recovery shake met pindakaas en banaan","type":"post_workout","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":48.9,"ch_g":75.2,"vet_g":16.3,"kcal":643},"ingredienten":[{"item":"halfvolle_melk","gram":400},{"item":"whey_concentraat","gram":35},{"item":"banaan","gram":1},{"item":"havermout","gram":40},{"item":"pindakaas_100pct","gram":10}],"instructies":"Mix in blender. Drink binnen 30 min na training.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":39,"naam":"Recovery: pasta met gehaktsaus","type":"post_workout","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":48.3,"ch_g":82.2,"vet_g":14.7,"kcal":658},"ingredienten":[{"item":"pasta_volkoren_droog","gram":100},{"item":"rundsgehakt_5pct","gram":130},{"item":"passata_tomatensaus","gram":200},{"item":"harde_kaas","gram":20}],"instructies":"Kook pasta. Bak gehakt + passata. Combineer.","kooktijd_min":20,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":40,"naam":"Recovery: kwark met haver en honing","type":"post_workout","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":38.4,"ch_g":73.6,"vet_g":5.2,"kcal":506},"ingredienten":[{"item":"magere_kwark","gram":250},{"item":"havermout","gram":60},{"item":"honing","gram":20},{"item":"blauwe_bessen","gram":80}],"instructies":"Combineer. Eet binnen 1u na training.","kooktijd_min":4,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":41,"naam":"Magere kwark met chia en bessen","type":"pre_bed","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":36.3,"ch_g":30.8,"vet_g":13.1,"kcal":383},"ingredienten":[{"item":"magere_kwark","gram":250},{"item":"chiazaad","gram":15},{"item":"blauwe_bessen","gram":80},{"item":"amandelen","gram":15}],"instructies":"Combineer in bowl. Laat 5 min staan voor chia.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":"Traag verteerd, caseïne-rijk"},{"id":42,"naam":"Cottage cheese met walnoten en honing","type":"pre_bed","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":25.0,"ch_g":17.0,"vet_g":21.0,"kcal":350},"ingredienten":[{"item":"cottage_cheese","gram":200},{"item":"walnoten","gram":20},{"item":"honing","gram":10}],"instructies":"Combineer. 1-2u voor slapen.","kooktijd_min":2,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":43,"naam":"Caseïne shake met haver en pindakaas","type":"pre_bed","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":40.6,"ch_g":35.6,"vet_g":12.2,"kcal":423},"ingredienten":[{"item":"halfvolle_melk","gram":300},{"item":"caseine","gram":30},{"item":"havermout","gram":30},{"item":"pindakaas_100pct","gram":10}],"instructies":"Mix in blender.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":44,"naam":"Magere kwark met haver en banaan","type":"pre_bed","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":29.2,"ch_g":53.6,"vet_g":3.1,"kcal":365},"ingredienten":[{"item":"magere_kwark","gram":200},{"item":"havermout","gram":30},{"item":"banaan","gram":1}],"instructies":"Combineer. Verzadigend pre-bed.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":45,"naam":"Pre-workout: havermout-banaan-honing","type":"pre_workout","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":16.0,"ch_g":85.3,"vet_g":7.6,"kcal":476},"ingredienten":[{"item":"havermout","gram":60},{"item":"halfvolle_melk","gram":200},{"item":"banaan","gram":1},{"item":"honing","gram":15}],"instructies":"Kook havermout met melk. Top met banaan en honing.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":"Veel CH, weinig vet — ideaal 1-2u voor training"},{"id":46,"naam":"Pre-workout: rijstwafels met kwark en banaan","type":"pre_workout","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":16.6,"ch_g":76.3,"vet_g":1.9,"kcal":382},"ingredienten":[{"item":"rijstwafels","gram":40},{"item":"magere_kwark","gram":100},{"item":"banaan","gram":1},{"item":"honing","gram":15}],"instructies":"Smeer kwark op rijstwafels, top met banaan en honing.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":"Snel verteerbaar"},{"id":47,"naam":"Griekse yoghurt met honing en walnoten","type":"ontbijt","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":28.9,"ch_g":35.1,"vet_g":13.3,"kcal":356},"ingredienten":[{"item":"griekse_yoghurt_0pct","gram":250},{"item":"honing","gram":15},{"item":"walnoten","gram":20},{"item":"perzik","gram":100}],"instructies":"Yoghurt in bowl. Top met walnoten, honing en gesneden perzik.","kooktijd_min":4,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":48,"naam":"Tomaat-feta-toast","type":"ontbijt","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":26.7,"ch_g":47.5,"vet_g":34.8,"kcal":617},"ingredienten":[{"item":"volkoren_brood","gram":90},{"item":"feta","gram":80},{"item":"tomaat","gram":150},{"item":"olijfolie","gram":10},{"item":"ei","gram":2}],"instructies":"Toast brood. Pers tomaat erop, verkruimel feta. Bak ei en leg erbovenop.","kooktijd_min":10,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":49,"naam":"Spaanse omelet (tortilla)","type":"ontbijt","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":17.7,"ch_g":47.0,"vet_g":25.5,"kcal":491},"ingredienten":[{"item":"ei","gram":4},{"item":"aardappel","gram":200},{"item":"ui","gram":80},{"item":"olijfolie","gram":15},{"item":"paprika","gram":80}],"instructies":"Bak aardappel + ui + paprika in olie 10 min. Klop eieren erbij. Bak tot stevig.","kooktijd_min":25,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":50,"naam":"Italiaanse ricotta-toast met honing en bessen","type":"ontbijt","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":21.9,"ch_g":59.3,"vet_g":23.1,"kcal":532},"ingredienten":[{"item":"volkoren_brood","gram":80},{"item":"ricotta","gram":100},{"item":"blauwe_bessen","gram":80},{"item":"honing","gram":10},{"item":"amandelen","gram":15}],"instructies":"Toast brood. Smeer ricotta erop. Top met bessen, honing en amandelen.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":51,"naam":"Mediterraanse roerei met zongedroogde tomaat","type":"ontbijt","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":23.4,"ch_g":44.7,"vet_g":23.0,"kcal":471},"ingredienten":[{"item":"ei","gram":3},{"item":"zongedroogde_tomaten","gram":30},{"item":"feta","gram":50},{"item":"ciabatta","gram":60},{"item":"rucola","gram":30}],"instructies":"Klop eieren met feta + zongedroogde tomaat. Roer-bak. Eet met ciabatta en rucola.","kooktijd_min":10,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":52,"naam":"Yoghurt-bowl met granola en granaatappel","type":"ontbijt","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":33.4,"ch_g":54.7,"vet_g":10.6,"kcal":436},"ingredienten":[{"item":"griekse_yoghurt_0pct","gram":250},{"item":"havermout","gram":30},{"item":"granaatappel","gram":80},{"item":"amandelen","gram":15},{"item":"honing","gram":10}],"instructies":"Yoghurt in bowl. Top met havermout, granaatappel-pitten, amandelen en honing.","kooktijd_min":4,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":53,"naam":"Caprese met mozzarella, tomaat en ciabatta","type":"lunch","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":36.8,"ch_g":53.0,"vet_g":35.2,"kcal":676},"ingredienten":[{"item":"mozzarella_light","gram":150},{"item":"tomaat","gram":200},{"item":"rucola","gram":30},{"item":"ciabatta","gram":80},{"item":"olijfolie","gram":15}],"instructies":"Snij mozzarella en tomaat, leg op rucola. Sprenkel olie. Eet met ciabatta.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":54,"naam":"Griekse salade met kip","type":"lunch","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":51.0,"ch_g":40.5,"vet_g":35.4,"kcal":694},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"feta","gram":60},{"item":"tomaat","gram":150},{"item":"komkommer","gram":100},{"item":"olijven_groen","gram":30},{"item":"ui","gram":30},{"item":"olijfolie","gram":15},{"item":"volkoren_brood","gram":60}],"instructies":"Bak kip. Combineer met feta, tomaat, komkommer, olijven en ui. Sprenkel olie. Eet met brood.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":55,"naam":"Pasta met tonijn, kappertjes en olijven","type":"lunch","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":54.1,"ch_g":83.0,"vet_g":17.5,"kcal":707},"ingredienten":[{"item":"pasta_volkoren_droog","gram":100},{"item":"tonijn_blik_water","gram":150},{"item":"passata_tomatensaus","gram":150},{"item":"olijven_groen","gram":30},{"item":"knoflook","gram":5},{"item":"olijfolie","gram":10},{"item":"rucola","gram":30}],"instructies":"Kook pasta. Bak knoflook in olie. Voeg passata, tonijn en olijven toe. Combineer.","kooktijd_min":15,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":56,"naam":"Bruschetta met tonijn en bonen","type":"lunch","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":53.7,"ch_g":94.7,"vet_g":14.2,"kcal":720},"ingredienten":[{"item":"ciabatta","gram":100},{"item":"tonijn_blik_water","gram":120},{"item":"zwarte_bonen_gekookt","gram":150},{"item":"tomaat","gram":100},{"item":"olijfolie","gram":10},{"item":"knoflook","gram":5}],"instructies":"Toast ciabatta. Wrijf in met knoflook. Top met tonijn-bonen-tomaat-mengsel + olie.","kooktijd_min":10,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":57,"naam":"Spaanse paella light met kip","type":"lunch","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":58.3,"ch_g":81.5,"vet_g":14.3,"kcal":696},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"rijst_basmati_droog","gram":90},{"item":"paprika","gram":100},{"item":"garnalen_gepeld","gram":80},{"item":"erwten","gram":0},{"item":"ui","gram":50},{"item":"olijfolie","gram":10}],"instructies":"Bak kip + ui + paprika. Voeg rijst + bouillon toe. Kook 18 min. Voeg garnalen + erwten laatste 5 min toe.","kooktijd_min":35,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":58,"naam":"Tonijnsalade met witte bonen en olijven (Italiaans)","type":"lunch","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":58.6,"ch_g":74.5,"vet_g":17.2,"kcal":684},"ingredienten":[{"item":"tonijn_blik_water","gram":150},{"item":"zwarte_bonen_gekookt","gram":150},{"item":"tomaat","gram":100},{"item":"rucola","gram":40},{"item":"olijven_groen","gram":30},{"item":"olijfolie","gram":10},{"item":"ciabatta","gram":60}],"instructies":"Meng alles. Eet met geroosterd brood.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":59,"naam":"Pita met kip-souvlaki en tzatziki","type":"lunch","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":51.6,"ch_g":51.4,"vet_g":9.1,"kcal":496},"ingredienten":[{"item":"pita_volkoren","gram":80},{"item":"kipfilet","gram":150},{"item":"griekse_yoghurt_0pct","gram":80},{"item":"komkommer","gram":60},{"item":"tomaat","gram":80},{"item":"olijfolie","gram":5}],"instructies":"Bak kip met oregano. Maak tzatziki met yoghurt + geraspte komkommer + knoflook. Vul pita.","kooktijd_min":15,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":60,"naam":"Spaanse gazpacho met brood en gegrilde kip","type":"lunch","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":43.7,"ch_g":50.2,"vet_g":14.3,"kcal":509},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"tomaat","gram":250},{"item":"paprika","gram":100},{"item":"komkommer","gram":80},{"item":"ciabatta","gram":60},{"item":"olijfolie","gram":10}],"instructies":"Pureer tomaat + paprika + komkommer + brood + olie tot gazpacho. Bak kip apart.","kooktijd_min":20,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":61,"naam":"Risotto met champignons en parmezaan","type":"lunch","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":55.5,"ch_g":88.8,"vet_g":22.3,"kcal":777},"ingredienten":[{"item":"rijst_basmati_droog","gram":100},{"item":"champignons","gram":200},{"item":"ui","gram":50},{"item":"harde_kaas","gram":30},{"item":"kipfilet","gram":150},{"item":"olijfolie","gram":10}],"instructies":"Bak ui + champignons. Voeg rijst + bouillon toe in scheutjes. Roer. Voeg kip + kaas toe.","kooktijd_min":30,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":62,"naam":"Souvlaki met couscous en tzatziki","type":"diner","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":61.7,"ch_g":72.8,"vet_g":13.9,"kcal":682},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"couscous_droog","gram":80},{"item":"paprika","gram":100},{"item":"ui","gram":50},{"item":"griekse_yoghurt_0pct","gram":80},{"item":"olijfolie","gram":10},{"item":"komkommer","gram":50}],"instructies":"Rijg kip + groenten op spies, bak. Kook couscous. Maak tzatziki met yoghurt + komkommer.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":63,"naam":"Italiaanse moussaka met aubergine","type":"diner","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":52.6,"ch_g":51.5,"vet_g":35.6,"kcal":738},"ingredienten":[{"item":"rundsgehakt_5pct","gram":180},{"item":"aubergine","gram":250},{"item":"aardappel","gram":150},{"item":"passata_tomatensaus","gram":150},{"item":"feta","gram":50},{"item":"olijfolie","gram":15}],"instructies":"Bak gehakt + passata. Wissel in ovenschotel met aubergine en aardappel. Top feta. 30 min oven.","kooktijd_min":60,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":64,"naam":"Pasta primavera met kip en groenten","type":"diner","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":56.2,"ch_g":80.9,"vet_g":26.9,"kcal":796},"ingredienten":[{"item":"pasta_volkoren_droog","gram":100},{"item":"kipfilet","gram":150},{"item":"courgette","gram":100},{"item":"paprika","gram":100},{"item":"olijfolie","gram":15},{"item":"harde_kaas","gram":25},{"item":"knoflook","gram":5}],"instructies":"Kook pasta. Bak kip + groenten met knoflook. Combineer met olie en kaas.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":65,"naam":"Lamskotelet met aardappel en tzatziki","type":"diner","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":61.2,"ch_g":65.6,"vet_g":25.0,"kcal":746},"ingredienten":[{"item":"lamsvlees_mager","gram":180},{"item":"aardappel","gram":350},{"item":"griekse_yoghurt_0pct","gram":80},{"item":"komkommer","gram":60},{"item":"olijfolie","gram":10},{"item":"rucola","gram":30}],"instructies":"Bak lamsvlees met rozemarijn. Kook aardappel. Maak tzatziki. Serveer met rucola.","kooktijd_min":35,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":66,"naam":"Pasta carbonara light","type":"diner","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":48.9,"ch_g":71.6,"vet_g":31.8,"kcal":770},"ingredienten":[{"item":"pasta_volkoren_droog","gram":100},{"item":"kalkoenspek","gram":80},{"item":"ei","gram":2},{"item":"harde_kaas","gram":30},{"item":"olijfolie","gram":10}],"instructies":"Kook pasta. Bak kalkoenspek-blokjes. Klop eieren + kaas. Meng met hete pasta + spek.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":67,"naam":"Italiaanse osso buco light","type":"diner","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":58.3,"ch_g":101.4,"vet_g":22.7,"kcal":854},"ingredienten":[{"item":"rundsbiefstuk_mager","gram":180},{"item":"rijst_basmati_droog","gram":90},{"item":"wortel","gram":150},{"item":"ui","gram":80},{"item":"passata_tomatensaus","gram":200},{"item":"olijfolie","gram":10}],"instructies":"Stoof vlees + ui + wortel + passata 1u. Kook rijst.","kooktijd_min":75,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":68,"naam":"Spaanse cod (kabeljauw met tomaat)","type":"diner","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":45.5,"ch_g":67.2,"vet_g":16.4,"kcal":600},"ingredienten":[{"item":"kabeljauw","gram":200},{"item":"aardappel","gram":300},{"item":"passata_tomatensaus","gram":150},{"item":"paprika","gram":100},{"item":"olijven_groen","gram":30},{"item":"olijfolie","gram":10}],"instructies":"Bak passata + paprika + olijven. Pocheer kabeljauw 8 min in saus. Kook aardappel.","kooktijd_min":30,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":69,"naam":"Saltimbocca met aardappel en spinazie","type":"diner","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":56.7,"ch_g":52.8,"vet_g":19.8,"kcal":640},"ingredienten":[{"item":"kalkoenfilet","gram":180},{"item":"ham_mager","gram":30},{"item":"aardappel","gram":300},{"item":"spinazie","gram":150},{"item":"olijfolie","gram":15}],"instructies":"Wikkel ham om kalkoen, bak. Kook aardappel. Stoom spinazie.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":70,"naam":"Pizza Bianca met kalkoen, ricotta en rucola","type":"diner","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":50.6,"ch_g":87.4,"vet_g":25.7,"kcal":790},"ingredienten":[{"item":"ciabatta","gram":150},{"item":"kalkoenfilet","gram":120},{"item":"ricotta","gram":80},{"item":"rucola","gram":40},{"item":"olijfolie","gram":10},{"item":"tomaat","gram":100}],"instructies":"Splijt ciabatta. Smeer ricotta. Top met kalkoen, tomaat. 8 min oven. Top rucola.","kooktijd_min":15,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":71,"naam":"Zalm Mediterraans met aardappel en olijven","type":"diner","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":45.4,"ch_g":67.8,"vet_g":37.6,"kcal":802},"ingredienten":[{"item":"zalm_vers","gram":180},{"item":"aardappel","gram":350},{"item":"olijven_groen","gram":30},{"item":"tomaat","gram":150},{"item":"olijfolie","gram":10},{"item":"rucola","gram":30}],"instructies":"Kook aardappel. Bak zalm met olijven en tomaat. Serveer met rucola.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":72,"naam":"Spaghetti met scampi en knoflook","type":"diner","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":55.2,"ch_g":79.8,"vet_g":19.4,"kcal":714},"ingredienten":[{"item":"pasta_volkoren_droog","gram":100},{"item":"garnalen_gepeld","gram":200},{"item":"knoflook","gram":8},{"item":"olijfolie","gram":15},{"item":"rucola","gram":30},{"item":"tomaat","gram":100}],"instructies":"Kook pasta. Bak knoflook + garnalen + tomaat in olie. Combineer met pasta en rucola.","kooktijd_min":15,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":73,"naam":"Mediterrane runderspies met rijst","type":"diner","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":55.5,"ch_g":78.6,"vet_g":22.3,"kcal":747},"ingredienten":[{"item":"rundsbiefstuk_mager","gram":180},{"item":"rijst_basmati_droog","gram":80},{"item":"paprika","gram":100},{"item":"ui","gram":80},{"item":"courgette","gram":100},{"item":"olijfolie","gram":10}],"instructies":"Rijg vlees + groenten op spies, bak. Kook rijst.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":74,"naam":"Griekse yoghurt met honing en amandelen","type":"snack","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":23.2,"ch_g":19.5,"vet_g":7.5,"kcal":230},"ingredienten":[{"item":"griekse_yoghurt_0pct","gram":200},{"item":"honing","gram":10},{"item":"amandelen","gram":15}],"instructies":"Combineer.","kooktijd_min":2,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":75,"naam":"Olijven en feta","type":"snack","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":11.1,"ch_g":25.2,"vet_g":16.8,"kcal":298},"ingredienten":[{"item":"olijven_groen","gram":50},{"item":"feta","gram":50},{"item":"ciabatta","gram":40}],"instructies":"Combineer met paar druppels olijfolie.","kooktijd_min":2,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":76,"naam":"Bruschetta met tomaat en mozzarella","type":"snack","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":17.1,"ch_g":36.4,"vet_g":13.6,"kcal":338},"ingredienten":[{"item":"ciabatta","gram":60},{"item":"mozzarella_light","gram":60},{"item":"tomaat","gram":100},{"item":"olijfolie","gram":5}],"instructies":"Toast ciabatta. Top met tomaat + mozzarella + olie.","kooktijd_min":4,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":77,"naam":"Caprese-spies (mozzarella + tomaat + basilicum)","type":"snack","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":19.4,"ch_g":7.0,"vet_g":17.3,"kcal":260},"ingredienten":[{"item":"mozzarella_light","gram":100},{"item":"tomaat","gram":150},{"item":"olijfolie","gram":5}],"instructies":"Rijg afwisselend mozzarella en tomaat op spies. Sprenkel olie.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":78,"naam":"Recovery: pasta met tonijn (Italiaans)","type":"post_workout","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":53.5,"ch_g":82.0,"vet_g":14.1,"kcal":672},"ingredienten":[{"item":"pasta_volkoren_droog","gram":100},{"item":"tonijn_blik_water","gram":150},{"item":"passata_tomatensaus","gram":200},{"item":"olijfolie","gram":10}],"instructies":"Kook pasta. Verwarm passata met tonijn. Combineer.","kooktijd_min":15,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":79,"naam":"Recovery: Griekse kip met rijst","type":"post_workout","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":51.5,"ch_g":82.0,"vet_g":8.2,"kcal":616},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"rijst_basmati_droog","gram":100},{"item":"griekse_yoghurt_0pct","gram":100},{"item":"olijfolie","gram":5}],"instructies":"Bak kip met oregano. Kook rijst. Top met yoghurt-saus.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":80,"naam":"Recovery shake met chocolade en banaan","type":"post_workout","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":42.6,"ch_g":72.8,"vet_g":11.0,"kcal":564},"ingredienten":[{"item":"halfvolle_melk","gram":400},{"item":"whey_concentraat","gram":30},{"item":"banaan","gram":1},{"item":"havermout","gram":40}],"instructies":"Mix in blender (cacao optioneel).","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":81,"naam":"Griekse yoghurt met chia en walnoten","type":"pre_bed","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":30.6,"ch_g":23.2,"vet_g":17.6,"kcal":358},"ingredienten":[{"item":"griekse_yoghurt_0pct","gram":250},{"item":"chiazaad","gram":15},{"item":"walnoten","gram":20},{"item":"honing","gram":5}],"instructies":"Combineer. Eet 1u voor slapen.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":82,"naam":"Ricotta met blauwe bessen","type":"pre_bed","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":25.7,"ch_g":20.5,"vet_g":33.7,"kcal":483},"ingredienten":[{"item":"ricotta","gram":200},{"item":"blauwe_bessen","gram":80},{"item":"amandelen","gram":15}],"instructies":"Combineer in bowl.","kooktijd_min":2,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":83,"naam":"Caseïne shake met amandelpasta","type":"pre_bed","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":37.4,"ch_g":18.5,"vet_g":13.5,"kcal":344},"ingredienten":[{"item":"halfvolle_melk","gram":300},{"item":"caseine","gram":30},{"item":"amandelpasta","gram":15}],"instructies":"Mix in blender.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":84,"naam":"Pre-workout: ciabatta met honing en banaan","type":"pre_workout","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":20.6,"ch_g":86.3,"vet_g":2.3,"kcal":446},"ingredienten":[{"item":"ciabatta","gram":80},{"item":"honing","gram":15},{"item":"banaan","gram":1},{"item":"magere_kwark","gram":100}],"instructies":"Smeer kwark op ciabatta. Top met banaan en honing.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":85,"naam":"Japanse ontbijtkom (rijst, ei, zalm)","type":"ontbijt","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":28.8,"ch_g":57.3,"vet_g":21.3,"kcal":536},"ingredienten":[{"item":"rijst_jasmine_droog","gram":70},{"item":"ei","gram":2},{"item":"zalm_vers","gram":80},{"item":"bok_choi","gram":100},{"item":"soyasaus","gram":5},{"item":"sesamolie","gram":5}],"instructies":"Kook rijst. Bak zalm. Roer-bak bok choi met sesam. Top met soft-boiled ei.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":86,"naam":"Tofu-roerei met rijst (Chinees ontbijt)","type":"ontbijt","keuken":"aziatisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":29.1,"ch_g":52.6,"vet_g":21.2,"kcal":517},"ingredienten":[{"item":"tofu_naturel","gram":150},{"item":"ei","gram":2},{"item":"rijst_jasmine_droog","gram":60},{"item":"lente_ui","gram":30},{"item":"soyasaus","gram":5},{"item":"sesamolie","gram":5}],"instructies":"Bak verkruimelde tofu + ei. Combineer met rijst en lente-ui. Sprenkel soja en sesam.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":87,"naam":"Koreaanse rijst-bowl met ei en kimchi-style","type":"ontbijt","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":34.1,"ch_g":68.8,"vet_g":16.0,"kcal":557},"ingredienten":[{"item":"rijst_jasmine_droog","gram":80},{"item":"ei","gram":2},{"item":"rundsgehakt_5pct","gram":100},{"item":"rode_kool","gram":80},{"item":"sesamolie","gram":5},{"item":"soyasaus","gram":5}],"instructies":"Kook rijst. Bak gehakt met soja. Bak ei sunny-side. Top met fijngesneden rode kool.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":88,"naam":"Aziatische scrambled met sojamelk en bao-style brood","type":"ontbijt","keuken":"aziatisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":16.4,"ch_g":27.6,"vet_g":15.2,"kcal":317},"ingredienten":[{"item":"ei","gram":3},{"item":"soyamelk_ongezoet","gram":50},{"item":"volkoren_brood","gram":60},{"item":"lente_ui","gram":20},{"item":"sesamolie","gram":5}],"instructies":"Klop eieren met sojamelk. Roer-bak met sesam en lente-ui. Eet met brood.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":89,"naam":"Sushi-bowl met zalm","type":"lunch","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":47.9,"ch_g":80.1,"vet_g":36.4,"kcal":826},"ingredienten":[{"item":"zalm_vers","gram":150},{"item":"rijst_basmati_droog","gram":80},{"item":"avocado","gram":80},{"item":"komkommer","gram":100},{"item":"edamame","gram":80},{"item":"soyasaus","gram":5}],"instructies":"Kook rijst. Snij zalm en avocado. Combineer met komkommer en edamame.","kooktijd_min":20,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":90,"naam":"Vietnamese pho met rundvlees","type":"lunch","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":47.0,"ch_g":80.7,"vet_g":10.2,"kcal":619},"ingredienten":[{"item":"rundsbiefstuk_mager","gram":150},{"item":"rijstnoedels_droog","gram":90},{"item":"ui","gram":50},{"item":"lente_ui","gram":30},{"item":"bok_choi","gram":100},{"item":"limoen","gram":1}],"instructies":"Maak bouillon met ui + kruiden. Kook noedels. Voeg rauw vlees + bok choi + lente-ui toe.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":91,"naam":"Aziatische kip-noedelsalade","type":"lunch","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":45.3,"ch_g":79.1,"vet_g":18.9,"kcal":679},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"rijstnoedels_droog","gram":80},{"item":"paprika","gram":100},{"item":"wortel","gram":80},{"item":"pinda's","gram":15},{"item":"sesamolie","gram":8},{"item":"soyasaus","gram":5}],"instructies":"Kook noedels. Bak kip. Maak salade met paprika, wortel, pinda's, soja en sesam.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":92,"naam":"Thaise kipsalade (laab gai-style)","type":"lunch","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":51.9,"ch_g":64.8,"vet_g":11.0,"kcal":562},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"rijst_jasmine_droog","gram":70},{"item":"limoen","gram":1},{"item":"lente_ui","gram":30},{"item":"rode_kool","gram":80},{"item":"pinda's","gram":15}],"instructies":"Bak kipgehakt met limoen + chili. Kook rijst. Combineer met groenten en pinda's.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":93,"naam":"Bento-style lunch met kip teriyaki","type":"lunch","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":45.2,"ch_g":90.2,"vet_g":3.7,"kcal":582},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"rijst_jasmine_droog","gram":90},{"item":"broccoli","gram":100},{"item":"wortel","gram":80},{"item":"soyasaus","gram":8},{"item":"honing","gram":10}],"instructies":"Bak kip in soja+honing-saus. Kook rijst. Stoom broccoli en wortel.","kooktijd_min":22,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":94,"naam":"Aziatische soep met udon en tonijn","type":"lunch","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":43.1,"ch_g":70.0,"vet_g":5.7,"kcal":499},"ingredienten":[{"item":"udonnoedels_droog","gram":80},{"item":"tonijn_blik_water","gram":100},{"item":"bok_choi","gram":100},{"item":"champignons","gram":100},{"item":"ei","gram":1},{"item":"miso_pasta","gram":15}],"instructies":"Maak miso-bouillon. Kook noedels. Voeg groenten + tonijn + zachtgekookt ei toe.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":95,"naam":"Korean-style beef bowl met ei","type":"lunch","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":43.3,"ch_g":82.9,"vet_g":16.2,"kcal":658},"ingredienten":[{"item":"rundsgehakt_5pct","gram":150},{"item":"rijst_jasmine_droog","gram":90},{"item":"ei","gram":1},{"item":"rode_kool","gram":80},{"item":"wortel","gram":80},{"item":"sesamolie","gram":5},{"item":"soyasaus","gram":8}],"instructies":"Bak gehakt met soja+sesam. Kook rijst. Top met sunny-side ei en groenten.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":96,"naam":"Spring rolls (filling) met kip en groenten","type":"lunch","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":44.8,"ch_g":67.5,"vet_g":10.6,"kcal":548},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"rijst_jasmine_droog","gram":70},{"item":"wortel","gram":100},{"item":"komkommer","gram":80},{"item":"pinda's","gram":15},{"item":"limoen","gram":1}],"instructies":"Bak kip in plakjes. Kook rijst. Combineer met groente-julienne en pinda's.","kooktijd_min":20,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":97,"naam":"Garnalen-fried-rice","type":"lunch","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":44.5,"ch_g":80.7,"vet_g":15.8,"kcal":643},"ingredienten":[{"item":"garnalen_gepeld","gram":150},{"item":"rijst_jasmine_droog","gram":90},{"item":"ei","gram":2},{"item":"paprika","gram":100},{"item":"erwten","gram":0},{"item":"lente_ui","gram":30},{"item":"sesamolie","gram":8},{"item":"soyasaus","gram":8}],"instructies":"Kook rijst (best dag eerder). Bak ei + garnalen. Voeg rijst + groenten + soja toe. Wokken.","kooktijd_min":18,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":98,"naam":"Stir-fry met kip en groenten","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":54.3,"ch_g":85.9,"vet_g":14.5,"kcal":698},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"rijst_jasmine_droog","gram":90},{"item":"paprika","gram":100},{"item":"broccoli","gram":150},{"item":"knoflook","gram":5},{"item":"sesamolie","gram":10},{"item":"soyasaus","gram":10}],"instructies":"Kook rijst. Wokken kip + groenten + knoflook. Voeg soja en sesam toe.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":99,"naam":"Pad Thai met kip","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":51.4,"ch_g":89.0,"vet_g":25.9,"kcal":806},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"rijstnoedels_droog","gram":100},{"item":"ei","gram":2},{"item":"paprika","gram":100},{"item":"pinda's","gram":15},{"item":"limoen","gram":1},{"item":"sesamolie","gram":10}],"instructies":"Kook noedels. Bak kip + ei. Voeg groenten + pinda's + tamarind/soja toe. Combineer.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":100,"naam":"Aziatische beef bowl","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":59.6,"ch_g":87.9,"vet_g":20.5,"kcal":789},"ingredienten":[{"item":"rundsbiefstuk_mager","gram":180},{"item":"rijst_basmati_droog","gram":90},{"item":"broccoli","gram":150},{"item":"wortel","gram":100},{"item":"sesamolie","gram":8},{"item":"knoflook","gram":5},{"item":"soyasaus","gram":10}],"instructies":"Kook rijst. Bak biefstuk in plakjes met knoflook. Wokken groenten. Combineer.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":101,"naam":"Thaise rode curry met kip","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":54.7,"ch_g":86.5,"vet_g":58.1,"kcal":1074},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"rijst_jasmine_droog","gram":90},{"item":"kokosmelk_blik","gram":200},{"item":"paprika","gram":100},{"item":"rode_currypasta","gram":25},{"item":"bok_choi","gram":100},{"item":"kokosolie","gram":10}],"instructies":"Kook rijst. Bak currypasta in olie. Voeg kokosmelk + kip + groenten toe. Sudder 15 min.","kooktijd_min":25,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":102,"naam":"Thaise groene curry met garnalen","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":52.8,"ch_g":92.2,"vet_g":57.1,"kcal":1075},"ingredienten":[{"item":"garnalen_gepeld","gram":200},{"item":"rijst_jasmine_droog","gram":90},{"item":"kokosmelk_blik","gram":200},{"item":"paprika","gram":100},{"item":"groene_currypasta","gram":25},{"item":"aubergine","gram":100},{"item":"kokosolie","gram":10}],"instructies":"Kook rijst. Bak currypasta. Voeg kokosmelk + groenten + garnalen toe. 10 min.","kooktijd_min":22,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":103,"naam":"Japanse ramen-bowl met kip","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":61.2,"ch_g":78.9,"vet_g":15.8,"kcal":700},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"udonnoedels_droog","gram":90},{"item":"ei","gram":1},{"item":"bok_choi","gram":100},{"item":"champignons","gram":100},{"item":"miso_pasta","gram":20},{"item":"sesamolie","gram":8}],"instructies":"Maak miso-bouillon. Bak kip. Kook noedels. Combineer met groenten + zacht ei.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":104,"naam":"Koreaanse bibimbap-style bowl","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":46.1,"ch_g":84.7,"vet_g":21.7,"kcal":736},"ingredienten":[{"item":"rundsgehakt_5pct","gram":150},{"item":"rijst_jasmine_droog","gram":90},{"item":"ei","gram":1},{"item":"spinazie","gram":100},{"item":"wortel","gram":100},{"item":"paprika","gram":80},{"item":"sesamolie","gram":10},{"item":"soyasaus","gram":8}],"instructies":"Bak gehakt met soja. Stoom groenten apart. Top alles met sunny-side ei en sesam.","kooktijd_min":30,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":105,"naam":"Vietnamese kip-bowl met rijstnoedels","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":52.3,"ch_g":85.5,"vet_g":16.3,"kcal":712},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"rijstnoedels_droog","gram":90},{"item":"limoen","gram":1},{"item":"wortel","gram":100},{"item":"komkommer","gram":100},{"item":"pinda's","gram":15},{"item":"sesamolie","gram":5}],"instructies":"Bak kip met limoen + soja. Kook noedels. Combineer met rauwe groenten en pinda's.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":106,"naam":"Aziatische zalm met soja-glaze en rijst","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":45.4,"ch_g":81.9,"vet_g":29.6,"kcal":775},"ingredienten":[{"item":"zalm_vers","gram":180},{"item":"rijst_jasmine_droog","gram":90},{"item":"bok_choi","gram":150},{"item":"soyasaus","gram":10},{"item":"honing","gram":10},{"item":"sesamolie","gram":5}],"instructies":"Bak zalm in soja+honing. Kook rijst. Stoom bok choi.","kooktijd_min":20,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":107,"naam":"Wok met varkenshaas en udon","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":53.9,"ch_g":80.5,"vet_g":16.7,"kcal":691},"ingredienten":[{"item":"varkenshaas","gram":180},{"item":"udonnoedels_droog","gram":90},{"item":"paprika","gram":100},{"item":"champignons","gram":100},{"item":"knoflook","gram":5},{"item":"oestersaus","gram":10},{"item":"sesamolie","gram":8}],"instructies":"Kook noedels. Wokken varkenshaas + groenten + knoflook. Voeg oestersaus toe.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":108,"naam":"Tonijnsteak met zoete aardappel en bok choi","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":52.3,"ch_g":65.4,"vet_g":15.0,"kcal":615},"ingredienten":[{"item":"tonijn_vers","gram":180},{"item":"zoete_aardappel","gram":300},{"item":"bok_choi","gram":200},{"item":"sesamzaad","gram":5},{"item":"sesamolie","gram":10},{"item":"soyasaus","gram":5}],"instructies":"Bak zoete aardappelpartjes 25 min. Bak tonijn kort kort. Stoom bok choi met sesam.","kooktijd_min":35,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":109,"naam":"Kip met cashewnoten en rijst (Chinees)","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":54.3,"ch_g":85.9,"vet_g":24.9,"kcal":785},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"rijst_jasmine_droog","gram":90},{"item":"paprika","gram":100},{"item":"cashewnoten","gram":25},{"item":"sesamolie","gram":10},{"item":"soyasaus","gram":10},{"item":"knoflook","gram":5}],"instructies":"Kook rijst. Wokken kip + paprika + cashews + knoflook. Voeg soja toe.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":110,"naam":"Edamame met zout","type":"snack","keuken":"aziatisch","eiwit_niveau":"veganistisch","macros":{"eiwit_g":24.0,"ch_g":18.0,"vet_g":10.0,"kcal":250},"ingredienten":[{"item":"edamame","gram":200}],"instructies":"Stoom edamame 5 min, breng op smaak met zeezout.","kooktijd_min":7,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":111,"naam":"Tonijn-rijstwafels met avocado","type":"snack","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":23.9,"ch_g":29.5,"vet_g":10.7,"kcal":303},"ingredienten":[{"item":"rijstwafels","gram":30},{"item":"tonijn_blik_water","gram":80},{"item":"avocado","gram":50},{"item":"sesamzaad","gram":3}],"instructies":"Meng tonijn met avocado. Smeer op rijstwafels. Sprinkel sesam.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":112,"naam":"Aziatische eiwit-shake met sesampasta","type":"snack","keuken":"aziatisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":36.1,"ch_g":46.0,"vet_g":12.3,"kcal":430},"ingredienten":[{"item":"halfvolle_melk","gram":300},{"item":"whey_concentraat","gram":30},{"item":"banaan","gram":1},{"item":"amandelpasta","gram":10}],"instructies":"Mix in blender.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":113,"naam":"Rijstwafel met kipfilet en sesam","type":"snack","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":21.8,"ch_g":26.8,"vet_g":3.7,"kcal":228},"ingredienten":[{"item":"rijstwafels","gram":30},{"item":"kipfilet","gram":80},{"item":"sesamzaad","gram":3},{"item":"komkommer","gram":60}],"instructies":"Beleg rijstwafels met kip, komkommer en sesam.","kooktijd_min":4,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":114,"naam":"Recovery: kip-rijst-bowl Aziatische stijl","type":"post_workout","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":43.1,"ch_g":84.4,"vet_g":8.6,"kcal":594},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"rijst_jasmine_droog","gram":100},{"item":"paprika","gram":100},{"item":"soyasaus","gram":8},{"item":"sesamolie","gram":5}],"instructies":"Kook rijst. Bak kip in soja. Top met paprika.","kooktijd_min":20,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":115,"naam":"Recovery: zalm met udon","type":"post_workout","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":41.4,"ch_g":70.4,"vet_g":25.6,"kcal":678},"ingredienten":[{"item":"zalm_vers","gram":150},{"item":"udonnoedels_droog","gram":90},{"item":"bok_choi","gram":100},{"item":"sesamolie","gram":5}],"instructies":"Kook udon. Bak zalm. Stoom bok choi.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":116,"naam":"Recovery: vegetarische ramen met ei","type":"post_workout","keuken":"aziatisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":32.9,"ch_g":85.7,"vet_g":14.4,"kcal":598},"ingredienten":[{"item":"udonnoedels_droog","gram":100},{"item":"ei","gram":2},{"item":"bok_choi","gram":100},{"item":"miso_pasta","gram":20},{"item":"tofu_naturel","gram":100}],"instructies":"Maak miso-bouillon. Kook noedels. Voeg ei en tofu toe.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":117,"naam":"Aziatische kwark-bowl met sesam","type":"pre_bed","keuken":"aziatisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":34.5,"ch_g":22.4,"vet_g":11.8,"kcal":332},"ingredienten":[{"item":"magere_kwark","gram":250},{"item":"sesamzaad","gram":5},{"item":"amandelpasta","gram":15},{"item":"blauwe_bessen","gram":60}],"instructies":"Combineer.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":118,"naam":"Caseïne-shake met sesam en banaan","type":"pre_bed","keuken":"aziatisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":35.8,"ch_g":30.5,"vet_g":7.8,"kcal":338},"ingredienten":[{"item":"halfvolle_melk","gram":300},{"item":"caseine","gram":30},{"item":"banaan","gram":0.5},{"item":"sesamzaad","gram":5}],"instructies":"Mix in blender.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":119,"naam":"Pre-workout: rijst met honing en sesam","type":"pre_workout","keuken":"aziatisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":17.8,"ch_g":72.0,"vet_g":3.5,"kcal":390},"ingredienten":[{"item":"rijst_jasmine_droog","gram":70},{"item":"honing","gram":15},{"item":"sesamzaad","gram":5},{"item":"magere_kwark","gram":100}],"instructies":"Kook rijst. Top met honing en sesam. Eet met kwark.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":"CH-rijk, snel verteerbaar"},{"id":120,"naam":"Mexicaanse roerei met bonen","type":"ontbijt","keuken":"mexicaans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":25.4,"ch_g":69.2,"vet_g":23.2,"kcal":560},"ingredienten":[{"item":"ei","gram":3},{"item":"zwarte_bonen_gekookt","gram":100},{"item":"paprika","gram":100},{"item":"ui","gram":50},{"item":"tortillawrap_mais","gram":60},{"item":"avocado","gram":50},{"item":"olijfolie","gram":5}],"instructies":"Bak ui + paprika. Voeg eieren + bonen toe. Scramble. Eet met tortilla en avocado.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":121,"naam":"Huevos rancheros style","type":"ontbijt","keuken":"mexicaans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":27.0,"ch_g":60.9,"vet_g":22.4,"kcal":527},"ingredienten":[{"item":"ei","gram":3},{"item":"tortillawrap_mais","gram":60},{"item":"zwarte_bonen_gekookt","gram":100},{"item":"salsa_verde","gram":30},{"item":"avocado","gram":50},{"item":"feta","gram":20}],"instructies":"Toast tortilla. Top met bonen, gepocheerd ei, salsa, avocado en feta.","kooktijd_min":10,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":122,"naam":"Burrito-style ontbijtwrap","type":"ontbijt","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":41.9,"ch_g":55.0,"vet_g":20.2,"kcal":560},"ingredienten":[{"item":"wrap_volkoren","gram":60},{"item":"ei","gram":3},{"item":"kalkoenfilet","gram":60},{"item":"paprika","gram":80},{"item":"zwarte_bonen_gekookt","gram":80},{"item":"harde_kaas","gram":25}],"instructies":"Bak ei met kalkoen + paprika + bonen. Vul wrap. Top met kaas.","kooktijd_min":10,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":123,"naam":"Mexicaanse yoghurt-bowl met granola en mango","type":"ontbijt","keuken":"mexicaans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":32.9,"ch_g":54.5,"vet_g":10.0,"kcal":428},"ingredienten":[{"item":"griekse_yoghurt_0pct","gram":250},{"item":"havermout","gram":30},{"item":"mango","gram":100},{"item":"amandelen","gram":15},{"item":"honing","gram":10}],"instructies":"Yoghurt in bowl. Top met havermout, mango, amandelen en honing.","kooktijd_min":4,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":124,"naam":"Burrito-bowl met kip en zwarte bonen","type":"lunch","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":51.7,"ch_g":99.3,"vet_g":13.2,"kcal":710},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"rijst_basmati_droog","gram":80},{"item":"zwarte_bonen_gekookt","gram":100},{"item":"paprika","gram":100},{"item":"avocado","gram":60},{"item":"salsa_verde","gram":30}],"instructies":"Kook rijst. Bak kip. Combineer met bonen, paprika, salsa en avocado.","kooktijd_min":25,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":125,"naam":"Quesadilla met kip en groenten","type":"lunch","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":51.7,"ch_g":41.9,"vet_g":18.2,"kcal":539},"ingredienten":[{"item":"wrap_volkoren","gram":60},{"item":"kipfilet","gram":150},{"item":"paprika","gram":100},{"item":"ui","gram":50},{"item":"harde_kaas","gram":40},{"item":"salsa_verde","gram":20}],"instructies":"Bak kip + ui + paprika. Vul wrap met kaas en kip-mengsel. Bak in pan tot goudbruin.","kooktijd_min":15,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":126,"naam":"Taco-bowl met rundsgehakt","type":"lunch","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":49.2,"ch_g":97.8,"vet_g":18.3,"kcal":742},"ingredienten":[{"item":"rundsgehakt_5pct","gram":150},{"item":"rijst_basmati_droog","gram":80},{"item":"zwarte_bonen_gekookt","gram":100},{"item":"tomaat","gram":100},{"item":"avocado","gram":60},{"item":"sla","gram":50},{"item":"salsa_verde","gram":20}],"instructies":"Bak gehakt met taco-kruiden. Kook rijst. Combineer met bonen, tomaat, avocado, sla en salsa.","kooktijd_min":22,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":127,"naam":"Mexicaanse soep met kip en tortilla-chips","type":"lunch","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":55.2,"ch_g":69.0,"vet_g":22.5,"kcal":682},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"rode_kidneybonen","gram":150},{"item":"passata_tomatensaus","gram":200},{"item":"tortillawrap_mais","gram":30},{"item":"avocado","gram":50},{"item":"olijfolie","gram":10},{"item":"paprika","gram":80}],"instructies":"Bak kip in stukjes. Voeg passata + bonen + paprika + water toe. Kook 20 min. Top met avocado.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":128,"naam":"Wraps met chorizo, kip en bonen","type":"lunch","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":44.6,"ch_g":59.1,"vet_g":25.2,"kcal":628},"ingredienten":[{"item":"wrap_volkoren","gram":60},{"item":"kipfilet","gram":100},{"item":"chorizo","gram":30},{"item":"zwarte_bonen_gekookt","gram":80},{"item":"paprika","gram":80},{"item":"avocado","gram":50}],"instructies":"Bak kip + chorizo. Vul wrap met bonen, paprika, avocado en kip.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":129,"naam":"Vissalade met limoen en avocado (Mexicaans)","type":"lunch","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":40.4,"ch_g":74.5,"vet_g":24.8,"kcal":666},"ingredienten":[{"item":"kabeljauw","gram":180},{"item":"rijst_basmati_droog","gram":80},{"item":"avocado","gram":80},{"item":"limoen","gram":1},{"item":"paprika","gram":80},{"item":"olijfolie","gram":10}],"instructies":"Bak vis. Kook rijst. Combineer met avocado, paprika, limoen en olie.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":130,"naam":"Pollo asado met salsa en aardappel","type":"lunch","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":48.8,"ch_g":58.6,"vet_g":13.6,"kcal":567},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"aardappel","gram":300},{"item":"paprika","gram":100},{"item":"salsa_verde","gram":30},{"item":"olijfolie","gram":10},{"item":"limoen","gram":1}],"instructies":"Marineer kip in limoen + kruiden. Bak. Maak aardappelpartjes. Serveer met salsa.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":131,"naam":"Argentijnse rundvlees-empanada-style filling met salade","type":"lunch","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":48.4,"ch_g":57.0,"vet_g":22.2,"kcal":638},"ingredienten":[{"item":"rundsgehakt_5pct","gram":180},{"item":"aardappel","gram":250},{"item":"paprika","gram":100},{"item":"ui","gram":80},{"item":"ei","gram":1},{"item":"olijfolie","gram":10},{"item":"sla","gram":50}],"instructies":"Bak gehakt + ui + paprika. Kook ei en aardappel. Combineer met salade.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":132,"naam":"Fajitas met biefstuk en groenten","type":"diner","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":57.8,"ch_g":62.6,"vet_g":36.1,"kcal":798},"ingredienten":[{"item":"rundsbiefstuk_mager","gram":180},{"item":"wrap_volkoren","gram":80},{"item":"paprika","gram":150},{"item":"ui","gram":80},{"item":"avocado","gram":60},{"item":"olijfolie","gram":10},{"item":"salsa_verde","gram":20}],"instructies":"Bak biefstuk in plakjes met fajita-kruiden. Bak ui + paprika. Vul wraps met alles + avocado + salsa.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":133,"naam":"Enchiladas met kip","type":"diner","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":76.1,"ch_g":86.3,"vet_g":37.5,"kcal":978},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"wrap_volkoren","gram":100},{"item":"passata_tomatensaus","gram":200},{"item":"zwarte_bonen_gekookt","gram":80},{"item":"harde_kaas","gram":60},{"item":"ui","gram":50},{"item":"olijfolie","gram":10}],"instructies":"Bak kip + ui. Wikkel kip + bonen in tortillas. Top met passata + kaas. 20 min oven.","kooktijd_min":35,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":134,"naam":"Mexican beef bowl met rijst en bonen","type":"diner","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":56.2,"ch_g":109.6,"vet_g":30.1,"kcal":928},"ingredienten":[{"item":"rundsgehakt_5pct","gram":180},{"item":"rijst_basmati_droog","gram":90},{"item":"rode_kidneybonen","gram":100},{"item":"paprika","gram":100},{"item":"ui","gram":50},{"item":"avocado","gram":60},{"item":"salsa_verde","gram":30},{"item":"olijfolie","gram":10}],"instructies":"Bak gehakt met cumin + paprika. Kook rijst. Combineer met bonen, avocado en salsa.","kooktijd_min":25,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":135,"naam":"Argentijnse biefstuk met chimichurri en aardappel","type":"diner","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":60.6,"ch_g":63.0,"vet_g":27.7,"kcal":765},"ingredienten":[{"item":"rundsbiefstuk_mager","gram":200},{"item":"aardappel","gram":350},{"item":"rucola","gram":50},{"item":"knoflook","gram":5},{"item":"olijfolie","gram":15}],"instructies":"Maak chimichurri (peterselie + knoflook + olie). Grill biefstuk. Bak aardappelpartjes.","kooktijd_min":30,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":136,"naam":"Pollo en mole-style met rijst","type":"diner","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":54.7,"ch_g":88.1,"vet_g":24.1,"kcal":784},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"rijst_basmati_droog","gram":90},{"item":"passata_tomatensaus","gram":150},{"item":"ui","gram":50},{"item":"amandelen","gram":20},{"item":"kokosolie","gram":10}],"instructies":"Maak saus met passata + amandelen + cacao. Bak kip, voeg saus toe. Sudder. Serveer met rijst.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":137,"naam":"Mexicaanse chili con carne","type":"diner","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":75.2,"ch_g":151.4,"vet_g":22.4,"kcal":1098},"ingredienten":[{"item":"rundsgehakt_5pct","gram":180},{"item":"rode_kidneybonen","gram":200},{"item":"zwarte_bonen_gekookt","gram":100},{"item":"passata_tomatensaus","gram":250},{"item":"paprika","gram":100},{"item":"rijst_basmati_droog","gram":80},{"item":"olijfolie","gram":10}],"instructies":"Bak gehakt + paprika. Voeg passata + bonen + chili-kruiden toe. 20 min sudderen. Eet met rijst.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":138,"naam":"Brazilian chicken stew met rijst","type":"diner","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":52.2,"ch_g":85.2,"vet_g":45.4,"kcal":953},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"rijst_basmati_droog","gram":90},{"item":"kokosmelk_blik","gram":150},{"item":"paprika","gram":100},{"item":"ui","gram":50},{"item":"kokosolie","gram":10}],"instructies":"Bak kip + ui + paprika. Voeg kokosmelk toe. Sudder 15 min. Serveer met rijst.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":139,"naam":"Tacos met gegrilde garnalen","type":"diner","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":50.1,"ch_g":60.1,"vet_g":27.7,"kcal":662},"ingredienten":[{"item":"garnalen_gepeld","gram":200},{"item":"tortillawrap_mais","gram":80},{"item":"avocado","gram":80},{"item":"limoen","gram":1},{"item":"paprika","gram":100},{"item":"rode_kool","gram":80},{"item":"olijfolie","gram":10}],"instructies":"Bak garnalen met limoen. Vul tortillas met garnalen, avocado, rode kool en paprika.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":140,"naam":"Mexicaans gevulde aubergine","type":"diner","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":62.6,"ch_g":103.1,"vet_g":33.7,"kcal":955},"ingredienten":[{"item":"aubergine","gram":250},{"item":"rundsgehakt_5pct","gram":150},{"item":"zwarte_bonen_gekookt","gram":100},{"item":"passata_tomatensaus","gram":150},{"item":"harde_kaas","gram":50},{"item":"olijfolie","gram":10},{"item":"rijst_basmati_droog","gram":70}],"instructies":"Hol aubergine uit. Vul met gehakt + passata + bonen. Top kaas. 25 min oven. Serveer met rijst.","kooktijd_min":50,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":141,"naam":"Mexicaanse zalm met avocado-salsa","type":"diner","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":45.8,"ch_g":87.5,"vet_g":46.8,"kcal":943},"ingredienten":[{"item":"zalm_vers","gram":180},{"item":"rijst_basmati_droog","gram":90},{"item":"avocado","gram":80},{"item":"limoen","gram":1},{"item":"paprika","gram":100},{"item":"olijfolie","gram":10},{"item":"tomaat","gram":100}],"instructies":"Bak zalm. Kook rijst. Maak avocado-salsa met limoen, tomaat. Combineer.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":142,"naam":"Quesadilla met varkenshaas en avocado","type":"diner","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":59.0,"ch_g":51.8,"vet_g":43.3,"kcal":826},"ingredienten":[{"item":"varkenshaas","gram":180},{"item":"wrap_volkoren","gram":80},{"item":"avocado","gram":60},{"item":"paprika","gram":100},{"item":"harde_kaas","gram":40},{"item":"olijfolie","gram":10}],"instructies":"Bak varkenshaas in plakjes. Vul wraps met kaas, vlees, paprika, avocado. Bak in pan.","kooktijd_min":20,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":143,"naam":"Avocado-toast met limoen","type":"snack","keuken":"mexicaans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":10.0,"ch_g":32.8,"vet_g":16.3,"kcal":307},"ingredienten":[{"item":"volkoren_brood","gram":60},{"item":"avocado","gram":80},{"item":"limoen","gram":1},{"item":"ei","gram":1}],"instructies":"Toast brood. Pers avocado erop met limoen. Top met gepocheerd ei.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":144,"naam":"Mexicaanse hummus-style met bonen","type":"snack","keuken":"mexicaans","eiwit_niveau":"veganistisch","macros":{"eiwit_g":17.5,"ch_g":60.5,"vet_g":12.6,"kcal":409},"ingredienten":[{"item":"zwarte_bonen_gekookt","gram":150},{"item":"olijfolie","gram":10},{"item":"limoen","gram":1},{"item":"paprika","gram":80},{"item":"tortillawrap_mais","gram":40}],"instructies":"Pureer bonen + olie + limoen. Eet met paprika-stokjes en tortilla.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":145,"naam":"Mango-limoen smoothie met whey","type":"snack","keuken":"mexicaans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":33.5,"ch_g":31.6,"vet_g":6.7,"kcal":315},"ingredienten":[{"item":"halfvolle_melk","gram":300},{"item":"whey_concentraat","gram":30},{"item":"mango","gram":100},{"item":"limoen","gram":1}],"instructies":"Mix in blender.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":146,"naam":"Recovery: burrito-bowl met kip","type":"post_workout","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":52.5,"ch_g":112.5,"vet_g":11.6,"kcal":755},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"rijst_basmati_droog","gram":100},{"item":"zwarte_bonen_gekookt","gram":100},{"item":"paprika","gram":100},{"item":"avocado","gram":50}],"instructies":"Kook rijst. Bak kip. Combineer.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":147,"naam":"Recovery: chili met rijst","type":"post_workout","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":53.6,"ch_g":107.4,"vet_g":9.7,"kcal":730},"ingredienten":[{"item":"rundsgehakt_5pct","gram":150},{"item":"rode_kidneybonen","gram":150},{"item":"rijst_basmati_droog","gram":80},{"item":"passata_tomatensaus","gram":200}],"instructies":"Bak gehakt + passata + bonen. Kook rijst.","kooktijd_min":25,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":148,"naam":"Recovery shake met mango","type":"post_workout","keuken":"mexicaans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":42.1,"ch_g":60.2,"vet_g":11.0,"kcal":510},"ingredienten":[{"item":"halfvolle_melk","gram":400},{"item":"whey_concentraat","gram":30},{"item":"mango","gram":100},{"item":"havermout","gram":40}],"instructies":"Mix in blender.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":149,"naam":"Yoghurt met mango en amandelen","type":"pre_bed","keuken":"mexicaans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":28.8,"ch_g":25.3,"vet_g":7.8,"kcal":275},"ingredienten":[{"item":"griekse_yoghurt_0pct","gram":250},{"item":"mango","gram":80},{"item":"amandelen","gram":15}],"instructies":"Combineer.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":150,"naam":"Caseïne shake met cacao en limoen","type":"pre_bed","keuken":"mexicaans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":34.2,"ch_g":15.7,"vet_g":5.1,"kcal":252},"ingredienten":[{"item":"halfvolle_melk","gram":300},{"item":"caseine","gram":30},{"item":"limoen","gram":0.5}],"instructies":"Mix in blender (snufje cacao optioneel).","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":151,"naam":"Pre-workout: rijst met honing en banaan","type":"pre_workout","keuken":"mexicaans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":18.3,"ch_g":98.5,"vet_g":1.4,"kcal":475},"ingredienten":[{"item":"rijst_basmati_droog","gram":70},{"item":"banaan","gram":1},{"item":"honing","gram":15},{"item":"magere_kwark","gram":100}],"instructies":"Kook rijst. Combineer met banaan, honing en kwark.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":152,"naam":"Indiase scrambled met kruiden (akoori-style)","type":"ontbijt","keuken":"indisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":15.9,"ch_g":39.2,"vet_g":15.8,"kcal":358},"ingredienten":[{"item":"ei","gram":3},{"item":"tomaat","gram":100},{"item":"ui","gram":50},{"item":"naan_brood","gram":60},{"item":"ghee","gram":5}],"instructies":"Bak ui + tomaat in ghee met curry-kruiden. Klop eieren erbij. Scramble. Eet met naan.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":153,"naam":"Yoghurt met mango en amandelen (lassi-bowl)","type":"ontbijt","keuken":"indisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":32.9,"ch_g":54.5,"vet_g":10.0,"kcal":428},"ingredienten":[{"item":"griekse_yoghurt_0pct","gram":250},{"item":"mango","gram":100},{"item":"amandelen","gram":15},{"item":"honing","gram":10},{"item":"havermout","gram":30}],"instructies":"Yoghurt in bowl. Top met havermout, mango, amandelen en honing.","kooktijd_min":4,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":154,"naam":"Indiaas roti-ontbijt met kip","type":"ontbijt","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":34.5,"ch_g":45.9,"vet_g":11.7,"kcal":431},"ingredienten":[{"item":"naan_brood","gram":80},{"item":"kipfilet","gram":100},{"item":"yoghurt_natuur","gram":80},{"item":"ui","gram":30},{"item":"olijfolie","gram":5}],"instructies":"Bak kip met curry-kruiden. Eet met warme naan en yoghurt.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":155,"naam":"Havermout-pap met kardemom en amandelen","type":"ontbijt","keuken":"indisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":21.2,"ch_g":77.1,"vet_g":16.2,"kcal":539},"ingredienten":[{"item":"havermout","gram":70},{"item":"halfvolle_melk","gram":250},{"item":"amandelen","gram":15},{"item":"honing","gram":10},{"item":"rozijnen","gram":15}],"instructies":"Kook havermout met melk + kardemom. Top met amandelen, honing en rozijnen.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":156,"naam":"Tikka masala-bowl met kip","type":"lunch","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":53.5,"ch_g":83.6,"vet_g":15.0,"kcal":690},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"rijst_basmati_droog","gram":90},{"item":"yoghurt_natuur","gram":80},{"item":"tomatenpuree","gram":30},{"item":"ui","gram":50},{"item":"ghee","gram":10}],"instructies":"Marineer kip in yoghurt + kruiden. Bak. Maak saus met passata + tomatenpuree. Sudder. Eet met rijst.","kooktijd_min":35,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":157,"naam":"Indiase kip-curry met rijst","type":"lunch","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":54.6,"ch_g":81.9,"vet_g":45.6,"kcal":956},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"rijst_basmati_droog","gram":90},{"item":"kokosmelk_blik","gram":150},{"item":"ui","gram":50},{"item":"knoflook","gram":5},{"item":"ghee","gram":10},{"item":"spinazie","gram":100}],"instructies":"Bak kip + ui + knoflook met curry-kruiden. Voeg kokosmelk + spinazie toe. Sudder 15 min.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":158,"naam":"Lamskebab met rijst en yoghurt","type":"lunch","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":60.0,"ch_g":95.5,"vet_g":18.4,"kcal":793},"ingredienten":[{"item":"lamsvlees_mager","gram":180},{"item":"rijst_basmati_droog","gram":90},{"item":"yoghurt_natuur","gram":100},{"item":"ui","gram":50},{"item":"komkommer","gram":60},{"item":"naan_brood","gram":30}],"instructies":"Bak lamsvlees met kruiden. Kook rijst. Maak raita van yoghurt + komkommer.","kooktijd_min":30,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":159,"naam":"Tandoori kip met rijst en groenten","type":"lunch","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":52.6,"ch_g":76.1,"vet_g":10.1,"kcal":613},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"rijst_basmati_droog","gram":80},{"item":"yoghurt_natuur","gram":80},{"item":"paprika","gram":100},{"item":"ui","gram":50},{"item":"ghee","gram":5}],"instructies":"Marineer kip in yoghurt + tandoori-kruiden. Bak. Kook rijst. Stoom paprika + ui.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":160,"naam":"Indiase kip-spinazie (saag chicken)","type":"lunch","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":58.6,"ch_g":81.6,"vet_g":15.7,"kcal":720},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"rijst_basmati_droog","gram":90},{"item":"spinazie","gram":200},{"item":"yoghurt_natuur","gram":80},{"item":"ui","gram":50},{"item":"knoflook","gram":5},{"item":"ghee","gram":10}],"instructies":"Bak kip + ui. Voeg spinazie + yoghurt toe. Sudder. Eet met rijst.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":161,"naam":"Garnalen-curry met rijst","type":"lunch","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":51.2,"ch_g":88.9,"vet_g":44.8,"kcal":952},"ingredienten":[{"item":"garnalen_gepeld","gram":200},{"item":"rijst_basmati_droog","gram":90},{"item":"kokosmelk_blik","gram":150},{"item":"paprika","gram":100},{"item":"ui","gram":50},{"item":"knoflook","gram":5},{"item":"ghee","gram":10}],"instructies":"Kook rijst. Bak ui + knoflook + paprika. Voeg kokosmelk + curry-kruiden toe. Voeg garnalen toe laatste 5 min.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":162,"naam":"Yoghurt-bowl met kalkoen-keftedes (Indiaas)","type":"lunch","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":53.5,"ch_g":83.8,"vet_g":11.6,"kcal":660},"ingredienten":[{"item":"kalkoenfilet","gram":180},{"item":"rijst_basmati_droog","gram":80},{"item":"yoghurt_natuur","gram":100},{"item":"komkommer","gram":80},{"item":"naan_brood","gram":30},{"item":"ghee","gram":5}],"instructies":"Vorm balletjes van kalkoen met indiase kruiden, bak. Maak raita. Eet met rijst.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":163,"naam":"Butter chicken met basmatirijst","type":"diner","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":58.7,"ch_g":91.9,"vet_g":31.0,"kcal":887},"ingredienten":[{"item":"kipfilet","gram":200},{"item":"rijst_basmati_droog","gram":90},{"item":"kokosroom","gram":50},{"item":"tomatenpuree","gram":50},{"item":"ui","gram":80},{"item":"ghee","gram":15},{"item":"yoghurt_natuur","gram":50}],"instructies":"Marineer kip. Bak ui + ghee. Voeg tomatenpuree + kokosroom + kruiden toe. Voeg kip toe. Sudder. Eet met rijst.","kooktijd_min":40,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":164,"naam":"Lamb biryani-style","type":"diner","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":60.5,"ch_g":103.5,"vet_g":39.3,"kcal":1004},"ingredienten":[{"item":"lamsvlees_mager","gram":180},{"item":"rijst_basmati_droog","gram":100},{"item":"ui","gram":80},{"item":"yoghurt_natuur","gram":80},{"item":"ghee","gram":15},{"item":"amandelen","gram":15},{"item":"rozijnen","gram":15}],"instructies":"Bak lamsvlees met biryani-kruiden. Kook rijst gedeeltelijk. Combineer in ovenschotel met ui + yoghurt + amandelen + rozijnen. 25 min oven.","kooktijd_min":60,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":165,"naam":"Indiase tikka met aardappel en spinazie (saag aloo)","type":"diner","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":58.0,"ch_g":60.7,"vet_g":15.1,"kcal":638},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"aardappel","gram":300},{"item":"spinazie","gram":200},{"item":"ui","gram":50},{"item":"ghee","gram":10},{"item":"yoghurt_natuur","gram":80}],"instructies":"Bak kip met tikka-kruiden. Kook aardappel met spinazie en ui. Eet met yoghurt-saus.","kooktijd_min":35,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":166,"naam":"Madras kip-curry met rijst","type":"diner","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":57.2,"ch_g":87.9,"vet_g":50.8,"kcal":1032},"ingredienten":[{"item":"kipfilet","gram":200},{"item":"rijst_basmati_droog","gram":90},{"item":"kokosmelk_blik","gram":150},{"item":"paprika","gram":100},{"item":"ui","gram":80},{"item":"ghee","gram":15}],"instructies":"Bak kip + ui met madras-kruiden. Voeg kokosmelk toe. Sudder 20 min. Serveer met rijst.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":167,"naam":"Korma met kip en cashews","type":"diner","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":58.8,"ch_g":89.4,"vet_g":44.8,"kcal":998},"ingredienten":[{"item":"kipfilet","gram":200},{"item":"rijst_basmati_droog","gram":90},{"item":"kokosroom","gram":100},{"item":"ui","gram":80},{"item":"cashewnoten","gram":20},{"item":"ghee","gram":10}],"instructies":"Bak kip + ui. Pureer cashews met kokosroom. Voeg toe + kruiden. Sudder. Eet met rijst.","kooktijd_min":30,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":168,"naam":"Vindaloo-style varkenshaas met rijst","type":"diner","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":58.0,"ch_g":90.1,"vet_g":19.9,"kcal":787},"ingredienten":[{"item":"varkenshaas","gram":200},{"item":"rijst_basmati_droog","gram":90},{"item":"tomatenpuree","gram":50},{"item":"ui","gram":80},{"item":"knoflook","gram":5},{"item":"ghee","gram":10},{"item":"spinazie","gram":150}],"instructies":"Bak varkenshaas + ui + knoflook met vindaloo-kruiden. Voeg tomatenpuree + spinazie toe. Eet met rijst.","kooktijd_min":30,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":169,"naam":"Indiase visscurry met rijst","type":"diner","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":46.8,"ch_g":83.2,"vet_g":44.6,"kcal":905},"ingredienten":[{"item":"kabeljauw","gram":200},{"item":"rijst_basmati_droog","gram":90},{"item":"kokosmelk_blik","gram":150},{"item":"ui","gram":50},{"item":"tomaat","gram":100},{"item":"ghee","gram":10}],"instructies":"Bak ui + tomaat met curry-kruiden. Voeg kokosmelk toe. Pocheer vis 8 min. Serveer met rijst.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":170,"naam":"Indiase kalkoen-keftedes met yoghurt-saus","type":"diner","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":57.5,"ch_g":53.0,"vet_g":18.6,"kcal":615},"ingredienten":[{"item":"kalkoenfilet","gram":200},{"item":"naan_brood","gram":80},{"item":"yoghurt_natuur","gram":100},{"item":"ui","gram":80},{"item":"komkommer","gram":60},{"item":"ghee","gram":10}],"instructies":"Vorm balletjes van kalkoen + ui + indiase kruiden, bak. Maak raita met yoghurt + komkommer. Eet met naan.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":171,"naam":"Tandoori lamb met basmati","type":"diner","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":62.9,"ch_g":84.7,"vet_g":28.8,"kcal":855},"ingredienten":[{"item":"lamsvlees_mager","gram":200},{"item":"rijst_basmati_droog","gram":90},{"item":"yoghurt_natuur","gram":100},{"item":"paprika","gram":100},{"item":"ui","gram":50},{"item":"ghee","gram":10}],"instructies":"Marineer lamsvlees in yoghurt + tandoori-kruiden minimum 1u. Grill. Kook rijst. Stoom paprika.","kooktijd_min":35,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Marineren wel 1u vooraf"},{"id":172,"naam":"Mango-lassi (smoothie)","type":"snack","keuken":"indisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":19.3,"ch_g":39.0,"vet_g":4.2,"kcal":264},"ingredienten":[{"item":"halfvolle_melk","gram":250},{"item":"griekse_yoghurt_0pct","gram":100},{"item":"mango","gram":100},{"item":"honing","gram":10}],"instructies":"Mix in blender met snufje kardemom.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":173,"naam":"Yoghurt met komkommer (raita)","type":"snack","keuken":"indisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":24.2,"ch_g":30.4,"vet_g":2.1,"kcal":236},"ingredienten":[{"item":"griekse_yoghurt_0pct","gram":200},{"item":"komkommer","gram":80},{"item":"naan_brood","gram":40}],"instructies":"Combineer yoghurt met geraspte komkommer. Eet met naan.","kooktijd_min":4,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":174,"naam":"Geroosterde amandelen met cumin","type":"snack","keuken":"indisch","eiwit_niveau":"veganistisch","macros":{"eiwit_g":6.8,"ch_g":18.4,"vet_g":15.1,"kcal":219},"ingredienten":[{"item":"amandelen","gram":30},{"item":"rozijnen","gram":15}],"instructies":"Rooster amandelen met snufje cumin en zout.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":175,"naam":"Recovery: kip-tikka-bowl","type":"post_workout","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":46.5,"ch_g":87.2,"vet_g":4.8,"kcal":585},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"rijst_basmati_droog","gram":100},{"item":"yoghurt_natuur","gram":80},{"item":"paprika","gram":100}],"instructies":"Bak kip met tikka-kruiden. Kook rijst. Top met yoghurt en paprika.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":176,"naam":"Recovery: lassi met haver","type":"post_workout","keuken":"indisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":53.5,"ch_g":58.5,"vet_g":9.4,"kcal":535},"ingredienten":[{"item":"halfvolle_melk","gram":300},{"item":"griekse_yoghurt_0pct","gram":150},{"item":"whey_concentraat","gram":30},{"item":"havermout","gram":40},{"item":"mango","gram":80}],"instructies":"Mix in blender.","kooktijd_min":4,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":177,"naam":"Yoghurt met chia en kardemom","type":"pre_bed","keuken":"indisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":30.7,"ch_g":23.7,"vet_g":12.1,"kcal":315},"ingredienten":[{"item":"griekse_yoghurt_0pct","gram":250},{"item":"chiazaad","gram":15},{"item":"amandelen","gram":15},{"item":"honing","gram":5}],"instructies":"Combineer met snufje kardemom. Laat 5 min staan.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":178,"naam":"Caseïne lassi","type":"pre_bed","keuken":"indisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":39.2,"ch_g":17.6,"vet_g":5.1,"kcal":280},"ingredienten":[{"item":"halfvolle_melk","gram":300},{"item":"caseine","gram":30},{"item":"griekse_yoghurt_0pct","gram":50}],"instructies":"Mix met snufje kardemom.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":179,"naam":"Pre-workout: rijst met yoghurt en honing","type":"pre_workout","keuken":"indisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":11.3,"ch_g":98.5,"vet_g":2.6,"kcal":455},"ingredienten":[{"item":"rijst_basmati_droog","gram":70},{"item":"yoghurt_natuur","gram":100},{"item":"honing","gram":15},{"item":"banaan","gram":1}],"instructies":"Kook rijst. Top met yoghurt, banaan en honing.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":180,"naam":"Shakshuka met feta en pita","type":"ontbijt","keuken":"midden_oosters","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":25.2,"ch_g":57.2,"vet_g":28.1,"kcal":573},"ingredienten":[{"item":"ei","gram":3},{"item":"passata_tomatensaus","gram":200},{"item":"paprika","gram":100},{"item":"ui","gram":50},{"item":"feta","gram":40},{"item":"pita_volkoren","gram":60},{"item":"olijfolie","gram":10}],"instructies":"Bak ui + paprika in olie. Voeg passata + kruiden toe. Pocheer eieren erin. Top feta. Eet met pita.","kooktijd_min":18,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":181,"naam":"Mediterrane labneh-toast met za'atar","type":"ontbijt","keuken":"midden_oosters","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":16.9,"ch_g":53.6,"vet_g":24.5,"kcal":501},"ingredienten":[{"item":"pita_volkoren","gram":80},{"item":"labneh","gram":80},{"item":"tomaat","gram":100},{"item":"komkommer","gram":80},{"item":"olijfolie","gram":10},{"item":"olijven_groen","gram":20}],"instructies":"Smeer labneh op pita. Top met groenten en olijven. Sprinkel za'atar.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":182,"naam":"Yoghurt met dadels en walnoten (Levantijns)","type":"ontbijt","keuken":"midden_oosters","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":28.6,"ch_g":43.5,"vet_g":13.1,"kcal":384},"ingredienten":[{"item":"griekse_yoghurt_0pct","gram":250},{"item":"dadels","gram":30},{"item":"walnoten","gram":20},{"item":"honing","gram":10}],"instructies":"Combineer in bowl. Top met fijngehakte dadels, walnoten en honing.","kooktijd_min":4,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":183,"naam":"Hummus-toast met ei","type":"ontbijt","keuken":"midden_oosters","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":26.3,"ch_g":77.1,"vet_g":27.9,"kcal":647},"ingredienten":[{"item":"pita_volkoren","gram":80},{"item":"kikkererwten_gekookt","gram":100},{"item":"tahini","gram":15},{"item":"olijfolie","gram":10},{"item":"ei","gram":2},{"item":"tomaat","gram":80}],"instructies":"Pureer kikkererwten + tahini + olie tot hummus. Smeer op pita. Top met hardgekookt ei en tomaat.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":184,"naam":"Shoarmabowl met kip en pita","type":"lunch","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":57.0,"ch_g":57.3,"vet_g":27.5,"kcal":705},"ingredienten":[{"item":"shoarmavlees_kip","gram":180},{"item":"pita_volkoren","gram":80},{"item":"yoghurt_natuur","gram":80},{"item":"tomaat","gram":100},{"item":"komkommer","gram":80},{"item":"ui","gram":30},{"item":"olijfolie","gram":10}],"instructies":"Bak shoarmavlees. Maak yoghurtsaus. Vul pita met vlees, groenten en saus.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":185,"naam":"Tabouleh met kip","type":"lunch","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":47.2,"ch_g":71.3,"vet_g":13.7,"kcal":598},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"bulgur_droog","gram":80},{"item":"tomaat","gram":150},{"item":"komkommer","gram":100},{"item":"rucola","gram":40},{"item":"citroen","gram":0},{"item":"olijfolie","gram":10}],"instructies":"Kook bulgur. Bak kip. Combineer met fijngehakte groenten, citroen en olie.","kooktijd_min":22,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":186,"naam":"Falafel-wrap met groenten","type":"lunch","keuken":"midden_oosters","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":33.4,"ch_g":103.1,"vet_g":35.0,"kcal":838},"ingredienten":[{"item":"falafel","gram":150},{"item":"pita_volkoren","gram":80},{"item":"yoghurt_natuur","gram":50},{"item":"tomaat","gram":80},{"item":"komkommer","gram":60},{"item":"rode_kool","gram":40},{"item":"tahini","gram":10}],"instructies":"Verwarm falafel. Vul pita met yoghurt, tahini, falafel en groenten.","kooktijd_min":10,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":187,"naam":"Lamsspies met couscous-salade","type":"lunch","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":50.1,"ch_g":68.8,"vet_g":26.6,"kcal":729},"ingredienten":[{"item":"lamsvlees_mager","gram":150},{"item":"couscous_droog","gram":80},{"item":"paprika","gram":100},{"item":"olijven_groen","gram":30},{"item":"tomaat","gram":100},{"item":"olijfolie","gram":10}],"instructies":"Marineer lamsvlees, rijg op spies, bak. Kook couscous. Combineer met groenten en olijven.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":188,"naam":"Mezze-lunch (groot bord)","type":"lunch","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":58.3,"ch_g":69.5,"vet_g":30.5,"kcal":780},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"kikkererwten_gekookt","gram":100},{"item":"pita_volkoren","gram":60},{"item":"feta","gram":40},{"item":"tomaat","gram":100},{"item":"komkommer","gram":80},{"item":"olijfolie","gram":10},{"item":"tahini","gram":10}],"instructies":"Bak kip. Verwarm kikkererwten. Bouw mezze-bord met alle componenten.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":189,"naam":"Libanese kipfattoush-salade","type":"lunch","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":56.4,"ch_g":44.9,"vet_g":23.1,"kcal":613},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"pita_volkoren","gram":60},{"item":"tomaat","gram":150},{"item":"komkommer","gram":100},{"item":"rucola","gram":50},{"item":"feta","gram":40},{"item":"olijfolie","gram":10},{"item":"citroen","gram":0}],"instructies":"Toast pita-stukken. Bak kip. Combineer met groenten, feta, citroen en olie.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":190,"naam":"Marokkaanse kip-tagine met couscous","type":"lunch","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":63.4,"ch_g":113.7,"vet_g":17.0,"kcal":873},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"couscous_droog","gram":80},{"item":"kikkererwten_gekookt","gram":100},{"item":"wortel","gram":150},{"item":"ui","gram":50},{"item":"olijfolie","gram":10},{"item":"abrikozen_gedroogd","gram":20}],"instructies":"Stoof kip + ui + wortel + kikkererwten + abrikozen + tagine-kruiden. 25 min. Serveer met couscous.","kooktijd_min":40,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":191,"naam":"Pita met shawarma-rundvlees","type":"lunch","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":62.1,"ch_g":56.0,"vet_g":19.3,"kcal":648},"ingredienten":[{"item":"rundsbiefstuk_mager","gram":180},{"item":"pita_volkoren","gram":80},{"item":"yoghurt_natuur","gram":80},{"item":"rode_kool","gram":50},{"item":"tomaat","gram":100},{"item":"tahini","gram":10}],"instructies":"Bak rundvlees in plakjes met shawarma-kruiden. Vul pita met vlees, yoghurt en groenten.","kooktijd_min":15,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":192,"naam":"Marokkaanse lamb-tagine met couscous","type":"diner","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":72.3,"ch_g":116.4,"vet_g":35.3,"kcal":1082},"ingredienten":[{"item":"lamsvlees_mager","gram":200},{"item":"couscous_droog","gram":80},{"item":"kikkererwten_gekookt","gram":100},{"item":"wortel","gram":150},{"item":"ui","gram":80},{"item":"abrikozen_gedroogd","gram":20},{"item":"olijfolie","gram":15}],"instructies":"Bak lam + ui. Voeg wortel + kikkererwten + abrikozen + tagine-kruiden + water toe. Stoof 1u. Serveer met couscous.","kooktijd_min":75,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":193,"naam":"Libanese kip-shoarma met rijst","type":"diner","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":61.5,"ch_g":83.9,"vet_g":33.8,"kcal":887},"ingredienten":[{"item":"shoarmavlees_kip","gram":200},{"item":"rijst_basmati_droog","gram":90},{"item":"yoghurt_natuur","gram":80},{"item":"tomaat","gram":100},{"item":"komkommer","gram":80},{"item":"olijfolie","gram":10},{"item":"tahini","gram":10}],"instructies":"Bak shoarma. Kook rijst. Maak tahini-yoghurt-saus.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":194,"naam":"Egyptische ful medames met ei","type":"diner","keuken":"midden_oosters","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":33.2,"ch_g":94.4,"vet_g":22.8,"kcal":703},"ingredienten":[{"item":"rode_kidneybonen","gram":200},{"item":"ei","gram":2},{"item":"pita_volkoren","gram":80},{"item":"tomaat","gram":100},{"item":"ui","gram":30},{"item":"olijfolie","gram":15},{"item":"citroen","gram":0}],"instructies":"Verwarm bonen met cumin + olie + citroen. Top met gehakt ei, ui en tomaat. Eet met pita.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":195,"naam":"Kebab met aardappel en yoghurt","type":"diner","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":50.6,"ch_g":62.4,"vet_g":21.1,"kcal":660},"ingredienten":[{"item":"rundsgehakt_5pct","gram":180},{"item":"aardappel","gram":300},{"item":"yoghurt_natuur","gram":100},{"item":"ui","gram":50},{"item":"komkommer","gram":60},{"item":"olijfolie","gram":10},{"item":"rucola","gram":30}],"instructies":"Vorm kebabs met gehakt + ui + kruiden. Bak. Maak aardappelpartjes. Maak yoghurt-saus.","kooktijd_min":35,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":196,"naam":"Marokkaanse vis-tagine","type":"diner","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":44.6,"ch_g":64.2,"vet_g":21.2,"kcal":630},"ingredienten":[{"item":"kabeljauw","gram":200},{"item":"aardappel","gram":300},{"item":"paprika","gram":100},{"item":"tomaat","gram":150},{"item":"olijven_groen","gram":30},{"item":"olijfolie","gram":15},{"item":"citroen","gram":0}],"instructies":"Bak ui + paprika + tomaat. Voeg aardappel toe. Pocheer vis 10 min in saus met olijven.","kooktijd_min":35,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":197,"naam":"Persian chicken met saffraan-rijst","type":"diner","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":61.4,"ch_g":85.0,"vet_g":25.2,"kcal":813},"ingredienten":[{"item":"kipfilet","gram":200},{"item":"rijst_basmati_droog","gram":90},{"item":"ui","gram":80},{"item":"yoghurt_natuur","gram":80},{"item":"ghee","gram":10},{"item":"amandelen","gram":20}],"instructies":"Marineer kip in yoghurt + saffraan. Bak. Kook rijst met saffraan + amandelen.","kooktijd_min":35,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":198,"naam":"Lamskotelet met bulgur en groenten","type":"diner","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":62.6,"ch_g":70.9,"vet_g":32.6,"kcal":828},"ingredienten":[{"item":"lamsvlees_mager","gram":200},{"item":"bulgur_droog","gram":80},{"item":"courgette","gram":100},{"item":"paprika","gram":100},{"item":"olijfolie","gram":15},{"item":"rucola","gram":30}],"instructies":"Kook bulgur. Bak lamsvlees. Bak groenten. Combineer met rucola.","kooktijd_min":30,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":199,"naam":"Kefta-balletjes met couscous en tomatensaus","type":"diner","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":58.9,"ch_g":74.3,"vet_g":24.0,"kcal":767},"ingredienten":[{"item":"rundsgehakt_5pct","gram":200},{"item":"couscous_droog","gram":80},{"item":"passata_tomatensaus","gram":200},{"item":"ui","gram":50},{"item":"ei","gram":1},{"item":"olijfolie","gram":10}],"instructies":"Vorm balletjes met gehakt + ei + Marokkaanse kruiden. Bak. Sudder in passata. Eet met couscous.","kooktijd_min":25,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":200,"naam":"Halloumi-pita met groenten","type":"diner","keuken":"midden_oosters","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":51.8,"ch_g":65.8,"vet_g":55.1,"kcal":954},"ingredienten":[{"item":"halloumi","gram":150},{"item":"pita_volkoren","gram":100},{"item":"rucola","gram":50},{"item":"tomaat","gram":100},{"item":"komkommer","gram":80},{"item":"olijfolie","gram":10},{"item":"ei","gram":2}],"instructies":"Grill halloumi. Bak ei. Vul pita met halloumi, ei en groenten.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":201,"naam":"Kebab van kalkoen met couscous","type":"diner","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":59.9,"ch_g":71.3,"vet_g":15.3,"kcal":682},"ingredienten":[{"item":"kalkoenfilet","gram":200},{"item":"couscous_droog","gram":80},{"item":"paprika","gram":100},{"item":"ui","gram":50},{"item":"yoghurt_natuur","gram":80},{"item":"olijfolie","gram":10}],"instructies":"Vorm kebabs van kalkoengehakt + ui + kruiden. Bak. Kook couscous met paprika. Top met yoghurt.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":202,"naam":"Hummus met groentenstokjes en pita","type":"snack","keuken":"midden_oosters","eiwit_niveau":"veganistisch","macros":{"eiwit_g":21.8,"ch_g":78.1,"vet_g":23.8,"kcal":600},"ingredienten":[{"item":"kikkererwten_gekookt","gram":150},{"item":"tahini","gram":15},{"item":"olijfolie","gram":10},{"item":"paprika","gram":80},{"item":"wortel","gram":100},{"item":"pita_volkoren","gram":40}],"instructies":"Pureer kikkererwten + tahini + olie. Eet met groenten en pita.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":203,"naam":"Labneh met olijfolie en za'atar","type":"snack","keuken":"midden_oosters","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":18.5,"ch_g":33.0,"vet_g":30.5,"kcal":488},"ingredienten":[{"item":"labneh","gram":150},{"item":"olijfolie","gram":10},{"item":"pita_volkoren","gram":50}],"instructies":"Smeer labneh op bord. Top met olie en za'atar. Eet met pita.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":204,"naam":"Geroosterde kikkererwten (krokant)","type":"snack","keuken":"midden_oosters","eiwit_niveau":"veganistisch","macros":{"eiwit_g":18.0,"ch_g":54.0,"vet_g":16.0,"kcal":420},"ingredienten":[{"item":"kikkererwten_gekookt","gram":200},{"item":"olijfolie","gram":10}],"instructies":"Droog kikkererwten af. Meng met olie + cumin + paprikapoeder. Bak 25 min in oven 200°C.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":"Knapperig en eiwitrijk"},{"id":205,"naam":"Recovery: shoarma-bowl","type":"post_workout","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":47.9,"ch_g":86.7,"vet_g":14.4,"kcal":672},"ingredienten":[{"item":"shoarmavlees_kip","gram":150},{"item":"rijst_basmati_droog","gram":100},{"item":"yoghurt_natuur","gram":80},{"item":"tomaat","gram":100}],"instructies":"Bak shoarma. Kook rijst. Combineer met yoghurt en tomaat.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":206,"naam":"Recovery: kalkoen-couscous-bowl","type":"post_workout","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":47.0,"ch_g":78.0,"vet_g":8.6,"kcal":598},"ingredienten":[{"item":"kalkoenfilet","gram":150},{"item":"couscous_droog","gram":100},{"item":"paprika","gram":100},{"item":"olijfolie","gram":5}],"instructies":"Bak kalkoen. Kook couscous. Combineer.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":207,"naam":"Recovery shake met dadels","type":"post_workout","keuken":"midden_oosters","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":39.8,"ch_g":47.0,"vet_g":15.4,"kcal":473},"ingredienten":[{"item":"halfvolle_melk","gram":400},{"item":"whey_concentraat","gram":30},{"item":"dadels","gram":30},{"item":"amandelen","gram":15}],"instructies":"Mix in blender.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":208,"naam":"Labneh met dadels en walnoten","type":"pre_bed","keuken":"midden_oosters","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":20.7,"ch_g":28.9,"vet_g":35.8,"kcal":518},"ingredienten":[{"item":"labneh","gram":200},{"item":"dadels","gram":25},{"item":"walnoten","gram":15}],"instructies":"Combineer in bowl.","kooktijd_min":2,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":209,"naam":"Yoghurt met chia en honing (Levantijns)","type":"pre_bed","keuken":"midden_oosters","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":29.7,"ch_g":26.7,"vet_g":9.6,"kcal":301},"ingredienten":[{"item":"griekse_yoghurt_0pct","gram":250},{"item":"chiazaad","gram":15},{"item":"honing","gram":10},{"item":"amandelen","gram":10}],"instructies":"Combineer. Laat 5 min staan voor chia.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":210,"naam":"Pre-workout: pita met honing en banaan","type":"pre_workout","keuken":"midden_oosters","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":14.4,"ch_g":87.1,"vet_g":3.5,"kcal":426},"ingredienten":[{"item":"pita_volkoren","gram":80},{"item":"honing","gram":15},{"item":"banaan","gram":1},{"item":"yoghurt_natuur","gram":100}],"instructies":"Smeer yoghurt op pita. Top met banaan en honing.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":"CH-rijk"},{"id":211,"naam":"Vegetarisch ontbijt: roerei met groenten en kaas","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":28.7,"ch_g":34.3,"vet_g":30.7,"kcal":528},"ingredienten":[{"item":"ei","gram":4},{"item":"champignons","gram":100},{"item":"paprika","gram":80},{"item":"harde_kaas","gram":30},{"item":"volkoren_brood","gram":60},{"item":"olijfolie","gram":10}],"instructies":"Bak champignons + paprika. Klop eieren erbij. Top met kaas. Eet met brood.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":212,"naam":"Vegetarische omelet met aardappel","type":"lunch","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":28.1,"ch_g":49.3,"vet_g":29.1,"kcal":583},"ingredienten":[{"item":"ei","gram":4},{"item":"aardappel","gram":250},{"item":"ui","gram":50},{"item":"harde_kaas","gram":30},{"item":"spinazie","gram":100},{"item":"olijfolie","gram":10}],"instructies":"Bak aardappel + ui. Voeg spinazie toe. Klop eieren erbij. Top met kaas.","kooktijd_min":22,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":213,"naam":"Witloofschotel met kaas en ei","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":35.8,"ch_g":73.3,"vet_g":34.4,"kcal":745},"ingredienten":[{"item":"witloof","gram":350},{"item":"ei","gram":3},{"item":"aardappel","gram":300},{"item":"harde_kaas","gram":50},{"item":"halfvolle_melk","gram":150},{"item":"olijfolie","gram":10}],"instructies":"Stoom witloof. Maak lichte kaassaus. Top met witloof in ovenschotel + kaas. 20 min oven.","kooktijd_min":45,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":214,"naam":"Vegetarische lasagne met spinazie en ricotta","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":58.0,"ch_g":79.5,"vet_g":50.7,"kcal":1019},"ingredienten":[{"item":"pasta_droog","gram":80},{"item":"ricotta","gram":200},{"item":"diepvries_spinazie","gram":200},{"item":"passata_tomatensaus","gram":200},{"item":"mozzarella_light","gram":80},{"item":"ei","gram":1},{"item":"olijfolie","gram":10}],"instructies":"Mix ricotta + spinazie + ei. Wissel pasta-vellen met passata en ricotta-mengsel. Top mozzarella. 30 min oven.","kooktijd_min":60,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":215,"naam":"Vegetarische Griekse salade","type":"lunch","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":30.4,"ch_g":62.2,"vet_g":47.5,"kcal":798},"ingredienten":[{"item":"feta","gram":100},{"item":"tomaat","gram":200},{"item":"komkommer","gram":100},{"item":"olijven_groen","gram":40},{"item":"ui","gram":30},{"item":"olijfolie","gram":15},{"item":"ciabatta","gram":80},{"item":"ei","gram":2}],"instructies":"Combineer alle ingrediënten. Top met hardgekookt ei.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":216,"naam":"Pasta met ricotta, spinazie en walnoten","type":"diner","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":45.8,"ch_g":81.9,"vet_g":60.6,"kcal":1056},"ingredienten":[{"item":"pasta_volkoren_droog","gram":100},{"item":"ricotta","gram":150},{"item":"spinazie","gram":200},{"item":"walnoten","gram":25},{"item":"knoflook","gram":5},{"item":"olijfolie","gram":15},{"item":"harde_kaas","gram":25}],"instructies":"Kook pasta. Bak knoflook + spinazie. Voeg ricotta + walnoten toe. Combineer met pasta.","kooktijd_min":20,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":217,"naam":"Aubergine-Parmigiana","type":"diner","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":49.8,"ch_g":40.8,"vet_g":54.9,"kcal":834},"ingredienten":[{"item":"aubergine","gram":350},{"item":"passata_tomatensaus","gram":250},{"item":"mozzarella_light","gram":100},{"item":"ricotta","gram":100},{"item":"ei","gram":2},{"item":"olijfolie","gram":15},{"item":"harde_kaas","gram":30}],"instructies":"Bak plakjes aubergine. Wissel met passata + ricotta + mozzarella. Top harde kaas. 30 min oven.","kooktijd_min":60,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":218,"naam":"Halloumi-salade met couscous","type":"lunch","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":46.6,"ch_g":71.7,"vet_g":52.3,"kcal":948},"ingredienten":[{"item":"halloumi","gram":150},{"item":"couscous_droog","gram":80},{"item":"tomaat","gram":150},{"item":"komkommer","gram":80},{"item":"olijven_groen","gram":30},{"item":"olijfolie","gram":10},{"item":"rucola","gram":40}],"instructies":"Grill halloumi. Kook couscous. Combineer met groenten en olie.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":219,"naam":"Tofu-stir-fry met noedels en ei","type":"diner","keuken":"aziatisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":39.9,"ch_g":91.9,"vet_g":28.3,"kcal":784},"ingredienten":[{"item":"tofu_naturel","gram":200},{"item":"rijstpasta_droog","gram":90},{"item":"paprika","gram":100},{"item":"broccoli","gram":150},{"item":"ei","gram":1},{"item":"sesamolie","gram":10},{"item":"knoflook","gram":5},{"item":"soyasaus","gram":10}],"instructies":"Kook noedels. Bak tofu in blokjes. Wokken groenten + ei + knoflook. Combineer.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":220,"naam":"Vegetarische bibimbap met ei","type":"lunch","keuken":"aziatisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":28.9,"ch_g":79.1,"vet_g":23.6,"kcal":653},"ingredienten":[{"item":"rijst_jasmine_droog","gram":80},{"item":"ei","gram":2},{"item":"spinazie","gram":100},{"item":"wortel","gram":100},{"item":"paprika","gram":80},{"item":"tofu_naturel","gram":100},{"item":"sesamolie","gram":10},{"item":"soyasaus","gram":8}],"instructies":"Kook rijst. Bak tofu, ei en groenten apart. Combineer in bowl met soja en sesam.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":221,"naam":"Quesadilla met kaas en groenten","type":"diner","keuken":"mexicaans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":48.9,"ch_g":88.7,"vet_g":53.1,"kcal":1001},"ingredienten":[{"item":"wrap_volkoren","gram":80},{"item":"harde_kaas","gram":80},{"item":"zwarte_bonen_gekookt","gram":150},{"item":"paprika","gram":100},{"item":"avocado","gram":60},{"item":"olijfolie","gram":10},{"item":"ei","gram":2}],"instructies":"Mix bonen + paprika. Vul wrap met kaas + bonen-mengsel. Bak in pan. Top met avocado en gepocheerd ei.","kooktijd_min":20,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":222,"naam":"Vegetarische burrito-bowl","type":"lunch","keuken":"mexicaans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":35.9,"ch_g":119.9,"vet_g":24.6,"kcal":823},"ingredienten":[{"item":"rijst_basmati_droog","gram":90},{"item":"zwarte_bonen_gekookt","gram":150},{"item":"ei","gram":2},{"item":"paprika","gram":100},{"item":"avocado","gram":60},{"item":"salsa_verde","gram":30},{"item":"harde_kaas","gram":30}],"instructies":"Kook rijst. Verwarm bonen. Bak ei. Combineer met groenten, avocado, salsa en kaas.","kooktijd_min":18,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":223,"naam":"Paneer tikka masala (light met halloumi)","type":"diner","keuken":"indisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":58.9,"ch_g":95.2,"vet_g":73.7,"kcal":1275},"ingredienten":[{"item":"halloumi","gram":200},{"item":"rijst_basmati_droog","gram":90},{"item":"yoghurt_natuur","gram":100},{"item":"tomatenpuree","gram":50},{"item":"ui","gram":50},{"item":"kokosroom","gram":50},{"item":"ghee","gram":10}],"instructies":"Snij halloumi in blokjes, marineer in yoghurt + kruiden. Bak. Maak saus met passata + tomatenpuree + kokosroom. Combineer. Eet met rijst.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":224,"naam":"Linzendaal met basmatirijst","type":"lunch","keuken":"indisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":38.5,"ch_g":132.8,"vet_g":13.5,"kcal":812},"ingredienten":[{"item":"rode_linzen_droog","gram":100},{"item":"rijst_basmati_droog","gram":80},{"item":"ui","gram":50},{"item":"knoflook","gram":5},{"item":"ghee","gram":10},{"item":"yoghurt_natuur","gram":80},{"item":"spinazie","gram":100}],"instructies":"Bak ui + knoflook. Voeg linzen + water + curry-kruiden toe. Kook 25 min. Voeg spinazie toe. Eet met rijst en yoghurt.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":225,"naam":"Falafel-bowl met couscous","type":"lunch","keuken":"midden_oosters","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":45.4,"ch_g":135.8,"vet_g":46.7,"kcal":1130},"ingredienten":[{"item":"falafel","gram":200},{"item":"couscous_droog","gram":80},{"item":"tomaat","gram":100},{"item":"komkommer","gram":80},{"item":"yoghurt_natuur","gram":80},{"item":"tahini","gram":15},{"item":"rucola","gram":40}],"instructies":"Verwarm falafel. Kook couscous. Combineer met groenten, yoghurt en tahini.","kooktijd_min":15,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":226,"naam":"Vegetarische shakshuka grand","type":"diner","keuken":"midden_oosters","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":37.3,"ch_g":91.6,"vet_g":41.0,"kcal":870},"ingredienten":[{"item":"ei","gram":4},{"item":"passata_tomatensaus","gram":300},{"item":"paprika","gram":150},{"item":"ui","gram":80},{"item":"feta","gram":60},{"item":"pita_volkoren","gram":100},{"item":"olijfolie","gram":15}],"instructies":"Bak ui + paprika in olie. Voeg passata + kruiden toe. Pocheer 4 eieren erin. Top feta. Eet met pita.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":"Klassieker"},{"id":227,"naam":"Vegetarisch ei-broodje","type":"snack","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":12.9,"ch_g":32.6,"vet_g":14.4,"kcal":306},"ingredienten":[{"item":"volkoren_brood","gram":60},{"item":"ei","gram":2},{"item":"avocado","gram":50},{"item":"tomaat","gram":60}],"instructies":"Toast brood. Pers avocado erop. Top met hardgekookt ei in plakjes en tomaat.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":228,"naam":"Cottage cheese met chutney-style","type":"snack","keuken":"indisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":25.6,"ch_g":18.3,"vet_g":15.7,"kcal":313},"ingredienten":[{"item":"cottage_cheese","gram":200},{"item":"mango","gram":60},{"item":"amandelen","gram":15}],"instructies":"Combineer met snufje cumin en gember.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":229,"naam":"Vegetarisch: ricotta met honing en walnoten","type":"pre_bed","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":31.0,"ch_g":26.9,"vet_g":45.7,"kcal":632},"ingredienten":[{"item":"ricotta","gram":250},{"item":"honing","gram":10},{"item":"walnoten","gram":20},{"item":"blauwe_bessen","gram":60}],"instructies":"Combineer in bowl.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":230,"naam":"Vegetarisch recovery: ei-rijst-bowl","type":"post_workout","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":20.0,"ch_g":85.0,"vet_g":16.3,"kcal":565},"ingredienten":[{"item":"ei","gram":4},{"item":"rijst_basmati_droog","gram":100},{"item":"paprika","gram":100},{"item":"olijfolie","gram":5}],"instructies":"Bak ei. Kook rijst. Combineer met paprika.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":231,"naam":"Vegan tofu-scramble met groenten","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"veganistisch","macros":{"eiwit_g":32.8,"ch_g":40.3,"vet_g":26.4,"kcal":539},"ingredienten":[{"item":"tofu_naturel","gram":200},{"item":"paprika","gram":100},{"item":"spinazie","gram":60},{"item":"ui","gram":50},{"item":"olijfolie","gram":10},{"item":"volkoren_brood","gram":60}],"instructies":"Bak ui, voeg paprika toe. Verkruimel tofu erbij, breng op smaak met kurkuma. Voeg spinazie toe. Eet met brood.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":232,"naam":"Overnight oats vegan met sojamelk","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"veganistisch","macros":{"eiwit_g":23.6,"ch_g":70.5,"vet_g":22.7,"kcal":580},"ingredienten":[{"item":"havermout","gram":70},{"item":"soyamelk_ongezoet","gram":250},{"item":"chiazaad","gram":15},{"item":"blauwe_bessen","gram":80},{"item":"amandelpasta","gram":15},{"item":"ahornsiroop","gram":10}],"instructies":"Mix alles in een potje. Zet 4u+ in koelkast. Top met bessen.","kooktijd_min":3,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":233,"naam":"Linzensalade met rode kool en walnoten (vegan)","type":"lunch","keuken":"belgisch_nederlands","eiwit_niveau":"veganistisch","macros":{"eiwit_g":29.0,"ch_g":89.5,"vet_g":32.9,"kcal":748},"ingredienten":[{"item":"linzen_gekookt","gram":250},{"item":"rode_kool","gram":100},{"item":"wortel","gram":100},{"item":"walnoten","gram":25},{"item":"olijfolie","gram":15},{"item":"appel","gram":1}],"instructies":"Meng linzen met fijngesneden rode kool, geraspte wortel, appel-blokjes, walnoten en olie.","kooktijd_min":12,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":"IJzerrijk"},{"id":234,"naam":"Vegan stoofpot met tempeh en wortel","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"veganistisch","macros":{"eiwit_g":49.8,"ch_g":111.2,"vet_g":38.1,"kcal":962},"ingredienten":[{"item":"tempeh","gram":200},{"item":"aardappel","gram":350},{"item":"wortel","gram":200},{"item":"ui","gram":80},{"item":"olijfolie","gram":15},{"item":"rode_kool","gram":150}],"instructies":"Bak tempeh + ui. Voeg wortel + bouillon toe. Sudder. Kook aardappel apart.","kooktijd_min":50,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":235,"naam":"Mediterrane bonenstoof met polenta","type":"lunch","keuken":"mediterraans","eiwit_niveau":"veganistisch","macros":{"eiwit_g":41.9,"ch_g":160.1,"vet_g":22.3,"kcal":992},"ingredienten":[{"item":"zwarte_bonen_gekookt","gram":200},{"item":"kikkererwten_gekookt","gram":150},{"item":"polenta_droog","gram":70},{"item":"passata_tomatensaus","gram":200},{"item":"paprika","gram":100},{"item":"olijfolie","gram":15},{"item":"rucola","gram":30}],"instructies":"Bak ui + paprika. Voeg passata + bonen toe. Kook polenta apart. Combineer.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":"Glutenvrij ook"},{"id":236,"naam":"Pasta aglio e olio met witte bonen (vegan)","type":"diner","keuken":"mediterraans","eiwit_niveau":"veganistisch","macros":{"eiwit_g":35.8,"ch_g":125.3,"vet_g":36.4,"kcal":944},"ingredienten":[{"item":"pasta_volkoren_droog","gram":100},{"item":"zwarte_bonen_gekookt","gram":200},{"item":"knoflook","gram":8},{"item":"rucola","gram":50},{"item":"olijfolie","gram":20},{"item":"walnoten","gram":20}],"instructies":"Kook pasta. Bak knoflook in olie. Voeg bonen + rucola + walnoten toe. Combineer met pasta.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":237,"naam":"Vegan poke-bowl met edamame en tofu","type":"lunch","keuken":"aziatisch","eiwit_niveau":"veganistisch","macros":{"eiwit_g":50.0,"ch_g":88.5,"vet_g":43.7,"kcal":918},"ingredienten":[{"item":"tofu_gerookt","gram":180},{"item":"rijst_jasmine_droog","gram":80},{"item":"edamame","gram":100},{"item":"avocado","gram":60},{"item":"wortel","gram":80},{"item":"sesamolie","gram":10},{"item":"soyasaus","gram":10},{"item":"sesamzaad","gram":5}],"instructies":"Kook rijst. Snij tofu en avocado. Combineer met edamame, wortel, soja en sesam.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":238,"naam":"Thaise vegan curry met tofu en kokosmelk","type":"diner","keuken":"aziatisch","eiwit_niveau":"veganistisch","macros":{"eiwit_g":42.8,"ch_g":95.5,"vet_g":72.9,"kcal":1188},"ingredienten":[{"item":"tofu_naturel","gram":250},{"item":"rijst_jasmine_droog","gram":90},{"item":"kokosmelk_blik","gram":200},{"item":"paprika","gram":100},{"item":"rode_currypasta","gram":25},{"item":"aubergine","gram":100},{"item":"kokosolie","gram":10}],"instructies":"Bak currypasta. Voeg kokosmelk + groenten + tofu toe. Sudder 15 min. Eet met rijst.","kooktijd_min":25,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":239,"naam":"Pad Thai vegan met tempeh","type":"diner","keuken":"aziatisch","eiwit_niveau":"veganistisch","macros":{"eiwit_g":51.0,"ch_g":107.8,"vet_g":43.1,"kcal":995},"ingredienten":[{"item":"tempeh","gram":200},{"item":"rijstnoedels_droog","gram":100},{"item":"paprika","gram":100},{"item":"pinda's","gram":20},{"item":"limoen","gram":1},{"item":"sesamolie","gram":10},{"item":"soyasaus","gram":10}],"instructies":"Kook noedels. Bak tempeh in plakjes. Wokken groenten + pinda's + soja. Combineer.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":240,"naam":"Vegan udon met miso en tofu","type":"lunch","keuken":"aziatisch","eiwit_niveau":"veganistisch","macros":{"eiwit_g":36.1,"ch_g":83.9,"vet_g":21.5,"kcal":663},"ingredienten":[{"item":"udonnoedels_droog","gram":90},{"item":"tofu_naturel","gram":150},{"item":"bok_choi","gram":150},{"item":"champignons","gram":100},{"item":"miso_pasta","gram":25},{"item":"sesamolie","gram":8}],"instructies":"Maak miso-bouillon. Kook noedels. Voeg tofu + groenten toe.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":241,"naam":"Vegan chili sin carne","type":"diner","keuken":"mexicaans","eiwit_niveau":"veganistisch","macros":{"eiwit_g":47.9,"ch_g":185.4,"vet_g":21.4,"kcal":1088},"ingredienten":[{"item":"zwarte_bonen_gekookt","gram":250},{"item":"rode_kidneybonen","gram":150},{"item":"passata_tomatensaus","gram":250},{"item":"paprika","gram":100},{"item":"ui","gram":50},{"item":"olijfolie","gram":10},{"item":"rijst_basmati_droog","gram":80},{"item":"avocado","gram":50}],"instructies":"Bak ui + paprika. Voeg bonen + passata + chili-kruiden toe. 20 min. Serveer met rijst en avocado.","kooktijd_min":35,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":242,"naam":"Vegan burrito met tempeh en bonen","type":"lunch","keuken":"mexicaans","eiwit_niveau":"veganistisch","macros":{"eiwit_g":50.0,"ch_g":92.4,"vet_g":31.1,"kcal":796},"ingredienten":[{"item":"tempeh","gram":150},{"item":"wrap_volkoren","gram":60},{"item":"zwarte_bonen_gekookt","gram":150},{"item":"avocado","gram":60},{"item":"paprika","gram":100},{"item":"salsa_verde","gram":30}],"instructies":"Bak tempeh in plakjes met taco-kruiden. Vul wrap met tempeh, bonen, avocado, paprika en salsa.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":243,"naam":"Vegan dahl met rijst en spinazie","type":"diner","keuken":"indisch","eiwit_niveau":"veganistisch","macros":{"eiwit_g":44.3,"ch_g":152.7,"vet_g":44.2,"kcal":1182},"ingredienten":[{"item":"rode_linzen_droog","gram":120},{"item":"rijst_basmati_droog","gram":90},{"item":"kokosmelk_blik","gram":150},{"item":"spinazie","gram":150},{"item":"ui","gram":50},{"item":"kokosolie","gram":10}],"instructies":"Kook rijst. Bak ui. Voeg linzen + kokosmelk + curry-kruiden toe. 25 min. Spinazie laatste 5 min.","kooktijd_min":35,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":244,"naam":"Chana masala (kikkererwten-curry) met rijst","type":"lunch","keuken":"indisch","eiwit_niveau":"veganistisch","macros":{"eiwit_g":33.7,"ch_g":144.9,"vet_g":19.0,"kcal":872},"ingredienten":[{"item":"kikkererwten_gekookt","gram":250},{"item":"rijst_basmati_droog","gram":80},{"item":"tomatenpuree","gram":50},{"item":"ui","gram":50},{"item":"kokosolie","gram":10},{"item":"spinazie","gram":100}],"instructies":"Bak ui + kruiden in olie. Voeg tomatenpuree + kikkererwten + water toe. Sudder. Spinazie laatste. Eet met rijst.","kooktijd_min":25,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":245,"naam":"Vegan falafel-wrap","type":"lunch","keuken":"midden_oosters","eiwit_niveau":"veganistisch","macros":{"eiwit_g":46.8,"ch_g":142.9,"vet_g":51.2,"kcal":1181},"ingredienten":[{"item":"falafel","gram":200},{"item":"pita_volkoren","gram":80},{"item":"kikkererwten_gekookt","gram":80},{"item":"tomaat","gram":100},{"item":"komkommer","gram":80},{"item":"tahini","gram":20},{"item":"rode_kool","gram":50}],"instructies":"Verwarm falafel. Vul pita met tahini, falafel en groenten.","kooktijd_min":10,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":246,"naam":"Vegan tagine met kikkererwten en abrikozen","type":"diner","keuken":"midden_oosters","eiwit_niveau":"veganistisch","macros":{"eiwit_g":40.8,"ch_g":171.6,"vet_g":33.9,"kcal":1140},"ingredienten":[{"item":"kikkererwten_gekookt","gram":250},{"item":"couscous_droog","gram":80},{"item":"wortel","gram":200},{"item":"ui","gram":80},{"item":"abrikozen_gedroogd","gram":30},{"item":"olijfolie","gram":15},{"item":"amandelen","gram":20}],"instructies":"Bak ui + wortel. Voeg kikkererwten + abrikozen + tagine-kruiden toe. Sudder 20 min. Top met amandelen. Eet met couscous.","kooktijd_min":35,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":247,"naam":"Vegan eiwit-shake (soja)","type":"snack","keuken":"belgisch_nederlands","eiwit_niveau":"veganistisch","macros":{"eiwit_g":39.1,"ch_g":48.9,"vet_g":8.5,"kcal":435},"ingredienten":[{"item":"soyamelk_ongezoet","gram":300},{"item":"soja_eiwitpoeder","gram":30},{"item":"banaan","gram":1},{"item":"havermout","gram":30}],"instructies":"Mix in blender.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":248,"naam":"Hummus met groenten en pita (vegan)","type":"snack","keuken":"midden_oosters","eiwit_niveau":"veganistisch","macros":{"eiwit_g":21.6,"ch_g":76.5,"vet_g":23.8,"kcal":592},"ingredienten":[{"item":"kikkererwten_gekookt","gram":150},{"item":"tahini","gram":15},{"item":"olijfolie","gram":10},{"item":"paprika","gram":80},{"item":"wortel","gram":80},{"item":"pita_volkoren","gram":40}],"instructies":"Pureer kikkererwten + tahini + olie. Eet met groenten en pita.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":249,"naam":"Vegan energy balls","type":"snack","keuken":"belgisch_nederlands","eiwit_niveau":"veganistisch","macros":{"eiwit_g":14.8,"ch_g":89.0,"vet_g":18.6,"kcal":562},"ingredienten":[{"item":"havermout","gram":60},{"item":"dadels","gram":60},{"item":"amandelpasta","gram":20},{"item":"chiazaad","gram":10}],"instructies":"Pureer alles tot deeg, vorm balletjes. Koel bewaren.","kooktijd_min":10,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":250,"naam":"Vegan pre-bed: tofu-pudding met chia","type":"pre_bed","keuken":"belgisch_nederlands","eiwit_niveau":"veganistisch","macros":{"eiwit_g":30.4,"ch_g":34.5,"vet_g":28.4,"kcal":496},"ingredienten":[{"item":"tofu_naturel","gram":200},{"item":"amandelpasta","gram":20},{"item":"dadels","gram":30},{"item":"chiazaad","gram":10}],"instructies":"Pureer tofu + amandelpasta + dadels + chia tot puddingstructuur.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":251,"naam":"Soja-yoghurt met chia (vegan)","type":"pre_bed","keuken":"mediterraans","eiwit_niveau":"veganistisch","macros":{"eiwit_g":16.0,"ch_g":22.5,"vet_g":22.8,"kcal":351},"ingredienten":[{"item":"soyayoghurt","gram":250},{"item":"chiazaad","gram":15},{"item":"walnoten","gram":20},{"item":"blauwe_bessen","gram":60}],"instructies":"Combineer. Laat 5 min staan.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":252,"naam":"Vegan recovery: rijst met tempeh","type":"post_workout","keuken":"belgisch_nederlands","eiwit_niveau":"veganistisch","macros":{"eiwit_g":45.7,"ch_g":101.7,"vet_g":31.4,"kcal":844},"ingredienten":[{"item":"tempeh","gram":180},{"item":"rijst_basmati_droog","gram":100},{"item":"broccoli","gram":150},{"item":"olijfolie","gram":10}],"instructies":"Bak tempeh. Kook rijst. Stoom broccoli.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":253,"naam":"Vegan recovery shake met soja","type":"post_workout","keuken":"aziatisch","eiwit_niveau":"veganistisch","macros":{"eiwit_g":43.7,"ch_g":55.5,"vet_g":11.0,"kcal":505},"ingredienten":[{"item":"soyamelk_ongezoet","gram":400},{"item":"soja_eiwitpoeder","gram":30},{"item":"banaan","gram":1},{"item":"havermout","gram":40}],"instructies":"Mix in blender.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":254,"naam":"Glutenvrije havermout met fruit en noten","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":21.1,"ch_g":85.8,"vet_g":21.9,"kcal":627},"ingredienten":[{"item":"gv_havermout","gram":70},{"item":"halfvolle_melk","gram":250},{"item":"appel","gram":1},{"item":"walnoten","gram":20},{"item":"honing","gram":10}],"instructies":"Kook glutenvrije havermout met melk. Top met appel, walnoten en honing.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":255,"naam":"Quinoasalade met kip en feta (glutenvrij)","type":"lunch","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":54.9,"ch_g":60.7,"vet_g":28.0,"kcal":722},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"quinoa_droog","gram":80},{"item":"feta","gram":50},{"item":"tomaat","gram":100},{"item":"komkommer","gram":80},{"item":"rucola","gram":30},{"item":"olijfolie","gram":10}],"instructies":"Kook quinoa. Bak kip. Combineer met groenten, feta en olie.","kooktijd_min":22,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":256,"naam":"Glutenvrije lasagne met rijstpasta","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":60.2,"ch_g":77.6,"vet_g":28.0,"kcal":817},"ingredienten":[{"item":"rundsgehakt_5pct","gram":180},{"item":"rijstpasta_droog","gram":80},{"item":"passata_tomatensaus","gram":200},{"item":"diepvries_spinazie","gram":100},{"item":"mozzarella_light","gram":60},{"item":"olijfolie","gram":10}],"instructies":"Maak ragout. Wissel met rijst-pastavellen en spinazie. Top met mozzarella. 30 min oven.","kooktijd_min":55,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":257,"naam":"Boekweit-bowl met zalm (glutenvrij)","type":"diner","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":52.9,"ch_g":70.8,"vet_g":45.6,"kcal":880},"ingredienten":[{"item":"zalm_vers","gram":180},{"item":"boekweit_droog","gram":80},{"item":"broccoli","gram":150},{"item":"avocado","gram":60},{"item":"olijfolie","gram":10},{"item":"rucola","gram":30}],"instructies":"Kook boekweit. Bak zalm. Stoom broccoli. Combineer met avocado en olie.","kooktijd_min":25,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":258,"naam":"Glutenvrije pad thai met rijstnoedels","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":52.0,"ch_g":89.4,"vet_g":25.9,"kcal":810},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"rijstnoedels_droog","gram":100},{"item":"ei","gram":2},{"item":"paprika","gram":100},{"item":"pinda's","gram":15},{"item":"limoen","gram":1},{"item":"sesamolie","gram":10},{"item":"soyasaus","gram":8}],"instructies":"Kook noedels. Bak kip + ei. Wokken groenten + pinda's. Combineer.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Soja kan glutenvrij zijn — check label"},{"id":259,"naam":"Glutenvrije dahl met basmatirijst","type":"diner","keuken":"indisch","eiwit_niveau":"veganistisch","macros":{"eiwit_g":44.3,"ch_g":152.7,"vet_g":44.2,"kcal":1182},"ingredienten":[{"item":"rode_linzen_droog","gram":120},{"item":"rijst_basmati_droog","gram":90},{"item":"kokosmelk_blik","gram":150},{"item":"spinazie","gram":150},{"item":"ui","gram":50},{"item":"kokosolie","gram":10}],"instructies":"Kook rijst. Bak ui. Voeg linzen + kokosmelk toe. 25 min. Spinazie laatste 5 min.","kooktijd_min":35,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":260,"naam":"Glutenvrije quinoa-tabouleh met kip","type":"lunch","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":48.8,"ch_g":61.7,"vet_g":17.7,"kcal":606},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"quinoa_droog","gram":80},{"item":"tomaat","gram":150},{"item":"komkommer","gram":100},{"item":"rucola","gram":40},{"item":"olijfolie","gram":10},{"item":"citroen","gram":0}],"instructies":"Kook quinoa. Bak kip. Combineer met groenten en olie.","kooktijd_min":22,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":261,"naam":"Glutenvrij recovery: rijst-kip-bowl","type":"post_workout","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":46.0,"ch_g":85.5,"vet_g":3.9,"kcal":568},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"rijst_basmati_droog","gram":100},{"item":"broccoli","gram":150}],"instructies":"Kook rijst. Bak kip. Stoom broccoli.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":262,"naam":"Lactosevrij ontbijt met havermelk","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"vegetarisch","macros":{"eiwit_g":16.1,"ch_g":97.3,"vet_g":16.5,"kcal":603},"ingredienten":[{"item":"havermout","gram":70},{"item":"havermelk_ongezoet","gram":250},{"item":"banaan","gram":1},{"item":"amandelen","gram":15},{"item":"honing","gram":10}],"instructies":"Kook havermout met havermelk. Top met banaan, amandelen en honing.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":263,"naam":"Lactosevrije kwark-bowl","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"vegetarisch","macros":{"eiwit_g":36.7,"ch_g":49.5,"vet_g":12.8,"kcal":462},"ingredienten":[{"item":"lactosevrije_kwark","gram":250},{"item":"havermout","gram":30},{"item":"blauwe_bessen","gram":80},{"item":"walnoten","gram":15},{"item":"honing","gram":10}],"instructies":"Combineer.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":264,"naam":"Mediterrane salade met kip (lactosevrij)","type":"lunch","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":47.7,"ch_g":56.5,"vet_g":25.4,"kcal":648},"ingredienten":[{"item":"kipfilet","gram":150},{"item":"quinoa_droog","gram":70},{"item":"tomaat","gram":150},{"item":"komkommer","gram":100},{"item":"olijven_groen","gram":30},{"item":"olijfolie","gram":15},{"item":"rucola","gram":40}],"instructies":"Kook quinoa. Bak kip. Combineer met groenten, olijven en olie.","kooktijd_min":22,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":265,"naam":"Aziatische zalm met soja en rijst (lactosevrij)","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":49.4,"ch_g":81.9,"vet_g":37.2,"kcal":860},"ingredienten":[{"item":"zalm_vers","gram":200},{"item":"rijst_jasmine_droog","gram":90},{"item":"bok_choi","gram":150},{"item":"soyasaus","gram":10},{"item":"sesamolie","gram":10},{"item":"honing","gram":10}],"instructies":"Bak zalm in soja+honing. Kook rijst. Stoom bok choi.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":266,"naam":"Lactosevrije recovery shake","type":"post_workout","keuken":"belgisch_nederlands","eiwit_niveau":"veganistisch","macros":{"eiwit_g":43.7,"ch_g":55.5,"vet_g":11.0,"kcal":505},"ingredienten":[{"item":"soyamelk_ongezoet","gram":400},{"item":"soja_eiwitpoeder","gram":30},{"item":"banaan","gram":1},{"item":"havermout","gram":40}],"instructies":"Mix in blender.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":267,"naam":"Lactosevrije kwark met chia en bessen","type":"pre_bed","keuken":"belgisch_nederlands","eiwit_niveau":"veganistisch","macros":{"eiwit_g":36.4,"ch_g":26.8,"vet_g":13.3,"kcal":368},"ingredienten":[{"item":"lactosevrije_kwark","gram":250},{"item":"chiazaad","gram":15},{"item":"frambozen","gram":60},{"item":"amandelen","gram":15}],"instructies":"Combineer. Laat 5 min staan voor chia.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":268,"naam":"Spek met roerei en volkorenbrood","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":31.1,"ch_g":38.9,"vet_g":19.1,"kcal":457},"ingredienten":[{"item":"ei","gram":3},{"item":"kalkoenspek","gram":50},{"item":"volkoren_brood","gram":80},{"item":"tomaat","gram":100},{"item":"olijfolie","gram":5}],"instructies":"Bak kalkoenspek krokant. Klop eieren, scramble. Eet met geroosterd brood en tomaat.","kooktijd_min":10,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":"Klassiek vol-eiwit ontbijt"},{"id":269,"naam":"Volkorenbrood met kalkoenfilet en kaas","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":37.7,"ch_g":44.9,"vet_g":15.2,"kcal":479},"ingredienten":[{"item":"volkoren_brood","gram":100},{"item":"kalkoenfilet","gram":80},{"item":"harde_kaas","gram":30},{"item":"ei","gram":1},{"item":"komkommer","gram":80}],"instructies":"Beleg sneetjes met kalkoen en kaas. Top met hardgekookt ei.","kooktijd_min":10,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":270,"naam":"Engels ontbijt light: spek, ei en bonen","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":41.1,"ch_g":54.5,"vet_g":14.8,"kcal":513},"ingredienten":[{"item":"ei","gram":3},{"item":"kalkoenspek","gram":60},{"item":"zwarte_bonen_gekookt","gram":100},{"item":"tomaat","gram":100},{"item":"volkoren_brood","gram":60}],"instructies":"Bak spek + ei + tomaat. Verwarm bonen met cumin. Eet met brood.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":271,"naam":"Tonijnsalade-broodje (ontbijt)","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":44.2,"ch_g":46.1,"vet_g":9.2,"kcal":458},"ingredienten":[{"item":"volkoren_brood","gram":100},{"item":"tonijn_blik_water","gram":100},{"item":"ei","gram":2},{"item":"komkommer","gram":80},{"item":"magere_kwark","gram":30}],"instructies":"Meng tonijn met kwark. Beleg brood. Top met ei en komkommer.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":272,"naam":"Rosbief-broodje met mosterd","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":31.5,"ch_g":46.6,"vet_g":8.4,"kcal":400},"ingredienten":[{"item":"volkoren_brood","gram":100},{"item":"rundsbiefstuk_mager","gram":80},{"item":"rucola","gram":30},{"item":"tomaat","gram":80},{"item":"mosterd","gram":5}],"instructies":"Beleg brood met rosbief, rucola, tomaat. Smeer beetje mosterd.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":"Klassieker met punch"},{"id":273,"naam":"Zalmwafels (ontbijt)","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":26.6,"ch_g":40.7,"vet_g":19.3,"kcal":436},"ingredienten":[{"item":"rijstwafels","gram":40},{"item":"zalm_vers","gram":80},{"item":"avocado","gram":50},{"item":"magere_kwark","gram":50},{"item":"komkommer","gram":60}],"instructies":"Smeer kwark op rijstwafels. Top met zalm, avocado en komkommer.","kooktijd_min":4,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":274,"naam":"Italiaans ontbijt: prosciutto met meloen en brood","type":"ontbijt","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":33.1,"ch_g":56.1,"vet_g":13.1,"kcal":472},"ingredienten":[{"item":"ham_mager","gram":80},{"item":"ciabatta","gram":80},{"item":"ricotta","gram":60},{"item":"perzik","gram":100},{"item":"rucola","gram":30}],"instructies":"Beleg brood met ham, ricotta, plakjes perzik en rucola.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":"Mediterraan elegant"},{"id":275,"naam":"Spaanse ham met ei en tomaat","type":"ontbijt","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":30.8,"ch_g":49.8,"vet_g":21.8,"kcal":519},"ingredienten":[{"item":"ham_mager","gram":60},{"item":"ei","gram":3},{"item":"tomaat","gram":150},{"item":"ciabatta","gram":80},{"item":"olijfolie","gram":10}],"instructies":"Bak ei. Toast brood. Wrijf in met tomaat + olijfolie. Beleg met ham en ei.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":276,"naam":"Tonijn-ciabatta met olijven","type":"ontbijt","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":40.8,"ch_g":58.5,"vet_g":11.9,"kcal":511},"ingredienten":[{"item":"ciabatta","gram":100},{"item":"tonijn_blik_water","gram":120},{"item":"olijven_groen","gram":30},{"item":"tomaat","gram":80},{"item":"rucola","gram":30},{"item":"olijfolie","gram":5}],"instructies":"Beleg ciabatta met tonijn, olijven, tomaat en rucola.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":277,"naam":"Aziatisch ontbijt: kip-rijst-bowl","type":"ontbijt","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":31.8,"ch_g":48.9,"vet_g":9.8,"kcal":413},"ingredienten":[{"item":"kipfilet","gram":100},{"item":"rijst_jasmine_droog","gram":60},{"item":"ei","gram":1},{"item":"bok_choi","gram":80},{"item":"soyasaus","gram":5},{"item":"sesamolie","gram":5}],"instructies":"Kook rijst (kan dag eerder). Bak kip met soja. Top met sunny-side ei en bok choi.","kooktijd_min":18,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Hartig ontbijt"},{"id":278,"naam":"Tonijn-rijstkom met sesam (Japans-style)","type":"ontbijt","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":36.9,"ch_g":54.5,"vet_g":11.9,"kcal":468},"ingredienten":[{"item":"tonijn_blik_water","gram":120},{"item":"rijst_jasmine_droog","gram":60},{"item":"avocado","gram":50},{"item":"komkommer","gram":60},{"item":"sesamzaad","gram":5},{"item":"soyasaus","gram":5}],"instructies":"Kook rijst. Top met tonijn, avocado, komkommer en sesam.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":279,"naam":"Mexicaanse roerei met kalkoen en bonen","type":"ontbijt","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":38.1,"ch_g":60.1,"vet_g":22.1,"kcal":566},"ingredienten":[{"item":"ei","gram":3},{"item":"kalkoenspek","gram":50},{"item":"zwarte_bonen_gekookt","gram":100},{"item":"tortillawrap_mais","gram":60},{"item":"avocado","gram":50},{"item":"salsa_verde","gram":20}],"instructies":"Bak kalkoenspek. Klop eieren, scramble met bonen. Eet met tortilla, avocado en salsa.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":280,"naam":"Burrito-ontbijt met kip","type":"ontbijt","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":42.4,"ch_g":40.0,"vet_g":25.4,"kcal":548},"ingredienten":[{"item":"wrap_volkoren","gram":60},{"item":"kipfilet","gram":100},{"item":"ei","gram":2},{"item":"paprika","gram":80},{"item":"avocado","gram":50},{"item":"harde_kaas","gram":25}],"instructies":"Bak kip + ei + paprika. Vul wrap met alles + kaas + avocado.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":281,"naam":"Indiase kip-curry brood (ontbijt)","type":"ontbijt","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":42.1,"ch_g":46.2,"vet_g":9.5,"kcal":443},"ingredienten":[{"item":"kipfilet","gram":120},{"item":"naan_brood","gram":80},{"item":"yoghurt_natuur","gram":80},{"item":"ei","gram":1},{"item":"ui","gram":30}],"instructies":"Bak kip met curry-kruiden + ui. Eet met naan en yoghurt en hardgekookt ei.","kooktijd_min":15,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":282,"naam":"Shawarma-ontbijt met pita en ei","type":"ontbijt","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":41.7,"ch_g":50.3,"vet_g":15.7,"kcal":507},"ingredienten":[{"item":"shoarmavlees_kip","gram":100},{"item":"pita_volkoren","gram":80},{"item":"ei","gram":2},{"item":"yoghurt_natuur","gram":60},{"item":"tomaat","gram":80}],"instructies":"Bak shoarmavlees. Bak ei. Vul pita met vlees, ei, yoghurt en tomaat.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":283,"naam":"Libanese ontbijtbowl met halloumi en ei","type":"ontbijt","keuken":"midden_oosters","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":37.9,"ch_g":51.6,"vet_g":34.2,"kcal":656},"ingredienten":[{"item":"halloumi","gram":100},{"item":"ei","gram":2},{"item":"pita_volkoren","gram":80},{"item":"tomaat","gram":100},{"item":"olijven_groen","gram":20},{"item":"rucola","gram":30}],"instructies":"Grill halloumi. Bak ei. Combineer in bowl met groenten en pita.","kooktijd_min":10,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":284,"naam":"Kipfilet met rijstwafels en kwark","type":"snack","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":37.8,"ch_g":29.8,"vet_g":2.7,"kcal":302},"ingredienten":[{"item":"kipfilet","gram":100},{"item":"rijstwafels","gram":30},{"item":"magere_kwark","gram":100},{"item":"komkommer","gram":50}],"instructies":"Snij kipfilet. Smeer kwark op rijstwafels. Top met kip en komkommer.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Hoog-eiwit snack"},{"id":285,"naam":"Volkoren broodje met rosbief","type":"snack","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":22.0,"ch_g":27.9,"vet_g":5.6,"kcal":258},"ingredienten":[{"item":"volkoren_brood","gram":60},{"item":"rundsbiefstuk_mager","gram":60},{"item":"rucola","gram":20},{"item":"tomaat","gram":50}],"instructies":"Beleg brood met rosbief, rucola en tomaat.","kooktijd_min":4,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":286,"naam":"Tonijnsalade in komkommer-bootjes","type":"snack","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":35.0,"ch_g":6.8,"vet_g":3.8,"kcal":208},"ingredienten":[{"item":"tonijn_blik_water","gram":100},{"item":"magere_kwark","gram":50},{"item":"komkommer","gram":150},{"item":"ei","gram":1}],"instructies":"Meng tonijn met kwark. Hol komkommer uit, vul met mengsel. Top met gehakt ei.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Lichte high-protein"},{"id":287,"naam":"Kalkoenrolletjes met kaas en avocado","type":"snack","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":36.3,"ch_g":20.1,"vet_g":16.8,"kcal":374},"ingredienten":[{"item":"kalkoenfilet","gram":120},{"item":"harde_kaas","gram":30},{"item":"avocado","gram":40},{"item":"rijstwafels","gram":20}],"instructies":"Rol kalkoen rond kaas en avocado. Eet met rijstwafels.","kooktijd_min":4,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":288,"naam":"Bresaola-bord met ricotta en olijven","type":"snack","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":28.1,"ch_g":24.8,"vet_g":14.6,"kcal":345},"ingredienten":[{"item":"ham_mager","gram":80},{"item":"ricotta","gram":60},{"item":"olijven_groen","gram":25},{"item":"ciabatta","gram":40}],"instructies":"Beleg bord met dunne plakjes ham, ricotta-quenelle, olijven en brood.","kooktijd_min":4,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":289,"naam":"Ansjovis op ciabatta met tomaat","type":"snack","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":14.7,"ch_g":35.8,"vet_g":9.4,"kcal":290},"ingredienten":[{"item":"ansjovis_blik","gram":30},{"item":"ciabatta","gram":60},{"item":"tomaat","gram":100},{"item":"olijfolie","gram":5}],"instructies":"Toast ciabatta. Top met tomaat, ansjovis en druppels olie.","kooktijd_min":4,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":290,"naam":"Edamame met gerookte tonijn","type":"snack","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":38.5,"ch_g":14.2,"vet_g":9.8,"kcal":297},"ingredienten":[{"item":"edamame","gram":150},{"item":"tonijn_blik_water","gram":80},{"item":"sesamzaad","gram":3}],"instructies":"Stoom edamame. Combineer met tonijn en sesam. Snufje zout.","kooktijd_min":7,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":291,"naam":"Kip-rijstwafels met sesam (Aziatisch)","type":"snack","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":22.4,"ch_g":28.7,"vet_g":9.6,"kcal":285},"ingredienten":[{"item":"kipfilet","gram":80},{"item":"rijstwafels","gram":30},{"item":"avocado","gram":40},{"item":"sesamzaad","gram":3},{"item":"soyasaus","gram":3}],"instructies":"Bak kip met soja. Smeer avocado op rijstwafels. Top met kip en sesam.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":292,"naam":"Mexicaanse kip-tortilla","type":"snack","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":28.3,"ch_g":30.0,"vet_g":11.2,"kcal":321},"ingredienten":[{"item":"kipfilet","gram":100},{"item":"tortillawrap_mais","gram":50},{"item":"avocado","gram":50},{"item":"salsa_verde","gram":20}],"instructies":"Bak kip in plakjes. Vul tortilla met kip, avocado, salsa.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":293,"naam":"Tandoori-kip met yoghurt-dip","type":"snack","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":32.0,"ch_g":5.0,"vet_g":3.1,"kcal":181},"ingredienten":[{"item":"kipfilet","gram":120},{"item":"yoghurt_natuur","gram":80},{"item":"komkommer","gram":60}],"instructies":"Bak kip met tandoori-kruiden. Maak raita met yoghurt + komkommer.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":294,"naam":"Shoarmawrap mini","type":"snack","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":33.0,"ch_g":37.8,"vet_g":10.1,"kcal":374},"ingredienten":[{"item":"shoarmavlees_kip","gram":100},{"item":"pita_volkoren","gram":60},{"item":"yoghurt_natuur","gram":50},{"item":"tomaat","gram":60}],"instructies":"Bak shoarma. Vul mini-pita met vlees, yoghurt en tomaat.","kooktijd_min":10,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":295,"naam":"Recovery: dubbele kip met aardappel","type":"post_workout","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":55.7,"ch_g":70.0,"vet_g":13.7,"kcal":635},"ingredienten":[{"item":"kipfilet","gram":200},{"item":"aardappel","gram":350},{"item":"boontjes","gram":150},{"item":"olijfolie","gram":10}],"instructies":"Kook aardappel. Bak kip flink. Stoom boontjes.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":296,"naam":"Recovery: rosbief-rijst-bowl","type":"post_workout","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":54.8,"ch_g":84.0,"vet_g":17.1,"kcal":722},"ingredienten":[{"item":"rundsbiefstuk_mager","gram":180},{"item":"rijst_basmati_droog","gram":100},{"item":"paprika","gram":100},{"item":"olijfolie","gram":5}],"instructies":"Bak rosbief medium-rare in plakjes. Kook rijst. Voeg paprika toe.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":297,"naam":"Recovery: rundvlees met udon","type":"post_workout","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":58.8,"ch_g":70.8,"vet_g":16.9,"kcal":679},"ingredienten":[{"item":"rundsbiefstuk_mager","gram":180},{"item":"udonnoedels_droog","gram":90},{"item":"bok_choi","gram":100},{"item":"soyasaus","gram":8},{"item":"sesamolie","gram":5}],"instructies":"Bak rundvlees in plakjes. Kook udon. Stoom bok choi met sesam en soja.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":298,"naam":"Recovery: gehakt-rijst-bowl Mexicaans","type":"post_workout","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":54.8,"ch_g":108.0,"vet_g":10.8,"kcal":753},"ingredienten":[{"item":"rundsgehakt_5pct","gram":180},{"item":"rijst_basmati_droog","gram":100},{"item":"zwarte_bonen_gekookt","gram":100},{"item":"paprika","gram":100}],"instructies":"Bak gehakt met taco-kruiden. Kook rijst. Combineer met bonen en paprika.","kooktijd_min":22,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":299,"naam":"Recovery: tonijn-pasta met olijfolie","type":"post_workout","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":59.1,"ch_g":72.8,"vet_g":19.0,"kcal":707},"ingredienten":[{"item":"pasta_volkoren_droog","gram":100},{"item":"tonijn_blik_water","gram":180},{"item":"knoflook","gram":5},{"item":"olijfolie","gram":15},{"item":"rucola","gram":30}],"instructies":"Kook pasta. Bak knoflook in olie. Voeg tonijn toe. Combineer met rucola.","kooktijd_min":15,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":300,"naam":"Pre-workout: havermout met whey en banaan","type":"pre_workout","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":34.7,"ch_g":75.0,"vet_g":9.1,"kcal":525},"ingredienten":[{"item":"havermout","gram":60},{"item":"halfvolle_melk","gram":200},{"item":"whey_concentraat","gram":25},{"item":"banaan","gram":1}],"instructies":"Kook havermout met melk. Mix whey er door. Top met banaan.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":"Eiwit + CH combo"},{"id":301,"naam":"Pre-workout: lactosevrij — havermout met sojamelk","type":"pre_workout","keuken":"belgisch_nederlands","eiwit_niveau":"vegetarisch","macros":{"eiwit_g":17.4,"ch_g":77.4,"vet_g":9.1,"kcal":464},"ingredienten":[{"item":"havermout","gram":60},{"item":"soyamelk_ongezoet","gram":250},{"item":"banaan","gram":1},{"item":"honing","gram":15}],"instructies":"Kook havermout met sojamelk. Top met banaan en honing.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":"Lactosevrij pre-workout"},{"id":302,"naam":"Pre-workout Aziatisch: rijst met kip en honing","type":"pre_workout","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":23.7,"ch_g":63.0,"vet_g":1.9,"kcal":366},"ingredienten":[{"item":"rijst_jasmine_droog","gram":70},{"item":"kipfilet","gram":80},{"item":"honing","gram":10},{"item":"soyasaus","gram":5}],"instructies":"Kook rijst. Bak kip kort met soja en honing. Combineer.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Voor wie liever hartig pre-workout eet"},{"id":303,"naam":"Pre-bed: kalkoenfilet met cottage cheese","type":"pre_bed","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":36.6,"ch_g":17.1,"vet_g":17.1,"kcal":369},"ingredienten":[{"item":"kalkoenfilet","gram":80},{"item":"cottage_cheese","gram":150},{"item":"walnoten","gram":15},{"item":"appel","gram":0.5}],"instructies":"Snij kalkoen + appel-blokjes. Combineer met cottage cheese en walnoten.","kooktijd_min":4,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Hoog-eiwit pre-bed"},{"id":304,"naam":"Pre-bed lactosevrij: tonijn met avocado","type":"pre_bed","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":30.5,"ch_g":25.5,"vet_g":23.4,"kcal":416},"ingredienten":[{"item":"tonijn_blik_water","gram":100},{"item":"avocado","gram":80},{"item":"walnoten","gram":15},{"item":"rijstwafels","gram":20}],"instructies":"Meng tonijn met avocado. Eet met rijstwafels en walnoten.","kooktijd_min":4,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Vet voor langzame vertering"},{"id":305,"naam":"Pre-bed Aziatisch: tofu met sesam en avocado","type":"pre_bed","keuken":"aziatisch","eiwit_niveau":"veganistisch","macros":{"eiwit_g":25.7,"ch_g":10.1,"vet_g":29.5,"kcal":398},"ingredienten":[{"item":"tofu_naturel","gram":200},{"item":"avocado","gram":60},{"item":"sesamolie","gram":5},{"item":"sesamzaad","gram":3}],"instructies":"Snij tofu in plakjes. Top met avocado, sesam en sesamolie.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":"Vegan-vriendelijk"},{"id":306,"naam":"Salade met biefstuk en aardappel","type":"lunch","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":54.0,"ch_g":48.4,"vet_g":21.6,"kcal":620},"ingredienten":[{"item":"rundsbiefstuk_mager","gram":180},{"item":"aardappel","gram":250},{"item":"rucola","gram":50},{"item":"tomaat","gram":100},{"item":"olijfolie","gram":10}],"instructies":"Kook aardappel. Bak biefstuk medium-rare. Combineer met salade.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":307,"naam":"Kalkoen-pasta-salade","type":"lunch","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":46.7,"ch_g":71.4,"vet_g":14.6,"kcal":607},"ingredienten":[{"item":"pasta_volkoren_droog","gram":90},{"item":"kalkoenfilet","gram":150},{"item":"paprika","gram":100},{"item":"courgette","gram":80},{"item":"olijfolie","gram":10}],"instructies":"Kook pasta. Bak kalkoen + groenten. Meng koud met olie.","kooktijd_min":20,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":308,"naam":"Tonijnsalade met witte bonen en rosmarijn","type":"lunch","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":57.4,"ch_g":69.3,"vet_g":13.7,"kcal":630},"ingredienten":[{"item":"tonijn_blik_water","gram":150},{"item":"zwarte_bonen_gekookt","gram":150},{"item":"rucola","gram":40},{"item":"ciabatta","gram":60},{"item":"olijfolie","gram":10}],"instructies":"Meng tonijn + bonen + rucola + olie. Eet met brood.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":309,"naam":"Aziatische biefstuk-salade","type":"lunch","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":54.0,"ch_g":72.9,"vet_g":17.0,"kcal":681},"ingredienten":[{"item":"rundsbiefstuk_mager","gram":180},{"item":"rijstnoedels_droog","gram":80},{"item":"paprika","gram":100},{"item":"komkommer","gram":80},{"item":"sesamolie","gram":5},{"item":"soyasaus","gram":10}],"instructies":"Bak biefstuk in plakjes. Kook noedels. Combineer met groenten en saus.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":310,"naam":"Tandoori-kipsalade","type":"lunch","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":52.3,"ch_g":74.3,"vet_g":5.0,"kcal":560},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"rijst_basmati_droog","gram":80},{"item":"yoghurt_natuur","gram":80},{"item":"paprika","gram":100},{"item":"ui","gram":30}],"instructies":"Marineer kip in yoghurt + tandoori. Bak. Kook rijst. Combineer.","kooktijd_min":22,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":311,"naam":"Kipfilet met champignonsaus en aardappel","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":62.9,"ch_g":74.7,"vet_g":15.5,"kcal":701},"ingredienten":[{"item":"kipfilet","gram":200},{"item":"aardappel","gram":350},{"item":"champignons","gram":200},{"item":"ui","gram":50},{"item":"olijfolie","gram":10},{"item":"halfvolle_melk","gram":100}],"instructies":"Bak kip. Bak champignons + ui in pan. Voeg melk toe voor saus. Kook aardappel.","kooktijd_min":30,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":312,"naam":"Mosselen met aardappelfrites (mager)","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":71.8,"ch_g":84.7,"vet_g":17.5,"kcal":804},"ingredienten":[{"item":"mosselen","gram":350},{"item":"aardappel","gram":350},{"item":"ui","gram":80},{"item":"witloof","gram":100},{"item":"olijfolie","gram":10}],"instructies":"Stoof mosselen met ui en wijn-bouillon. Maak ovenfrieten. Stoom witloof.","kooktijd_min":30,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Belgisch klassiek"},{"id":313,"naam":"Kalkoenfilet met spruitjes en aardappel","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":57.8,"ch_g":77.5,"vet_g":13.9,"kcal":670},"ingredienten":[{"item":"kalkoenfilet","gram":200},{"item":"aardappel","gram":350},{"item":"spruitjes","gram":200},{"item":"olijfolie","gram":10}],"instructies":"Bak kalkoen. Kook aardappel. Stoom spruitjes.","kooktijd_min":30,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":314,"naam":"Italiaanse kipscaloppini met spaghetti","type":"diner","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":60.1,"ch_g":72.8,"vet_g":20.2,"kcal":720},"ingredienten":[{"item":"kipfilet","gram":200},{"item":"pasta_volkoren_droog","gram":100},{"item":"citroen","gram":0},{"item":"rucola","gram":30},{"item":"olijfolie","gram":15},{"item":"knoflook","gram":5}],"instructies":"Bak kip plat met citroen + knoflook. Kook pasta. Top met rucola.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":315,"naam":"Sesam-zalm met rijst en bok choi","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":51.0,"ch_g":75.9,"vet_g":39.8,"kcal":865},"ingredienten":[{"item":"zalm_vers","gram":200},{"item":"rijst_jasmine_droog","gram":90},{"item":"bok_choi","gram":200},{"item":"sesamzaad","gram":5},{"item":"sesamolie","gram":10},{"item":"soyasaus","gram":10}],"instructies":"Bak zalm met sesam-korst. Kook rijst. Stoom bok choi met sesam.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":316,"naam":"Aziatische varkenshaas met udon","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":56.5,"ch_g":74.5,"vet_g":14.2,"kcal":658},"ingredienten":[{"item":"varkenshaas","gram":200},{"item":"udonnoedels_droog","gram":90},{"item":"bok_choi","gram":150},{"item":"knoflook","gram":5},{"item":"oestersaus","gram":10},{"item":"sesamolie","gram":5}],"instructies":"Bak varkenshaas in plakjes met knoflook + oestersaus. Kook udon. Stoom bok choi.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":317,"naam":"Mexicaanse rundvlees-bowl met avocado","type":"diner","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":69.3,"ch_g":103.0,"vet_g":25.7,"kcal":912},"ingredienten":[{"item":"rundsbiefstuk_mager","gram":200},{"item":"rijst_basmati_droog","gram":90},{"item":"zwarte_bonen_gekookt","gram":100},{"item":"avocado","gram":80},{"item":"salsa_verde","gram":30},{"item":"limoen","gram":1}],"instructies":"Bak biefstuk. Kook rijst. Combineer met bonen, avocado, salsa, limoen.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":318,"naam":"Indiase kip met linzen en rijst","type":"diner","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":69.2,"ch_g":105.9,"vet_g":35.5,"kcal":1020},"ingredienten":[{"item":"kipfilet","gram":200},{"item":"rode_linzen_droog","gram":60},{"item":"rijst_basmati_droog","gram":80},{"item":"ui","gram":50},{"item":"kokosmelk_blik","gram":100},{"item":"ghee","gram":10}],"instructies":"Bak kip + ui. Kook linzen apart in kokosmelk + curry. Combineer met rijst.","kooktijd_min":35,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":319,"naam":"Lamsspies met couscous en yoghurt","type":"diner","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":68.2,"ch_g":79.3,"vet_g":28.8,"kcal":868},"ingredienten":[{"item":"lamsvlees_mager","gram":200},{"item":"couscous_droog","gram":90},{"item":"paprika","gram":100},{"item":"ui","gram":50},{"item":"yoghurt_natuur","gram":100},{"item":"olijfolie","gram":10}],"instructies":"Rijg lamsvlees + groenten. Bak. Kook couscous. Maak yoghurt-saus.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":320,"naam":"Ghanees pap met pindakaas en banaan","type":"ontbijt","keuken":"afrikaans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":22.2,"ch_g":91.2,"vet_g":18.3,"kcal":618},"ingredienten":[{"item":"havermout","gram":70},{"item":"halfvolle_melk","gram":200},{"item":"pindakaas_100pct","gram":20},{"item":"banaan","gram":1},{"item":"honing","gram":10}],"instructies":"Ghanees ontbijt-klassieker. Romig, eiwit-rijk, snel klaar.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":"Hartig variant: voeg snufje zout toe"},{"id":321,"naam":"Akara-bol (Nigeriaans bonenontbijt)","type":"ontbijt","keuken":"afrikaans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":26.1,"ch_g":69.8,"vet_g":17.8,"kcal":537},"ingredienten":[{"item":"zwarte_bonen_gekookt","gram":150},{"item":"ei","gram":2},{"item":"ui","gram":50},{"item":"paprika","gram":60},{"item":"olijfolie","gram":10},{"item":"volkoren_brood","gram":60}],"instructies":"Beanballetjes — typisch ontbijt in Nigeria, hoog in eiwit en vezels.","kooktijd_min":18,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":"Vervang ei door bakpoeder voor vegan"},{"id":322,"naam":"Zoete aardappel-pap met yoghurt","type":"ontbijt","keuken":"afrikaans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":22.0,"ch_g":57.2,"vet_g":7.7,"kcal":384},"ingredienten":[{"item":"zoete_aardappel","gram":200},{"item":"griekse_yoghurt_0pct","gram":150},{"item":"pindakaas_100pct","gram":15},{"item":"kaneel","gram":0},{"item":"honing","gram":10}],"instructies":"West-Afrikaanse twist op pap. Vol energie voor trainingsdagen.","kooktijd_min":15,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":323,"naam":"Senegalese melkrijst met dadels","type":"ontbijt","keuken":"afrikaans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":15.6,"ch_g":72.8,"vet_g":11.8,"kcal":450},"ingredienten":[{"item":"rijst_basmati_droog","gram":50},{"item":"halfvolle_melk","gram":250},{"item":"dadels","gram":25},{"item":"amandelen","gram":15},{"item":"kaneel","gram":0}],"instructies":"Sombi — Senegalese rijstpap. Comfort food met eiwit.","kooktijd_min":20,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":324,"naam":"Ghanees ei-omelet met tomaat en chili","type":"ontbijt","keuken":"afrikaans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":17.7,"ch_g":43.3,"vet_g":18.2,"kcal":411},"ingredienten":[{"item":"ei","gram":3},{"item":"tomaat","gram":100},{"item":"ui","gram":50},{"item":"scotch_bonnet_peper","gram":5},{"item":"volkoren_brood","gram":80},{"item":"olijfolie","gram":8}],"instructies":"Pittige ochtend-omelet. Pas chili-hoeveelheid aan op smaak.","kooktijd_min":10,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":"Klassieker bij Ghanees ontbijt"},{"id":325,"naam":"Senegalese kip-yassa","type":"lunch","keuken":"afrikaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":49.4,"ch_g":79.1,"vet_g":14.2,"kcal":639},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"rijst_basmati_droog","gram":80},{"item":"ui","gram":100},{"item":"citroen","gram":1},{"item":"mosterd","gram":10},{"item":"olijfolie","gram":10}],"instructies":"Yassa — kip in mosterd-citroen-uiensaus. Senegalese keuken-icoon.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Marineer kip 30 min in citroen-mosterd voor beste smaak"},{"id":326,"naam":"Jollof-rijst met kip","type":"lunch","keuken":"afrikaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":50.5,"ch_g":85.5,"vet_g":14.2,"kcal":677},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"rijst_basmati_droog","gram":90},{"item":"passata_tomatensaus","gram":100},{"item":"paprika","gram":80},{"item":"ui","gram":50},{"item":"olijfolie","gram":10}],"instructies":"West-Afrikaanse rijst-klassieker. Eén-pansgerecht, ideaal voor batch-cooking.","kooktijd_min":28,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Nigeriaanse en Ghanese versies bestaan — beide werken"},{"id":327,"naam":"Nigeriaanse pepper-soep met vis","type":"lunch","keuken":"afrikaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":43.3,"ch_g":68.2,"vet_g":3.5,"kcal":473},"ingredienten":[{"item":"kabeljauw","gram":200},{"item":"rijst_basmati_droog","gram":70},{"item":"ui","gram":80},{"item":"tomaat","gram":100},{"item":"nigeriaanse_pepersoep_kruiden","gram":5},{"item":"scotch_bonnet_peper","gram":5}],"instructies":"Pittige bouillon met vis. Geliefd bij hoesten/verkoudheid in Nigeria.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":328,"naam":"Egusi-stoofpot met kip en spinazie","type":"lunch","keuken":"afrikaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":60.0,"ch_g":71.1,"vet_g":29.8,"kcal":797},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"zonnebloempitten","gram":30},{"item":"spinazie","gram":200},{"item":"tomaat","gram":100},{"item":"ui","gram":50},{"item":"olijfolie","gram":10},{"item":"rijst_basmati_droog","gram":70}],"instructies":"Egusi gebruikt normaal meloenzaden — hier vervangen door zonnebloempitten. Hoog in eiwit en gezond vet.","kooktijd_min":28,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":329,"naam":"Ghanees rijst met aubergine-saus","type":"lunch","keuken":"afrikaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":41.1,"ch_g":85.4,"vet_g":19.0,"kcal":674},"ingredienten":[{"item":"rundsgehakt_5pct","gram":150},{"item":"aubergine","gram":200},{"item":"rijst_basmati_droog","gram":80},{"item":"ui","gram":50},{"item":"knoflook","gram":5},{"item":"passata_tomatensaus","gram":80},{"item":"olijfolie","gram":10}],"instructies":"Aubergine-stoofpot — vegan-vriendelijk te maken door rundsgehakt te vervangen door bonen.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":330,"naam":"Senegalese tonijn-rijstbowl (Thieboudienne-light)","type":"lunch","keuken":"afrikaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":46.3,"ch_g":84.7,"vet_g":12.8,"kcal":646},"ingredienten":[{"item":"tonijn_blik_water","gram":150},{"item":"rijst_basmati_droog","gram":80},{"item":"wortel","gram":100},{"item":"aubergine","gram":100},{"item":"ui","gram":50},{"item":"tomatenpuree","gram":20},{"item":"olijfolie","gram":10}],"instructies":"Light-versie van Senegal's nationale gerecht. Snelle weeklunch.","kooktijd_min":22,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Voor traditioneel: gebruik verse vis i.p.v. blik"},{"id":331,"naam":"Marokkaanse kip-tagine met pruimen","type":"diner","keuken":"afrikaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":62.7,"ch_g":88.5,"vet_g":24.6,"kcal":831},"ingredienten":[{"item":"kipfilet","gram":200},{"item":"ras_el_hanout","gram":5},{"item":"ui","gram":100},{"item":"dadels","gram":20},{"item":"amandelen","gram":20},{"item":"couscous_droog","gram":80},{"item":"olijfolie","gram":10}],"instructies":"Klassieke tagine — zoet-hartig met diepe smaak.","kooktijd_min":35,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":"Lange stoof = nog beter; kan ook in slow-cooker"},{"id":332,"naam":"Ethiopische doro wat (kip-stoof) met injera","type":"diner","keuken":"afrikaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":56.0,"ch_g":44.9,"vet_g":17.6,"kcal":568},"ingredienten":[{"item":"kipfilet","gram":200},{"item":"ei","gram":1},{"item":"berbere_kruiden","gram":8},{"item":"ui","gram":100},{"item":"ghee","gram":10},{"item":"injera","gram":100},{"item":"knoflook","gram":5}],"instructies":"Ethiopische nationale gerecht. Berbere geeft de pittige diepe smaak.","kooktijd_min":35,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Hardgekookt ei is essentieel onderdeel"},{"id":333,"naam":"West-Afrikaanse pinda-stoof met kip","type":"diner","keuken":"afrikaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":58.7,"ch_g":110.8,"vet_g":18.9,"kcal":850},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"pindakaas_100pct","gram":30},{"item":"zoete_aardappel","gram":200},{"item":"tomaat","gram":100},{"item":"ui","gram":50},{"item":"rijst_basmati_droog","gram":70},{"item":"knoflook","gram":5}],"instructies":"Mafé/groundnut stew. Romige pindasaus, comfort food en eiwit-rijk.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Pindakaas zonder suiker/zout gebruiken"},{"id":334,"naam":"Bobotie (Zuid-Afrikaans gehakt)","type":"diner","keuken":"afrikaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":55.5,"ch_g":100.4,"vet_g":16.2,"kcal":772},"ingredienten":[{"item":"rundsgehakt_5pct","gram":200},{"item":"ei","gram":2},{"item":"rozijnen","gram":25},{"item":"ui","gram":80},{"item":"kerrie","gram":0},{"item":"appel","gram":0.5},{"item":"rijst_basmati_droog","gram":80}],"instructies":"Zuid-Afrikaanse gehaktschotel met fruitige kerrie-toets. Wordt afgebakken in oven.","kooktijd_min":45,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Eieren bovenop bakken voor traditionele afwerking"},{"id":335,"naam":"Ghanese vis-stoofpot (Light-soup)","type":"diner","keuken":"afrikaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":45.7,"ch_g":81.6,"vet_g":13.4,"kcal":620},"ingredienten":[{"item":"kabeljauw","gram":200},{"item":"tomaat","gram":150},{"item":"okra","gram":100},{"item":"ui","gram":50},{"item":"rijst_basmati_droog","gram":80},{"item":"olijfolie","gram":10},{"item":"knoflook","gram":5}],"instructies":"Lichte vis-tomatensoep met okra. Past goed bij rijst.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":336,"naam":"Senegalese lamsvleesstoof met couscous","type":"diner","keuken":"afrikaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":71.8,"ch_g":102.3,"vet_g":30.8,"kcal":986},"ingredienten":[{"item":"lamsvlees_mager","gram":200},{"item":"couscous_droog","gram":80},{"item":"wortel","gram":100},{"item":"ui","gram":80},{"item":"ras_el_hanout","gram":5},{"item":"kikkererwten_gekookt","gram":100},{"item":"olijfolie","gram":10}],"instructies":"Stoof met lam, peulvruchten en couscous. Eiwit-rijk hersteldiner.","kooktijd_min":40,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":337,"naam":"Ghanees jollof met biefstuk","type":"diner","keuken":"afrikaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":61.4,"ch_g":87.2,"vet_g":23.5,"kcal":816},"ingredienten":[{"item":"rundsbiefstuk_mager","gram":200},{"item":"rijst_basmati_droog","gram":90},{"item":"passata_tomatensaus","gram":100},{"item":"paprika","gram":80},{"item":"ui","gram":50},{"item":"knoflook","gram":5},{"item":"olijfolie","gram":10}],"instructies":"Premium-versie met rundsbiefstuk. Mooie mix CH + eiwit.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":338,"naam":"Ethiopische linzen-stoof (Misir wat)","type":"diner","keuken":"afrikaans","eiwit_niveau":"veganistisch","macros":{"eiwit_g":30.3,"ch_g":102.7,"vet_g":13.2,"kcal":648},"ingredienten":[{"item":"rode_linzen_droog","gram":90},{"item":"berbere_kruiden","gram":8},{"item":"ui","gram":100},{"item":"knoflook","gram":5},{"item":"tomaat","gram":100},{"item":"injera","gram":100},{"item":"olijfolie","gram":10}],"instructies":"Vegan Ethiopisch. Linzen + berbere = explosie van smaak en eiwit.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":"Linzen langzaam gaar maken voor diepere smaak"},{"id":339,"naam":"Kenyaanse Ugali met sukuma wiki","type":"diner","keuken":"afrikaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":60.5,"ch_g":69.7,"vet_g":22.6,"kcal":761},"ingredienten":[{"item":"polenta_droog","gram":80},{"item":"rundsbiefstuk_mager","gram":180},{"item":"spinazie","gram":200},{"item":"ui","gram":50},{"item":"tomaat","gram":80},{"item":"olijfolie","gram":10}],"instructies":"Ugali (maïspap) met sukuma wiki (groene bladgroenten) — basis Oost-Afrikaans diner.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":340,"naam":"Plantain-chips met yoghurt-dip","type":"snack","keuken":"afrikaans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":12.1,"ch_g":53.0,"vet_g":0.6,"kcal":244},"ingredienten":[{"item":"plantain_gekookt","gram":150},{"item":"griekse_yoghurt_0pct","gram":100},{"item":"knoflook","gram":3},{"item":"limoen","gram":0.5}],"instructies":"Geroosterde plantain (groene banaan) met yoghurt-dip.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":341,"naam":"Marokkaanse dadels met amandelen en yoghurt","type":"snack","keuken":"afrikaans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":14.7,"ch_g":30.9,"vet_g":10.1,"kcal":256},"ingredienten":[{"item":"dadels","gram":30},{"item":"amandelen","gram":20},{"item":"griekse_yoghurt_0pct","gram":100},{"item":"kaneel","gram":0}],"instructies":"Snelle high-protein snack, mooi in verzadiging en mineralen.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":342,"naam":"Recovery: Ghanese kip-jollof","type":"post_workout","keuken":"afrikaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":55.8,"ch_g":93.3,"vet_g":14.6,"kcal":734},"ingredienten":[{"item":"kipfilet","gram":200},{"item":"rijst_basmati_droog","gram":100},{"item":"passata_tomatensaus","gram":100},{"item":"paprika","gram":80},{"item":"ui","gram":50},{"item":"olijfolie","gram":10}],"instructies":"Volle herstel-bowl met klassieke West-Afrikaanse smaak.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":343,"naam":"Recovery: Senegalese pinda-rijst","type":"post_workout","keuken":"afrikaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":57.9,"ch_g":119.2,"vet_g":16.4,"kcal":860},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"rijst_basmati_droog","gram":100},{"item":"pindakaas_100pct","gram":25},{"item":"zoete_aardappel","gram":150},{"item":"ui","gram":50},{"item":"knoflook","gram":5}],"instructies":"Romige pindasaus + dubbele CH bron — perfect na zware sessie.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":344,"naam":"Boekweit-pannenkoeken met magere kwark en blauwe bessen","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":23.5,"ch_g":50.6,"vet_g":2.3,"kcal":324},"ingredienten":[{"item":"boekweit_pannenkoek","gram":80},{"item":"magere_kwark","gram":150},{"item":"blauwe_bessen","gram":100},{"item":"honing","gram":10}],"instructies":"Bak boekweitpannenkoeken (zelfgemaakt of kant-en-klaar). Beleg met kwark, bessen en honing.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":"Boekweit is glutenvrij ondanks de naam - geen tarwe!"},{"id":345,"naam":"Glutenvrije havermout met banaan en pindakaas","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":23.9,"ch_g":85.3,"vet_g":19.0,"kcal":610},"ingredienten":[{"item":"gv_havermout","gram":70},{"item":"halfvolle_melk","gram":250},{"item":"banaan","gram":1},{"item":"pindakaas_100pct","gram":20}],"instructies":"Kook GV-havermout met melk. Top met banaan en pindakaas.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":"Gebruik gecertificeerd GV-havermout (geen kruiscontaminatie)"},{"id":346,"naam":"Ei-rijstkoek-stack met avocado","type":"ontbijt","keuken":"aziatisch","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":13.9,"ch_g":36.2,"vet_g":20.6,"kcal":367},"ingredienten":[{"item":"ei","gram":3},{"item":"rijstwafels","gram":30},{"item":"avocado","gram":80},{"item":"tomaat","gram":100}],"instructies":"Bak roerei. Stapel op rijstwafels met avocado-puree en tomaat.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":347,"naam":"Mexicaanse ontbijt-bowl met mais-tortilla","type":"ontbijt","keuken":"mexicaans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":22.5,"ch_g":49.4,"vet_g":18.4,"kcal":434},"ingredienten":[{"item":"ei","gram":3},{"item":"zwarte_bonen_gekookt","gram":100},{"item":"avocado","gram":60},{"item":"tortilla_mais_klein","gram":2},{"item":"salsa_verde","gram":25}],"instructies":"Bak ei. Verwarm bonen + mais-tortillas. Combineer met avocado en salsa.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":348,"naam":"Rijstpap met dadels en amandelen","type":"ontbijt","keuken":"midden_oosters","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":15.6,"ch_g":72.8,"vet_g":11.8,"kcal":450},"ingredienten":[{"item":"rijst_basmati_droog","gram":50},{"item":"halfvolle_melk","gram":250},{"item":"dadels","gram":25},{"item":"amandelen","gram":15},{"item":"kaneel","gram":0}],"instructies":"Kook rijst in melk tot rijstpap-textuur (~25 min). Top met dadels en amandelen.","kooktijd_min":25,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":349,"naam":"Quinoa-bowl met yoghurt en granaatappel","type":"ontbijt","keuken":"midden_oosters","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":26.5,"ch_g":64.2,"vet_g":13.9,"kcal":476},"ingredienten":[{"item":"quinoa_droog","gram":60},{"item":"griekse_yoghurt_0pct","gram":150},{"item":"granaatappel","gram":50},{"item":"walnoten","gram":15},{"item":"honing","gram":10}],"instructies":"Kook quinoa (kan dag van tevoren). Combineer met yoghurt, granaatappelpitjes, walnoten, honing.","kooktijd_min":18,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":350,"naam":"Linzenpasta met tonijn en olijfolie","type":"lunch","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":63.8,"ch_g":56.1,"vet_g":18.8,"kcal":665},"ingredienten":[{"item":"linzenpasta_droog","gram":100},{"item":"tonijn_blik_water","gram":150},{"item":"olijfolie","gram":15},{"item":"knoflook","gram":5},{"item":"rucola","gram":40}],"instructies":"Kook linzenpasta (5-7 min, korter dan gewone pasta). Bak knoflook in olie. Voeg tonijn toe. Combineer met rucola.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Linzenpasta = 25g eiwit/100g, glutenvrij + supersnel"},{"id":351,"naam":"Rijst-kip-bowl Mexicaans met salsa","type":"lunch","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":57.6,"ch_g":93.4,"vet_g":13.3,"kcal":713},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"rijst_basmati_droog","gram":80},{"item":"zwarte_bonen_gekookt","gram":100},{"item":"avocado","gram":60},{"item":"salsa_verde","gram":30},{"item":"limoen","gram":0.5}],"instructies":"Kook rijst. Bak kip met taco-kruiden. Combineer met bonen, avocado en salsa.","kooktijd_min":22,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":352,"naam":"Boekweit-noedelsalade met zalm en sesam","type":"lunch","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":42.5,"ch_g":60.8,"vet_g":29.2,"kcal":683},"ingredienten":[{"item":"zalm_vers","gram":150},{"item":"boekweitpasta_droog","gram":80},{"item":"komkommer","gram":80},{"item":"sesamzaad","gram":5},{"item":"sesamolie","gram":5},{"item":"soyasaus","gram":8}],"instructies":"Kook soba (boekweit-noedels). Bak of stoom zalm. Combineer met komkommer, sesam en saus.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Echte 100% boekweit-soba is glutenvrij; lees label (sommige bevatten tarwe)"},{"id":353,"naam":"Polenta-bowl met gegrilde kip en tomaat","type":"lunch","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":51.0,"ch_g":76.3,"vet_g":14.1,"kcal":657},"ingredienten":[{"item":"polenta_droog","gram":90},{"item":"kipfilet","gram":180},{"item":"tomaat","gram":150},{"item":"rucola","gram":30},{"item":"olijfolie","gram":10},{"item":"knoflook","gram":5}],"instructies":"Kook polenta met water (3:1). Bak kip met knoflook. Combineer met tomaat en rucola.","kooktijd_min":25,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":354,"naam":"Sushi-bowl met tonijn en avocado (deconstructed)","type":"lunch","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":46.3,"ch_g":71.2,"vet_g":13.9,"kcal":590},"ingredienten":[{"item":"tonijn_blik_water","gram":150},{"item":"rijst_basmati_droog","gram":80},{"item":"avocado","gram":60},{"item":"komkommer","gram":60},{"item":"sesamzaad","gram":5},{"item":"soyasaus","gram":8}],"instructies":"Kook rijst. Combineer met tonijn, avocado, komkommer. Top met sesam en soja (gebruik tamari voor 100% GV).","kooktijd_min":18,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Tamari = glutenvrije sojasaus"},{"id":355,"naam":"Kikkererwtenpasta-salade met feta en tomaat","type":"lunch","keuken":"mediterraans","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":30.9,"ch_g":63.3,"vet_g":31.9,"kcal":647},"ingredienten":[{"item":"kikkererwtenpasta_droog","gram":90},{"item":"feta","gram":60},{"item":"tomaat","gram":150},{"item":"olijven_groen","gram":30},{"item":"rucola","gram":40},{"item":"olijfolie","gram":10}],"instructies":"Kook kikkererwtenpasta. Combineer koud met feta, tomaat, olijven en rucola.","kooktijd_min":12,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":"Kikkererwtenpasta = 22g eiwit/100g, hoog vezel"},{"id":356,"naam":"Ghanees jollof met biefstuk (GV-versie)","type":"lunch","keuken":"afrikaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":61.4,"ch_g":87.2,"vet_g":23.5,"kcal":816},"ingredienten":[{"item":"rundsbiefstuk_mager","gram":200},{"item":"rijst_basmati_droog","gram":90},{"item":"passata_tomatensaus","gram":100},{"item":"paprika","gram":80},{"item":"ui","gram":50},{"item":"knoflook","gram":5},{"item":"olijfolie","gram":10}],"instructies":"Bak biefstuk medium-rare. Kook rijst met passata + kruiden. Combineer.","kooktijd_min":28,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":357,"naam":"Aardappel-tonijnsalade met yoghurt","type":"lunch","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":54.6,"ch_g":49.8,"vet_g":4.5,"kcal":472},"ingredienten":[{"item":"aardappel","gram":250},{"item":"tonijn_blik_water","gram":150},{"item":"griekse_yoghurt_0pct","gram":80},{"item":"ei","gram":1},{"item":"ui","gram":30},{"item":"rucola","gram":30}],"instructies":"Kook aardappelen. Snij koud in blokjes. Meng met tonijn, yoghurt-mosterd-saus en hardgekookt ei.","kooktijd_min":25,"batch_geschikt":true,"tags":{"lactosevrij":false,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":358,"naam":"Aziatische rundvleesrijst met groenten (GV)","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":62.4,"ch_g":80.2,"vet_g":18.5,"kcal":746},"ingredienten":[{"item":"rundsbiefstuk_mager","gram":200},{"item":"rijst_basmati_droog","gram":90},{"item":"bok_choi","gram":150},{"item":"paprika","gram":80},{"item":"knoflook","gram":5},{"item":"sesamolie","gram":5},{"item":"soyasaus","gram":10}],"instructies":"Bak rundvlees in plakjes. Kook rijst. Stoom bok choi en paprika. Maak saus met soja, sesam en knoflook.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Tamari i.p.v. sojasaus voor 100% GV"},{"id":359,"naam":"Quinoa-vis-bowl met groene asperges","type":"diner","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":53.7,"ch_g":70.8,"vet_g":17.7,"kcal":642},"ingredienten":[{"item":"kabeljauw","gram":200},{"item":"quinoa_droog","gram":90},{"item":"asperges","gram":200},{"item":"citroen","gram":0.5},{"item":"olijfolie","gram":10},{"item":"knoflook","gram":5}],"instructies":"Kook quinoa. Bak kabeljauw kort met citroen. Stoom asperges. Combineer.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":360,"naam":"Indiase kip-curry met basmati (GV)","type":"diner","keuken":"indisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":58.1,"ch_g":80.4,"vet_g":35.4,"kcal":878},"ingredienten":[{"item":"kipfilet","gram":200},{"item":"rijst_basmati_droog","gram":90},{"item":"kokosmelk_blik","gram":100},{"item":"ui","gram":50},{"item":"knoflook","gram":5},{"item":"currypoeder","gram":0},{"item":"olijfolie","gram":10},{"item":"spinazie","gram":100}],"instructies":"Fruit ui + knoflook. Voeg kip + currypoeder toe. Kokosmelk erbij + spinazie. Sudderen 15 min. Eet met rijst.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":361,"naam":"Mexicaanse rundvlees-rijst-bowl","type":"diner","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":59.5,"ch_g":105.0,"vet_g":19.4,"kcal":828},"ingredienten":[{"item":"rundsgehakt_5pct","gram":200},{"item":"rijst_basmati_droog","gram":90},{"item":"zwarte_bonen_gekookt","gram":100},{"item":"paprika","gram":80},{"item":"avocado","gram":50},{"item":"salsa_verde","gram":30}],"instructies":"Bak gehakt met taco-kruiden. Kook rijst. Combineer met bonen, paprika, avocado, salsa.","kooktijd_min":25,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":362,"naam":"Aardappel-zalm-traybake","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":50.4,"ch_g":75.2,"vet_g":41.8,"kcal":879},"ingredienten":[{"item":"zalm_vers","gram":200},{"item":"aardappel","gram":350},{"item":"boontjes","gram":150},{"item":"olijfolie","gram":15},{"item":"citroen","gram":0.5},{"item":"knoflook","gram":5}],"instructies":"Snij aardappelen in blokjes. Rooster 25 min op 200°C met olie. Voeg zalm + boontjes laatste 12 min toe. Top met citroen.","kooktijd_min":40,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Eén-pansgerecht, weinig afwas"},{"id":363,"naam":"Polenta met champignons en spinazie","type":"diner","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":60.2,"ch_g":84.2,"vet_g":14.9,"kcal":737},"ingredienten":[{"item":"polenta_droog","gram":100},{"item":"kipfilet","gram":180},{"item":"champignons","gram":200},{"item":"spinazie","gram":150},{"item":"olijfolie","gram":10},{"item":"knoflook","gram":5}],"instructies":"Kook polenta. Bak kip + champignons + knoflook. Voeg spinazie toe (slinkt). Combineer.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":364,"naam":"Boekweit-noedels met garnalen en bok choi","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":55.0,"ch_g":71.1,"vet_g":9.8,"kcal":597},"ingredienten":[{"item":"garnalen_gepeld","gram":200},{"item":"boekweitpasta_droog","gram":90},{"item":"bok_choi","gram":150},{"item":"knoflook","gram":5},{"item":"sesamolie","gram":5},{"item":"soyasaus","gram":10}],"instructies":"Kook soba. Bak garnalen met knoflook. Stoom bok choi. Combineer met saus.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":365,"naam":"Linzen-curry met basmati","type":"diner","keuken":"indisch","eiwit_niveau":"veganistisch","macros":{"eiwit_g":38.0,"ch_g":134.1,"vet_g":23.5,"kcal":900},"ingredienten":[{"item":"rode_linzen_droog","gram":100},{"item":"rijst_basmati_droog","gram":80},{"item":"ui","gram":80},{"item":"kokosmelk_blik","gram":100},{"item":"currypoeder","gram":0},{"item":"spinazie","gram":150}],"instructies":"Fruit ui. Voeg linzen + kokosmelk + curry toe. Sudderen 20 min. Spinazie laatste 5 min. Eet met rijst.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":"Vegan-vriendelijk, hoog eiwit + vezel"},{"id":366,"naam":"Tilapia met zoete aardappel en broccoli","type":"diner","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":53.2,"ch_g":73.6,"vet_g":15.2,"kcal":642},"ingredienten":[{"item":"tilapia","gram":200},{"item":"zoete_aardappel","gram":300},{"item":"broccoli","gram":200},{"item":"olijfolie","gram":10},{"item":"citroen","gram":0.5}],"instructies":"Rooster zoete aardappel-blokjes 25 min op 200°C. Bak tilapia 4 min/kant. Stoom broccoli.","kooktijd_min":35,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":367,"naam":"Polenta-bowl met linzen-stoofpot (vegan)","type":"diner","keuken":"mediterraans","eiwit_niveau":"veganistisch","macros":{"eiwit_g":30.2,"ch_g":128.8,"vet_g":12.3,"kcal":759},"ingredienten":[{"item":"polenta_droog","gram":90},{"item":"rode_linzen_droog","gram":80},{"item":"tomaat","gram":150},{"item":"ui","gram":50},{"item":"knoflook","gram":5},{"item":"olijfolie","gram":10},{"item":"rucola","gram":30}],"instructies":"Kook polenta. Stoof linzen met tomaat, ui, knoflook (~20 min). Top polenta met linzen-stoof en rucola.","kooktijd_min":28,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":368,"naam":"Rijstwafels met avocado en zalm-blokjes","type":"snack","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":19.6,"ch_g":29.7,"vet_g":20.3,"kcal":370},"ingredienten":[{"item":"rijstwafels","gram":30},{"item":"avocado","gram":60},{"item":"zalm_vers","gram":80},{"item":"limoen","gram":0.3}],"instructies":"Smeer avocado op rijstwafels. Top met zalm-blokjes en druppel limoen.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":369,"naam":"Hardgekookt ei met rijstcrackers en hummus","type":"snack","keuken":"midden_oosters","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":13.2,"ch_g":40.5,"vet_g":12.8,"kcal":321},"ingredienten":[{"item":"ei","gram":2},{"item":"rijstcrackers","gram":30},{"item":"kikkererwten_gekookt","gram":50},{"item":"olijfolie","gram":5},{"item":"citroen","gram":0.3}],"instructies":"Kook ei 8 min. Maak snelle hummus (kikkererwten + olie + citroen). Eet met rijstcrackers.","kooktijd_min":10,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":370,"naam":"Mais-tortilla wrap met kalkoen","type":"snack","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":26.1,"ch_g":22.6,"vet_g":8.9,"kcal":271},"ingredienten":[{"item":"tortilla_mais_klein","gram":2},{"item":"kalkoenfilet","gram":100},{"item":"avocado","gram":40},{"item":"salsa_verde","gram":20}],"instructies":"Vul tortillas met kalkoenplakjes, avocado en salsa.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":371,"naam":"Banaan met rijstwafels en honing","type":"pre_workout","keuken":"belgisch_nederlands","eiwit_niveau":"vegetarisch","macros":{"eiwit_g":3.7,"ch_g":60.1,"vet_g":1.3,"kcal":258},"ingredienten":[{"item":"banaan","gram":1},{"item":"rijstwafels","gram":30},{"item":"honing","gram":10}],"instructies":"Smeer honing op rijstwafels. Eet met banaan. Snelle CH, geen vet/vezel.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":"1u voor training - lichte verteerbaarheid"},{"id":372,"naam":"Recovery: rijst met biefstuk en groenten (GV)","type":"post_workout","keuken":"belgisch_nederlands","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":59.3,"ch_g":91.5,"vet_g":22.7,"kcal":820},"ingredienten":[{"item":"rundsbiefstuk_mager","gram":180},{"item":"rijst_basmati_droog","gram":100},{"item":"paprika","gram":100},{"item":"broccoli","gram":150},{"item":"olijfolie","gram":10}],"instructies":"Bak biefstuk medium-rare. Kook rijst. Stoom groenten.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":373,"naam":"Recovery shake met rijst-eiwit en banaan (GV+LV)","type":"post_workout","keuken":"belgisch_nederlands","eiwit_niveau":"vegetarisch","macros":{"eiwit_g":27.9,"ch_g":53.5,"vet_g":4.4,"kcal":365},"ingredienten":[{"item":"ricepoeder_eiwit","gram":30},{"item":"banaan","gram":1},{"item":"havermelk_ongezoet","gram":250},{"item":"honing","gram":10}],"instructies":"Mix alles in blender. Klaar in 60 sec. Glutenvrij + lactosevrij.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":"Ideaal voor coeliakie + lactose-intolerant tegelijk"},{"id":374,"naam":"Havermout met sojamelk en aardbeien (LV)","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"vegetarisch","macros":{"eiwit_g":21.2,"ch_g":63.0,"vet_g":17.2,"kcal":494},"ingredienten":[{"item":"havermout","gram":70},{"item":"soyamelk_ongezoet","gram":250},{"item":"aardbeien","gram":100},{"item":"amandelen","gram":15},{"item":"honing","gram":10}],"instructies":"Kook havermout met sojamelk. Top met aardbeien, amandelen en honing.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":375,"naam":"Tofu-scramble met spinazie en tomaat","type":"ontbijt","keuken":"aziatisch","eiwit_niveau":"veganistisch","macros":{"eiwit_g":30.7,"ch_g":13.4,"vet_g":25.0,"kcal":406},"ingredienten":[{"item":"tofu_naturel","gram":200},{"item":"spinazie","gram":100},{"item":"tomaat","gram":100},{"item":"ui","gram":30},{"item":"kurkuma","gram":0},{"item":"voedingsgist","gram":5},{"item":"olijfolie","gram":10}],"instructies":"Brokkel tofu in pan. Voeg ui, kurkuma, voedingsgist toe (= ei-smaak). Bak tomaat en spinazie mee.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":"Voedingsgist geeft 'kaasige' umami-smaak zonder zuivel"},{"id":376,"naam":"Smoothie-bowl met sojayoghurt en granola","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"vegetarisch","macros":{"eiwit_g":14.1,"ch_g":55.4,"vet_g":14.6,"kcal":398},"ingredienten":[{"item":"soyayoghurt","gram":200},{"item":"banaan","gram":1},{"item":"blauwe_bessen","gram":80},{"item":"amandelen","gram":20},{"item":"honing","gram":10}],"instructies":"Mix banaan + bessen + helft sojayoghurt in blender. Schenk in bowl. Top met andere helft yoghurt en amandelen.","kooktijd_min":6,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":377,"naam":"Roerei met avocado en volkorenbrood (LV)","type":"ontbijt","keuken":"belgisch_nederlands","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":18.5,"ch_g":44.6,"vet_g":20.6,"kcal":429},"ingredienten":[{"item":"ei","gram":3},{"item":"volkoren_brood","gram":80},{"item":"avocado","gram":70},{"item":"tomaat","gram":100}],"instructies":"Bak roerei met klein beetje olie (geen boter). Beleg brood met avocado, tomaat en roerei.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":378,"naam":"Marokkaanse pannenkoek met tahini en honing","type":"ontbijt","keuken":"midden_oosters","eiwit_niveau":"zuivel_ei","macros":{"eiwit_g":21.9,"ch_g":81.2,"vet_g":22.2,"kcal":605},"ingredienten":[{"item":"ei","gram":2},{"item":"havermout","gram":60},{"item":"soyamelk_ongezoet","gram":100},{"item":"tahini","gram":20},{"item":"honing","gram":15},{"item":"banaan","gram":1}],"instructies":"Mix havermout, ei, sojamelk tot beslag. Bak pannenkoeken. Top met tahini, honing, banaan.","kooktijd_min":12,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":379,"naam":"Tonijnsalade met witte bonen (LV)","type":"lunch","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":53.6,"ch_g":45.5,"vet_g":12.9,"kcal":502},"ingredienten":[{"item":"tonijn_blik_water","gram":150},{"item":"zwarte_bonen_gekookt","gram":150},{"item":"rucola","gram":50},{"item":"tomaat","gram":100},{"item":"olijfolie","gram":10},{"item":"citroen","gram":0.5}],"instructies":"Meng alles in een kom. Eet met volkorenbrood of crackers.","kooktijd_min":6,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":380,"naam":"Aziatische tofu-rijst-bowl met edamame","type":"lunch","keuken":"aziatisch","eiwit_niveau":"veganistisch","macros":{"eiwit_g":48.0,"ch_g":80.3,"vet_g":27.2,"kcal":740},"ingredienten":[{"item":"tofu_gerookt","gram":180},{"item":"rijst_basmati_droog","gram":80},{"item":"edamame","gram":100},{"item":"paprika","gram":80},{"item":"sesamolie","gram":5},{"item":"soyasaus","gram":10}],"instructies":"Kook rijst. Bak tofu in plakjes. Stoom edamame en paprika. Combineer.","kooktijd_min":18,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":381,"naam":"Mexicaanse zwarte bonen-bowl (vegan, LV)","type":"lunch","keuken":"mexicaans","eiwit_niveau":"veganistisch","macros":{"eiwit_g":26.0,"ch_g":122.2,"vet_g":11.3,"kcal":669},"ingredienten":[{"item":"zwarte_bonen_gekookt","gram":200},{"item":"rijst_basmati_droog","gram":80},{"item":"avocado","gram":60},{"item":"paprika","gram":80},{"item":"salsa_verde","gram":30},{"item":"limoen","gram":0.5}],"instructies":"Verwarm bonen met taco-kruiden. Kook rijst. Combineer met avocado, paprika, salsa.","kooktijd_min":18,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":382,"naam":"Vietnamese pho-style soep met kip","type":"lunch","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":49.3,"ch_g":72.7,"vet_g":3.8,"kcal":536},"ingredienten":[{"item":"kipfilet","gram":180},{"item":"rijstnoedels_droog","gram":80},{"item":"bok_choi","gram":100},{"item":"ui","gram":50},{"item":"knoflook","gram":5},{"item":"gember_pasta","gram":0},{"item":"soyasaus","gram":10}],"instructies":"Maak bouillon met ui, knoflook, gember. Voeg kip + noedels + bok choi toe. Sudderen 12 min.","kooktijd_min":20,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":383,"naam":"Lentilsoep met kurkuma en koriander","type":"lunch","keuken":"midden_oosters","eiwit_niveau":"veganistisch","macros":{"eiwit_g":27.5,"ch_g":80.5,"vet_g":11.4,"kcal":531},"ingredienten":[{"item":"rode_linzen_droog","gram":100},{"item":"ui","gram":80},{"item":"wortel","gram":100},{"item":"knoflook","gram":5},{"item":"kurkuma","gram":0},{"item":"olijfolie","gram":10},{"item":"citroen","gram":0.5}],"instructies":"Fruit ui + knoflook. Voeg linzen + wortel + 750ml water + kurkuma toe. Sudderen 25 min. Pureer eventueel deels. Citroen erbij voor opserveren.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":"Vegan, hoog eiwit + vezel + ijzer"},{"id":384,"naam":"Sushi-bowl met zalm (LV)","type":"lunch","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":38.8,"ch_g":71.2,"vet_g":31.9,"kcal":718},"ingredienten":[{"item":"zalm_vers","gram":150},{"item":"rijst_basmati_droog","gram":80},{"item":"avocado","gram":60},{"item":"komkommer","gram":60},{"item":"sesamzaad","gram":5},{"item":"soyasaus","gram":8}],"instructies":"Kook rijst (sushi-rijst beter). Snij zalm in blokjes. Combineer met avocado, komkommer, soja en sesam.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":385,"naam":"Aziatische zalm met udon en bok choi","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":54.0,"ch_g":74.6,"vet_g":32.3,"kcal":803},"ingredienten":[{"item":"zalm_vers","gram":200},{"item":"udonnoedels_droog","gram":90},{"item":"bok_choi","gram":200},{"item":"knoflook","gram":5},{"item":"sesamolie","gram":5},{"item":"soyasaus","gram":10}],"instructies":"Bak zalm 4 min/kant. Kook udon. Stoom bok choi. Combineer met saus.","kooktijd_min":22,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":386,"naam":"Indiase tofu-curry met kokosmelk","type":"diner","keuken":"indisch","eiwit_niveau":"veganistisch","macros":{"eiwit_g":42.1,"ch_g":85.4,"vet_g":49.9,"kcal":958},"ingredienten":[{"item":"tofu_naturel","gram":250},{"item":"rijst_basmati_droog","gram":90},{"item":"kokosmelk_blik","gram":100},{"item":"ui","gram":50},{"item":"knoflook","gram":5},{"item":"currypoeder","gram":0},{"item":"spinazie","gram":100},{"item":"olijfolie","gram":10}],"instructies":"Fruit ui + knoflook. Voeg tofu + curry + kokosmelk toe. Sudderen 15 min. Spinazie laatste 5 min.","kooktijd_min":25,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":"Vegan, romig, eiwit-rijk"},{"id":387,"naam":"Tagine met kip en olijven (LV)","type":"diner","keuken":"midden_oosters","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":58.7,"ch_g":72.1,"vet_g":18.0,"kcal":697},"ingredienten":[{"item":"kipfilet","gram":200},{"item":"couscous_droog","gram":80},{"item":"ui","gram":80},{"item":"olijven_groen","gram":30},{"item":"citroen","gram":0.5},{"item":"ras_el_hanout","gram":5},{"item":"olijfolie","gram":10}],"instructies":"Stoof kip met ui, olijven, citroen, ras el hanout in beetje water. 25 min sudderen. Eet met couscous.","kooktijd_min":35,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":388,"naam":"Mexicaanse vis-tacos met avocado","type":"diner","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":43.1,"ch_g":39.3,"vet_g":13.2,"kcal":432},"ingredienten":[{"item":"kabeljauw","gram":200},{"item":"tortilla_mais_klein","gram":3},{"item":"avocado","gram":60},{"item":"rode_kool","gram":80},{"item":"limoen","gram":0.5},{"item":"salsa_verde","gram":25}],"instructies":"Bak kabeljauw kort. Verwarm tortillas. Vul met vis, avocado, kool, salsa, limoen.","kooktijd_min":18,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":389,"naam":"Vegan chili sin carne","type":"diner","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":36.3,"ch_g":158.6,"vet_g":5.6,"kcal":807},"ingredienten":[{"item":"zwarte_bonen_gekookt","gram":200},{"item":"kikkererwten_gekookt","gram":100},{"item":"rundsgehakt_5pct","gram":0},{"item":"tomaat","gram":200},{"item":"paprika","gram":100},{"item":"ui","gram":80},{"item":"rijst_basmati_droog","gram":80}],"instructies":"Fruit ui + paprika. Voeg bonen, kikkererwten, gehakte tomaten toe. Chili-kruiden + cumin. Sudderen 20 min. Eet met rijst.","kooktijd_min":30,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":"Volledig vegan, hoog vezel + eiwit"},{"id":390,"naam":"Italiaanse pasta met tonijn en olijven (LV)","type":"diner","keuken":"mediterraans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":52.1,"ch_g":76.1,"vet_g":22.1,"kcal":714},"ingredienten":[{"item":"pasta_volkoren_droog","gram":100},{"item":"tonijn_blik_water","gram":150},{"item":"olijven_groen","gram":30},{"item":"knoflook","gram":5},{"item":"olijfolie","gram":15},{"item":"rucola","gram":30},{"item":"citroen","gram":0.3}],"instructies":"Kook pasta. Bak knoflook in olie. Voeg tonijn + olijven + citroen toe. Combineer met pasta en rucola.","kooktijd_min":15,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":391,"naam":"Aziatische rundvlees-noedels met sesam","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":61.5,"ch_g":75.0,"vet_g":23.4,"kcal":756},"ingredienten":[{"item":"rundsbiefstuk_mager","gram":180},{"item":"soba_noedels_droog","gram":90},{"item":"paprika","gram":100},{"item":"knoflook","gram":5},{"item":"sesamolie","gram":8},{"item":"soyasaus","gram":10},{"item":"sesamzaad","gram":5}],"instructies":"Bak rundvlees in plakjes. Kook noedels. Stoof paprika met knoflook. Combineer met sesamsaus.","kooktijd_min":20,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":false,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":392,"naam":"Salmon-teriyaki met rijst","type":"diner","keuken":"aziatisch","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":52.3,"ch_g":88.3,"vet_g":27.5,"kcal":813},"ingredienten":[{"item":"zalm_vers","gram":200},{"item":"rijst_basmati_droog","gram":90},{"item":"broccoli","gram":150},{"item":"soyasaus","gram":15},{"item":"honing","gram":10},{"item":"knoflook","gram":5}],"instructies":"Maak marinade: soja + honing + knoflook. Marineer zalm 10 min. Bak. Kook rijst. Stoom broccoli.","kooktijd_min":25,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""},{"id":393,"naam":"Hummus met komkommer en wortel","type":"snack","keuken":"midden_oosters","eiwit_niveau":"veganistisch","macros":{"eiwit_g":13.4,"ch_g":42.7,"vet_g":11.4,"kcal":313},"ingredienten":[{"item":"kikkererwten_gekookt","gram":100},{"item":"tahini","gram":15},{"item":"citroen","gram":0.3},{"item":"knoflook","gram":3},{"item":"komkommer","gram":100},{"item":"wortel","gram":80}],"instructies":"Pureer kikkererwten met tahini, citroen, knoflook. Eet met komkommer- en wortelreepjes.","kooktijd_min":8,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":394,"naam":"Edamame met zeezout","type":"snack","keuken":"aziatisch","eiwit_niveau":"veganistisch","macros":{"eiwit_g":24.5,"ch_g":18.7,"vet_g":11.5,"kcal":267},"ingredienten":[{"item":"edamame","gram":200},{"item":"sesamzaad","gram":3}],"instructies":"Stoom edamame 5 min. Bestrooi met zeezout en sesam. Eet uit de peulen.","kooktijd_min":7,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":395,"naam":"Banaan met pindakaas en chia","type":"snack","keuken":"belgisch_nederlands","eiwit_niveau":"veganistisch","macros":{"eiwit_g":7.2,"ch_g":33.7,"vet_g":11.9,"kcal":258},"ingredienten":[{"item":"banaan","gram":1},{"item":"pindakaas_100pct","gram":20},{"item":"chiazaad","gram":5}],"instructies":"Snij banaan in plakjes. Top met pindakaas en chia.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":396,"naam":"Pre-bed: tofu met avocado en sesam (LV)","type":"pre_bed","keuken":"aziatisch","eiwit_niveau":"veganistisch","macros":{"eiwit_g":27.3,"ch_g":26.3,"vet_g":30.1,"kcal":474},"ingredienten":[{"item":"tofu_naturel","gram":200},{"item":"avocado","gram":60},{"item":"sesamolie","gram":5},{"item":"sesamzaad","gram":3},{"item":"rijstwafels","gram":20}],"instructies":"Snij tofu in plakjes. Top met avocado, sesam, sesamolie. Eet met rijstwafels.","kooktijd_min":5,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":"Tragere vertering door vet, alternatief voor caseïne pre-bed"},{"id":397,"naam":"Pre-bed: amandel-soja-shake (LV)","type":"pre_bed","keuken":"belgisch_nederlands","eiwit_niveau":"veganistisch","macros":{"eiwit_g":15.8,"ch_g":20.3,"vet_g":19.6,"kcal":310},"ingredienten":[{"item":"soyamelk_ongezoet","gram":300},{"item":"amandelpasta","gram":25},{"item":"banaan","gram":0.5}],"instructies":"Mix alles. Sojaeiwit is langzaam vergelijkbaar met caseïne. Vet uit amandelen vertraagt verder.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":true},"notitie":""},{"id":398,"naam":"Sojayoghurt met walnoten en honing (LV)","type":"pre_bed","keuken":"belgisch_nederlands","eiwit_niveau":"vegetarisch","macros":{"eiwit_g":11.0,"ch_g":15.0,"vet_g":17.0,"kcal":250},"ingredienten":[{"item":"soyayoghurt","gram":200},{"item":"walnoten","gram":20},{"item":"honing","gram":10}],"instructies":"Combineer in bowl. Walnoten = magnesium voor slaap.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":399,"naam":"Recovery: erwten-eiwit-shake met banaan (LV+GV)","type":"post_workout","keuken":"belgisch_nederlands","eiwit_niveau":"vegetarisch","macros":{"eiwit_g":28.4,"ch_g":56.8,"vet_g":6.4,"kcal":394},"ingredienten":[{"item":"erwten_eiwitpoeder","gram":30},{"item":"banaan","gram":1},{"item":"havermelk_ongezoet","gram":300},{"item":"honing","gram":10}],"instructies":"Mix in blender. Erwteneiwit = compleet aminozuurprofiel, lactosevrij.","kooktijd_min":3,"batch_geschikt":false,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":true,"veganistisch":false},"notitie":""},{"id":400,"naam":"Recovery: kip met rijst en bonen (LV)","type":"post_workout","keuken":"mexicaans","eiwit_niveau":"vlees_vis","macros":{"eiwit_g":64.3,"ch_g":113.8,"vet_g":12.6,"kcal":818},"ingredienten":[{"item":"kipfilet","gram":200},{"item":"rijst_basmati_droog","gram":100},{"item":"zwarte_bonen_gekookt","gram":100},{"item":"paprika","gram":100},{"item":"avocado","gram":50},{"item":"salsa_verde","gram":25}],"instructies":"Bak kip. Kook rijst. Combineer met bonen, paprika, avocado, salsa.","kooktijd_min":25,"batch_geschikt":true,"tags":{"lactosevrij":true,"glutenvrij":true,"vegetarisch":false,"veganistisch":false},"notitie":""}]};

// =============================================================================
// VERTALINGEN — NL / EN
// =============================================================================
const VERTALINGEN = {
  nl: {
    // Header
    app_titel: 'Handbal Voedingstool',
    app_subtitel: 'Wetenschappelijk onderbouwde voeding voor handbalspelers',
    btn_voeding101: '📚 Voeding 101',
    btn_hoewerkt: 'ⓘ Hoe werkt dit?',
    btn_profielen: 'Profielen',
    btn_exporteer: 'Exporteer plan',
    btn_bezig: 'Bezig...',

    // Tabs
    tab_dagschema: 'Dagschema',
    tab_weekplanning: 'Weekplanning',
    tab_boodschappen: 'Boodschappen',
    tab_recepten: 'Recepten',
    tab_tracking: 'Tracking',
    tab_supplementen: 'Supplementen',
    tab_hydratatie: 'Hydratatie',

    // Dagtype buttons
    dag_trainingsdag: 'Trainingsdag',
    dag_rustdag: 'Rustdag',
    dag_matchdag: 'Matchdag',
    dag_krachtdag: 'Krachtdag',
    dag_cardiodag: 'Cardiodag',
    dag_handbaldag: 'Handbaltraining',
    dag_kracht_handbal: 'Kracht + Handbal',
    dag_wedstrijddag: 'Wedstrijd',

    // Profiel sectie headers
    sectie_profiel: 'Jouw profiel',
    sectie_01: '01 — Persoonlijk',
    sectie_02: '02 — Trainingsbelasting',
    sectie_03: '03 — Doel',
    sectie_04: '04 — Seizoensfase',
    sectie_05: '05 — Praktisch',
    sectie_07: '07 — Niet lekker',
    sectie_08: '08 — Voorkeursingrediënten',
    sectie_09: '09 — Allergieën (EU-14)',
    sectie_10: '10 — Flex-meal (sociale context)',
    sectie_11: '11 — Budgetmodus',
    sectie_12: '12 — Seizoensfilter groenten/fruit',
    verfijn_btn: '+ Verfijn instellingen (optioneel)',

    // Profiel labels
    label_geslacht: 'Geslacht',
    label_man: 'Man',
    label_vrouw: 'Vrouw',
    label_leeftijd: 'Leeftijd',
    label_gewicht: 'Gewicht (kg)',
    label_lengte: 'Lengte (cm)',
    label_vetpct: 'Vetpercentage % (optioneel)',
    label_handbal_pw: 'Handbal-sessies per week',
    label_handbal_duur: 'Duur handbal-sessie (uren)',
    label_kracht_pw: 'Krachttraining per week',
    label_kracht_duur: 'Duur krachttraining (uren)',
    label_cardio_pw: 'Cardio / looptraining per week',
    label_cardio_duur: 'Duur cardio (uren)',
    label_cardio_toelichting: 'Bijv. duurlopen, fietsen, roeien. Telt mee voor TDEE maar weegt lichter dan handbal.',
    label_trainingmoment: 'Wanneer train je?',
    label_ochtend: 'Ochtend',
    label_middag: 'Middag',
    label_avond: 'Avond',
    label_doel: 'Doel',
    label_cut: 'Cut',
    label_cut_sub: 'Vetverlies',
    label_maintain: 'Maintain',
    label_maintain_sub: 'Behoud',
    label_bulk: 'Bulk',
    label_bulk_sub: 'Spier ↑',
    label_fase: 'Seizoensfase',
    label_off_season: 'Off-season',
    label_off_sub: 'mei-jul',
    label_pre_season: 'Pre-season',
    label_pre_sub: 'aug-sep',
    label_in_season: 'In-season',
    label_in_sub: 'okt-apr',
    label_keuken: 'Voorkeurskeuken',
    label_eetmomenten: 'Eetmomenten per dag',
    label_boodschappen: 'Boodschappen-frequentie',
    label_boodschappen_1: '1× per week',
    label_boodschappen_2: '2× per week',
    label_matchdag: 'Matchdag (dag 6 van de week)',
    label_matchtijd: 'Aanvangsuur match',
    label_matchduur: 'Duur match',
    label_quota_veg: 'Vegetarische maaltijden per week',
    label_quota_vegan: 'Vegan maaltijden per week',
    label_quota_gv: 'Glutenvrije maaltijden per week',
    label_quota_lv: 'Lactosevrije maaltijden per week',
    label_niet_lekker_toelichting: 'Komma-gescheiden. Recepten die dit ingrediënt bevatten worden volledig uitgesloten — het ingredient wordt niet uit het recept gehaald maar het recept zelf vervangen door een ander. Typ de hoofdnaam (bv. "kip" sluit alle kip-recepten uit, ook kip filet, kip soep, enz.).',
    label_voorkeuren_toelichting: 'Recepten met deze ingrediënten verschijnen significant vaker in je schema (sterke score-bonus). Combineer met ★ Favorieten voor maximaal effect.',
    label_allergie_toelichting: '🔴 Harde uitsluiting: elk recept dat een aangevinkt allergeen bevat wordt volledig verwijderd uit alle schema\'s, boodschappenlijsten en swaps — zonder uitzondering.',
    label_flex_activeer: 'Activeer 1 flex-meal per week',
    label_flex_welke_dag: 'Op welke dag?',
    label_flex_welke_maaltijd: 'Welke maaltijd?',
    label_flex_wat: 'Wat ga je eten? (optioneel)',
    label_flex_placeholder: 'bv: pizza met team, restaurant, BBQ...',
    label_budget_activeer: 'Activeer budgetmodus',
    label_seizoen_activeer: 'Geef voorrang aan seizoensgroenten/fruit (BE/NL)',
    label_mentaal_activeer: 'Ja, ik wil gewicht & herstel bijhouden',
    label_tracking_uit: 'Tracking uitschakelen',

    // Dagdoelen
    dagdoelen_titel: 'Dagdoelen',
    label_kcal_dag: 'Calorieën / dag',
    label_eiwit: 'Eiwit',
    label_kh: 'Koolhydraten',
    label_vet: 'Vet',
    label_vezels: 'Vezels',
    label_per_kg: 'g/kg',
    label_aanbevolen: 'aanbevolen',

    // Schema
    label_vervang: 'Vervang ↻',
    label_details: 'details →',
    label_kooktijd: 'kooktijd',
    label_keuken_kort: 'keuken',
    label_favoriet: '★ Favoriet',
    label_favoriet_toevoegen: '☆ Maak favoriet',
    label_blokkeer: '⏸ Blokkeer 4 weken',
    label_deblokkeer: '✕ Deblokkeer',

    // Recepten tab
    recepten_totaal: 'recepten in totaal',
    recepten_zoek: 'Zoek op naam of ingrediënt...',
    recepten_filter_type: 'Alle types',
    recepten_filter_keuken: 'Alle keukens',
    recepten_filter_eiwit: 'Alle',
    recepten_max_kooktijd: 'Max kooktijd',
    recepten_geen_limiet: 'geen limiet',
    recepten_glutenvrij: 'Glutenvrij',
    recepten_lactosevrij: 'Lactosevrij',
    recepten_alleen_fav: '★ Alleen favorieten',
    recepten_toon_blok: 'Toon geblokkeerde',
    recepten_reset: 'Reset filters',
    recepten_gevonden: 'recept(en) gevonden',

    // Boodschappen
    boodschappen_titel: 'Boodschappenlijst voor 1 week',
    boodschappen_1pw: 'Eén keer per week boodschappen; gebruik diepvriesgroenten voor de tweede helft van de week.',
    boodschappen_2pw: 'Twee keer per week; koop verse vis/vlees in twee rondes.',
    boodschappen_routing: 'Categorieën gesorteerd in supermarkt-routing-volgorde (BE/NL): groente/fruit eerst → vis/vlees → koeling → bakkerij → droge waar → diepvries → kruiden → kassa.',
    buiten_seizoen: '⚠ buiten seizoen',
    vervang_door: '🌱 vervang door:',

    // Tracking
    tracking_gewicht: 'Gewicht (kg)',
    tracking_herstel: 'Herstel-score',
    tracking_notitie: 'Notitie (optioneel)',
    tracking_log: 'Log toevoegen',
    tracking_adherence: 'Plan-adherence — laatste 7 dagen',
    adherence_gegeten: 'gegeten zoals gepland',
    adherence_afgeweken: 'afgeweken',
    adherence_totaal: 'maaltijden getrackt',

    // Wizard
    wizard_welkom: 'Welkom · Stap',
    wizard_van: 'van',
    wizard_sla_over: 'Sla over',
    wizard_stap1_titel: 'Hoi! Even voorstellen?',
    wizard_stap1_sub: 'We vragen het minimum nodig om je een goed startplan te geven. Verfijnen kan altijd later.',
    wizard_stap2_titel: 'Hoe vaak train je?',
    wizard_stap2_sub: 'We rekenen je verbruik op basis van handbal- en krachtsessies.',
    wizard_stap3_titel: 'Wat is je doel?',
    wizard_stap3_sub: 'Laatste vraag — daarna krijg je je startplan.',
    wizard_volgende: 'Volgende →',
    wizard_terug: '← Terug',
    wizard_klaar: 'Toon mijn plan ✓',

    // PDF
    pdf_gegenereerd: 'Gegenereerd door Handbal Voedingstool v5',
    pdf_disclaimer: 'Educatief karakter, geen medisch advies',
    pdf_wekschema: 'Weekschema',
    pdf_matchdag_protocol: 'Match-day protocol',
    pdf_hydratatie: 'Hydratatie-advies',
    pdf_mealprep: 'Meal-prep tips',
    pdf_dieet_tags: 'Diëet-tags',

    // Maaltijdtypes
    type_ontbijt: 'Ontbijt',
    type_lunch: 'Lunch',
    type_diner: 'Diner',
    type_snack: 'Snack',
    type_pre_workout: 'Pre-workout',
    type_post_workout: 'Post-workout',
    type_pre_bed: 'Pre-bed',

    // Dieet tags
    tag_gv: 'GV',
    tag_lv: 'LV',
    tag_vegan: 'vegan',
    tag_veg: 'veg.',
    tag_batch: 'batch',
    tag_budget: '💰 budget',

    // Match
    match_label: 'Match',
    training_label: 'Training',
    rust_label: 'Rust',

    // Micro
    micros_titel: 'Micronutriënten — kritische 4',
    micro_ijzer: 'IJzer',
    micro_vitd: 'Vit D',
    micro_mg: 'Magnesium',
    micro_ca: 'Calcium',

    // Modals
    modal_sluiten: 'Sluiten',
    modal_begrepen: 'Begrepen — aan de slag',
    bereiding_titel: '🧑‍🍳 Stap-voor-stap voor beginners',

    // Mealprep
    mealprep_titel: 'Meal-prep suggesties',
    mealprep_sub: 'Slimme tips om kooktijd te besparen op basis van je weekschema en boodschappen-frequentie.',

    // Supplementen
    supp_titel: 'Supplementen',

    // Hydratatie
    hydra_titel: 'Hydratatie',
    hydra_dag_doel: '💧 Jouw dagelijks vochtdoel',
    hydra_drinken: 'Drinken',
    hydra_voeding: 'Uit voeding',
    hydra_totaal: 'Totaal',
    hydra_glazen: 'glazen',

    // Flex days
    dag_namen: ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'],
    dag_namen_lang: ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'],
    flex_lunch: 'Lunch',
    flex_diner: 'Diner',
    flex_snack: 'Snack',
  },

  en: {
    // Header
    app_titel: 'Handball Nutrition Tool',
    app_subtitel: 'Science-based nutrition for handball players',
    btn_voeding101: '📚 Nutrition 101',
    btn_hoewerkt: 'ⓘ How does this work?',
    btn_profielen: 'Profiles',
    btn_exporteer: 'Export plan',
    btn_bezig: 'Loading...',

    // Tabs
    tab_dagschema: 'Daily Plan',
    tab_weekplanning: 'Weekly Plan',
    tab_boodschappen: 'Shopping List',
    tab_recepten: 'Recipes',
    tab_tracking: 'Tracking',
    tab_supplementen: 'Supplements',
    tab_hydratatie: 'Hydration',

    // Dagtype buttons
    dag_trainingsdag: 'Training day',
    dag_rustdag: 'Rest day',
    dag_matchdag: 'Match day',
    dag_krachtdag: 'Strength day',
    dag_cardiodag: 'Cardio day',
    dag_handbaldag: 'Handball training',
    dag_kracht_handbal: 'Strength + Handball',
    dag_wedstrijddag: 'Match / Game',

    // Profiel sectie headers
    sectie_profiel: 'Your profile',
    sectie_01: '01 — Personal',
    sectie_02: '02 — Training load',
    sectie_03: '03 — Goal',
    sectie_04: '04 — Season phase',
    sectie_05: '05 — Practical',
    sectie_07: '07 — Dislikes',
    sectie_08: '08 — Preferred ingredients',
    sectie_09: '09 — Allergies (EU-14)',
    sectie_10: '10 — Flex meal (social context)',
    sectie_11: '11 — Budget mode',
    sectie_12: '12 — Seasonal filter veg/fruit',
    verfijn_btn: '+ Advanced settings (optional)',

    // Profiel labels
    label_geslacht: 'Sex',
    label_man: 'Male',
    label_vrouw: 'Female',
    label_leeftijd: 'Age',
    label_gewicht: 'Weight (kg)',
    label_lengte: 'Height (cm)',
    label_vetpct: 'Body fat % (optional)',
    label_handbal_pw: 'Handball sessions per week',
    label_handbal_duur: 'Handball session duration (hours)',
    label_kracht_pw: 'Strength training per week',
    label_kracht_duur: 'Strength session duration (hours)',
    label_cardio_pw: 'Cardio / running sessions per week',
    label_cardio_duur: 'Cardio session duration (hours)',
    label_cardio_toelichting: 'E.g. running, cycling, rowing. Counts toward TDEE but weighted lighter than handball.',
    label_trainingmoment: 'When do you train?',
    label_ochtend: 'Morning',
    label_middag: 'Afternoon',
    label_avond: 'Evening',
    label_doel: 'Goal',
    label_cut: 'Cut',
    label_cut_sub: 'Fat loss',
    label_maintain: 'Maintain',
    label_maintain_sub: 'Maintain',
    label_bulk: 'Bulk',
    label_bulk_sub: 'Build muscle',
    label_fase: 'Season phase',
    label_off_season: 'Off-season',
    label_off_sub: 'May-Jul',
    label_pre_season: 'Pre-season',
    label_pre_sub: 'Aug-Sep',
    label_in_season: 'In-season',
    label_in_sub: 'Oct-Apr',
    label_keuken: 'Preferred cuisine',
    label_eetmomenten: 'Meals per day',
    label_boodschappen: 'Shopping frequency',
    label_boodschappen_1: '1× per week',
    label_boodschappen_2: '2× per week',
    label_matchdag: 'Match day (day 6 of the week)',
    label_matchtijd: 'Match start time',
    label_matchduur: 'Match duration',
    label_quota_veg: 'Vegetarian meals per week',
    label_quota_vegan: 'Vegan meals per week',
    label_quota_gv: 'Gluten-free meals per week',
    label_quota_lv: 'Lactose-free meals per week',
    label_niet_lekker_toelichting: 'Comma-separated. Recipes containing this ingredient are fully excluded — the ingredient is not removed from the recipe but the entire recipe is replaced. Type the main name (e.g. "chicken" excludes all chicken recipes).',
    label_voorkeuren_toelichting: 'Recipes with these ingredients appear significantly more often in your plan (strong score bonus). Combine with ★ Favourites for maximum effect.',
    label_allergie_toelichting: '🔴 Hard exclusion: any recipe containing a checked allergen is completely removed from all plans, shopping lists and swaps — without exception.',
    label_flex_activeer: 'Activate 1 flex meal per week',
    label_flex_welke_dag: 'On which day?',
    label_flex_welke_maaltijd: 'Which meal?',
    label_flex_wat: 'What will you eat? (optional)',
    label_flex_placeholder: 'e.g. pizza with team, restaurant, BBQ...',
    label_budget_activeer: 'Activate budget mode',
    label_seizoen_activeer: 'Prioritise seasonal vegetables/fruit (BE/NL)',
    label_mentaal_activeer: 'Yes, I want to track weight & recovery',
    label_tracking_uit: 'Disable tracking',

    // Dagdoelen
    dagdoelen_titel: 'Daily targets',
    label_kcal_dag: 'Calories / day',
    label_eiwit: 'Protein',
    label_kh: 'Carbohydrates',
    label_vet: 'Fat',
    label_vezels: 'Fibre',
    label_per_kg: 'g/kg',
    label_aanbevolen: 'recommended',

    // Schema
    label_vervang: 'Swap ↻',
    label_details: 'details →',
    label_kooktijd: 'cook time',
    label_keuken_kort: 'cuisine',
    label_favoriet: '★ Favourite',
    label_favoriet_toevoegen: '☆ Add favourite',
    label_blokkeer: '⏸ Block 4 weeks',
    label_deblokkeer: '✕ Unblock',

    // Recepten tab
    recepten_totaal: 'recipes in total',
    recepten_zoek: 'Search by name or ingredient...',
    recepten_filter_type: 'All types',
    recepten_filter_keuken: 'All cuisines',
    recepten_filter_eiwit: 'All',
    recepten_max_kooktijd: 'Max cook time',
    recepten_geen_limiet: 'no limit',
    recepten_glutenvrij: 'Gluten-free',
    recepten_lactosevrij: 'Lactose-free',
    recepten_alleen_fav: '★ Favourites only',
    recepten_toon_blok: 'Show blocked',
    recepten_reset: 'Reset filters',
    recepten_gevonden: 'recipe(s) found',

    // Boodschappen
    boodschappen_titel: 'Shopping list for 1 week',
    boodschappen_1pw: 'Once a week; use frozen vegetables for the second half of the week.',
    boodschappen_2pw: 'Twice a week; buy fresh fish/meat in two rounds.',
    boodschappen_routing: 'Categories sorted in supermarket routing order: produce first → fish/meat → dairy → bakery → dry goods → frozen → spices → checkout.',
    buiten_seizoen: '⚠ out of season',
    vervang_door: '🌱 replace with:',

    // Tracking
    tracking_gewicht: 'Weight (kg)',
    tracking_herstel: 'Recovery score',
    tracking_notitie: 'Note (optional)',
    tracking_log: 'Add log',
    tracking_adherence: 'Plan adherence — last 7 days',
    adherence_gegeten: 'eaten as planned',
    adherence_afgeweken: 'deviated',
    adherence_totaal: 'meals tracked',

    // Wizard
    wizard_welkom: 'Welcome · Step',
    wizard_van: 'of',
    wizard_sla_over: 'Skip',
    wizard_stap1_titel: 'Hi! Let\'s get to know you.',
    wizard_stap1_sub: 'We only ask for the minimum to give you a good starting plan. You can always refine later.',
    wizard_stap2_titel: 'How often do you train?',
    wizard_stap2_sub: 'We calculate your expenditure based on handball and strength sessions.',
    wizard_stap3_titel: 'What\'s your goal?',
    wizard_stap3_sub: 'Last question — then you\'ll get your plan.',
    wizard_volgende: 'Next →',
    wizard_terug: '← Back',
    wizard_klaar: 'Show my plan ✓',

    // PDF
    pdf_gegenereerd: 'Generated by Handball Nutrition Tool v5',
    pdf_disclaimer: 'Educational purposes only, not medical advice',
    pdf_wekschema: 'Weekly schedule',
    pdf_matchdag_protocol: 'Match-day protocol',
    pdf_hydratatie: 'Hydration advice',
    pdf_mealprep: 'Meal-prep tips',
    pdf_dieet_tags: 'Diet tags',

    // Maaltijdtypes
    type_ontbijt: 'Breakfast',
    type_lunch: 'Lunch',
    type_diner: 'Dinner',
    type_snack: 'Snack',
    type_pre_workout: 'Pre-workout',
    type_post_workout: 'Post-workout',
    type_pre_bed: 'Pre-bed',

    // Dieet tags
    tag_gv: 'GF',
    tag_lv: 'LF',
    tag_vegan: 'vegan',
    tag_veg: 'veg.',
    tag_batch: 'batch',
    tag_budget: '💰 budget',

    // Match
    match_label: 'Match',
    training_label: 'Training',
    rust_label: 'Rest',

    // Micro
    micros_titel: 'Micronutrients — critical 4',
    micro_ijzer: 'Iron',
    micro_vitd: 'Vit D',
    micro_mg: 'Magnesium',
    micro_ca: 'Calcium',

    // Modals
    modal_sluiten: 'Close',
    modal_begrepen: 'Got it — let\'s go',
    bereiding_titel: '🧑‍🍳 Step-by-step for beginners',

    // Mealprep
    mealprep_titel: 'Meal-prep suggestions',
    mealprep_sub: 'Smart tips to save cooking time based on your weekly plan and shopping frequency.',

    // Supplementen
    supp_titel: 'Supplements',

    // Hydratatie
    hydra_titel: 'Hydration',
    hydra_dag_doel: '💧 Your daily fluid target',
    hydra_drinken: 'To drink',
    hydra_voeding: 'From food',
    hydra_totaal: 'Total',
    hydra_glazen: 'glasses',

    // Flex days
    dag_namen: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    dag_namen_lang: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    flex_lunch: 'Lunch',
    flex_diner: 'Dinner',
    flex_snack: 'Snack',
  }
};

// t() helper — used throughout the component
const useT = (taal) => (key) => VERTALINGEN[taal]?.[key] ?? VERTALINGEN.nl[key] ?? key;

const KEUKEN_LABELS_NL = {
  belgisch_nederlands: 'Belgisch / Nederlands',
  mediterraans: 'Mediterraans',
  aziatisch: 'Aziatisch',
  mexicaans: 'Mexicaans / Latijns',
  indisch: 'Indisch',
  midden_oosters: 'Midden-Oosters',
  afrikaans: 'Afrikaans',
  geen: 'Geen voorkeur (mix)'
};

const KEUKEN_LABELS_EN = {
  belgisch_nederlands: 'Belgian / Dutch',
  mediterraans: 'Mediterranean',
  aziatisch: 'Asian',
  mexicaans: 'Mexican / Latin',
  indisch: 'Indian',
  midden_oosters: 'Middle Eastern',
  afrikaans: 'African',
  geen: 'No preference (mix)'
};

const MAALTIJDTYPE_LABELS = {
  nl: { ontbijt: 'Ontbijt', lunch: 'Lunch', diner: 'Diner', snack: 'Snack', pre_workout: 'Pre-workout', post_workout: 'Post-workout', pre_bed: 'Pre-bed' },
  en: { ontbijt: 'Breakfast', lunch: 'Lunch', diner: 'Dinner', snack: 'Snack', pre_workout: 'Pre-workout', post_workout: 'Post-workout', pre_bed: 'Pre-bed' }
};

const DAG_NAMEN = {
  nl: ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'],
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
};

// =============================================================================
// TOOLTIP DEFINITIES — wetenschappelijke termen met bronvermelding
// =============================================================================

const TOOLTIPS = {
  bmr: {
    titel: 'BMR — Basal Metabolic Rate',
    uitleg: 'De energie die je lichaam verbruikt in volledige rust (geen activiteit). We rekenen dit uit met de Mifflin-St Jeor-formule, die voor sporters de meest accurate is.',
    formule: 'Man: 10×kg + 6.25×cm − 5×jaar + 5\nVrouw: 10×kg + 6.25×cm − 5×jaar − 161',
    bron: 'Mifflin-St Jeor (1990); ACSM/AND/DC 2016'
  },
  pal: {
    titel: 'PAL — Physical Activity Level',
    uitleg: 'Vermenigvuldigingsfactor op je BMR die je dagelijkse activiteit weergeeft. Voor handbalspelers ligt deze tussen 1.4 (zeer rustig) en 2.0 (zeer intensief). We berekenen je PAL automatisch op basis van je trainings­volume per week.',
    formule: 'TDEE = BMR × PAL',
    bron: 'IOC 2023; ACSM/AND/DC 2016'
  },
  tdee: {
    titel: 'TDEE — Total Daily Energy Expenditure',
    uitleg: 'Je totale dagelijkse energieverbruik. BMR plus alle activiteit (training + dagelijkse activiteit). Dit is je onderhoudsniveau: eet je dit, dan blijf je gelijk in gewicht.',
    bron: 'ACSM/AND/DC 2016'
  },
  ea: {
    titel: 'EA — Energy Availability',
    uitleg: 'De hoeveelheid energie beschikbaar voor lichaamsfuncties na aftrek van trainings­energieverbruik, gedeeld door vetvrije massa. Onder 30 kcal/kg FFM/dag verhoog je het risico op RED-S sterk (vooral bij vrouwen).',
    formule: 'EA = (calorieën-inname − trainingsverbruik) ÷ FFM (kg)',
    bron: 'IOC REDs Consensus 2023 (B2)'
  },
  reds: {
    titel: 'RED-S — Relative Energy Deficiency in Sport',
    uitleg: 'Aandoening door langdurig te lage energie­beschikbaarheid. Gevolgen: hormonale verstoring, menstruatiestoornissen, botverlies, immuunproblemen, prestatie­daling. Cruciaal om te vermijden.',
    bron: 'IOC REDs Consensus Statement 2023 (B2)'
  },
  ffm: {
    titel: 'FFM — Fat-Free Mass (vetvrije massa)',
    uitleg: 'Je lichaamsgewicht minus je vetmassa. Bij onbekend vet% schatten we dit op 83% (man) of 75% (vrouw) van je gewicht — gemiddelde voor jonge atleten.',
    bron: 'ISSN 2017 (B5)'
  },
  eiwit_per_kg: {
    titel: 'Eiwit g/kg lichaamsgewicht',
    uitleg: 'Hoeveel gram eiwit per kg lichaamsgewicht je dagelijks moet eten. Voor handbalspelers: 1.6-2.0 g/kg in onderhoud/bulk, tot 2.4 g/kg tijdens cut (om spiermassa te beschermen).',
    bron: 'ISSN Position Stand 2017 (B4); Morton 2018 meta (B15)'
  },
  ch_per_kg: {
    titel: 'Koolhydraten g/kg',
    uitleg: 'Koolhydraat-inname schaalt met trainingsbelasting: 3-5 g/kg op lichte/rustdagen, 5-7 g/kg op trainingsdagen, 6-10 g/kg op zware/match-dagen. Cruciaal voor herstel en prestatie.',
    bron: 'IOC 2018; ACSM 2016 (B1); Williams (B19)'
  },
  vet_pct: {
    titel: 'Vet als % van calorieën',
    uitleg: 'Vet moet 20-35% van je dagelijkse calorieën leveren. Onder 20% kan hormoonproductie (testosteron, oestrogeen) verstoord raken; boven 35% verdringt het vaak koolhydraten en eiwit.',
    bron: 'ACSM/AND/DC 2016 (B1)'
  },
  creatine: {
    titel: 'Creatine monohydraat',
    uitleg: '3-5 g/dag, dagelijks. Geen laadfase nodig. Sterk evidence-base voor explosieve sporten zoals handbal: meer kracht, herhaalde sprints, betere recovery. Veilig bij langdurig gebruik.',
    bron: 'ISSN 2017 (B7)'
  },
  vitd: {
    titel: 'Vitamine D3',
    uitleg: '1000-2000 IE/dag oktober-april in België. Indoor-handballers hebben verhoogd deficiëntie­risico. Belangrijk voor botgezondheid, immuunsysteem en spierfunctie.',
    bron: 'IOC 2018 (B3); B22'
  },
  cafeine: {
    titel: 'Cafeïne',
    uitleg: '3-6 mg/kg, 30-60 min voor wedstrijd of zware training. Verbetert sprint, jump en kracht-uithouding. Niet na 16:00 ivm slaapverstoring. Geleidelijk introduceren.',
    bron: 'ISSN 2021 (B8)'
  },
  omega3: {
    titel: 'Omega-3 (EPA + DHA)',
    uitleg: '2-3 g EPA+DHA per dag. Vermindert spierschade en pijn na training (DOMS). Vooral nuttig als je minder dan 2× vette vis per week eet.',
    bron: 'B24'
  },
  match_carbloading: {
    titel: 'Carb loading op matchdag',
    uitleg: 'Op matchdag verhogen we koolhydraat-inname met ~1.5 g/kg extra. Dit zorgt voor maximaal gevulde spierglycogeen-voorraden = betere prestatie in 2e helft.',
    bron: 'IOC 2018; B19'
  },
  pre_workout: {
    titel: 'Pre-workout maaltijd',
    uitleg: 'CH-rijk, eiwit-licht, vet-laag, vezelarm. 1-3u voor training. Doel: snel verteerbaar, glycogeen-voorraden topvol, geen maagklachten.',
    bron: 'ACSM 2016 (B1); B6'
  },
  post_workout: {
    titel: 'Post-workout maaltijd',
    uitleg: 'Binnen 30-60 min na training: 20-40g eiwit + 1-1.2 g/kg CH. Versnelt herstel van spierglycogeen en spier­opbouw.',
    bron: 'ISSN Nutrient Timing 2017 (B6)'
  },
  pre_bed: {
    titel: 'Pre-bed (slow protein)',
    uitleg: '20-40g traag verteerbaar eiwit (caseïne, kwark) 30-60 min voor slapen. Levert aminozuren tijdens de nachtelijke vasten = betere overnight muscle protein synthesis.',
    bron: 'ISSN 2017 (B4, B6)'
  },
  fase: {
    titel: 'Seizoensfase',
    uitleg: 'Een handbalseizoen heeft duidelijk verschillende fases met andere voedingsbehoeften:\n\n• Off-season (mei-juli): hypertrofie & krachtopbouw — eiwit ↑ (2.0 g/kg), CH gemiddeld\n• Pre-season (aug-sep): aerobe & anaerobe basis, volume ↑ — kcal +5%, CH ↑\n• In-season (okt-april): prestatie + herstel rond matches — match-day-protocol cruciaal',
    bron: 'IOC 2018 (B3); ACSM 2016 (B1); Stellingwerff 2019'
  },
  vezels: {
    titel: 'Vezels',
    uitleg: 'Vezels (fiber) zijn niet-verteerbare koolhydraten met grote impact op:\n\n• Darmgezondheid & microbioom (kortketenige vetzuren-productie)\n• Verzadiging (vooral belangrijk tijdens cuts)\n• Stabiele bloedsuiker en betere CH-benutting\n• Lager risico hart- en vaatziekten\n\nDoelwaarde: 25-35g/dag voor sporters. Tijdens trainingsdagen iets minder vezelrijk vlak voor training (geen maagklachten).',
    bron: 'EFSA 2010; ACSM 2016 (B1)'
  },
  trainingsmoment: {
    titel: 'Trainingsmoment',
    uitleg: 'Wanneer je traint bepaalt hoe je voeding optimaal verdeelt over de dag:\n\n• Ochtend: pre-training ontbijt vroeg (CH-rijk), recovery-lunch met veel eiwit\n• Middag: pre-training lunch, post-training snack\n• Avond: pre-training snack rond 16-17u, post-training diner met volledig herstelpakket\n\nHet doel: glycogeen-vulling vóór en eiwit-pulse + CH-aanvulling ná training.',
    bron: 'ISSN nutrient timing 2017 (B6); ACSM 2016 (B1)'
  },
  micros: {
    titel: 'Micronutriënten',
    uitleg: 'De 4 meest kritische micros voor handbalspelers:\n\n• IJzer (Fe): zuurstoftransport, kritisch voor vrouwen — 18 mg/dag (premenopauzaal). Bronnen: rood vlees, mosselen, linzen, sesamzaad.\n• Vitamine D: spierkracht, immuun, bot. Tekort bij <30% bevolking BE/NL in winter. 15 µg/dag. Bronnen: vette vis, eieren, zon (50% UV-B mei-sep).\n• Magnesium (Mg): spiercontractie, energiestofwisseling, kramp-preventie. 350-420 mg/dag. Bronnen: noten, zaden, volkoren granen, donkergroene bladgroenten.\n• Calcium (Ca): bot, spiercontractie, neuromusculair. 1000 mg/dag. Bronnen: zuivel, sardientjes met graten, sesamzaad, tofu.\n\nBij vrouwen: ijzer-tekort komt voor bij 30-60% van topsportsters (Sim et al. 2019).',
    bron: 'EFSA RDA 2014; Sim et al. 2019 (vrouwen + ijzer); IOC consensus (B3)'
  },
  pee_chart: {
    titel: 'Urine-kleur als hydratatie-indicator',
    uitleg: 'De Armstrong Urine Color Chart (1994) is de simpelste manier om hydratatie-status te checken:\n\n• Niveau 1-3 (helder tot lichtgeel): goed gehydrateerd\n• Niveau 4-5 (donkergeel): licht uitgedroogd, drink bij\n• Niveau 6-8 (oranje/bruin): sterk uitgedroogd, drink direct\n\nAandachtspunten:\n• Eerste plas \'s ochtends is meestal donkerder — gebruik tweede meting van de dag\n• Sommige supplementen (vitamine B2/riboflavine) maken urine fel geel — dat is geen uitdroging\n• Bij medicatie: vraag arts',
    bron: 'Armstrong et al. 1994; ACSM Position Stand 2007'
  },
  sweat_rate: {
    titel: 'Sweat-rate (zweetsnelheid)',
    uitleg: 'Hoeveel vocht je per uur verliest tijdens inspanning. Varieert enorm tussen spelers (0.4-2.5 L/u):\n\n• <0.8 L/u: lage zweter\n• 0.8-1.2 L/u: gemiddeld\n• 1.2-1.6 L/u: hoge zweter\n• >1.6 L/u: zeer hoge zweter\n\nFactoren: geslacht, fitheid, klimaat, kleding, intensiteit. Persoonlijke meting is veel preciezer dan generieke aanbeveling.\n\nDoel: vochtverlies tijdens training onder 2% lichaamsgewicht houden — daarboven prestatieverlies (Sawka et al. 2007).\n\nBerekening: (gewicht_voor − gewicht_na + vocht_gedronken_in_kg) ÷ tijd_in_uren = L/uur',
    bron: 'ACSM 2007; Sawka & Montain 2007; Sport Nutrition consensus (B3)'
  }
};

// =============================================================================
// HELPER COMPONENT: Tooltip (vraagteken-icoontje)
// =============================================================================

const Tip = ({ id, children }) => {
  const [open, setOpen] = useState(false);
  const tip = TOOLTIPS[id];
  if (!tip) return <>{children}</>;
  return (
    <>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        {children}
        <button
          onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
          style={{
            background: 'none', border: '1.5px solid #b8b8b0', borderRadius: '50%',
            width: 16, height: 16, padding: 0, cursor: 'pointer',
            fontSize: 10, fontWeight: 700, color: '#6b6b65',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'inherit', flexShrink: 0
          }}
          aria-label={`Meer info over ${tip.titel}`}
        >?</button>
      </span>
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            margin: 0,
            isolation: 'isolate'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'rgb(255, 255, 255)',
              background: 'rgb(255, 255, 255)',
              maxWidth: 480,
              width: '100%',
              padding: '24px 28px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              border: '2px solid #1a1a1a',
              borderRadius: 0,
              color: '#1a1a1a',
              opacity: 1,
              position: 'relative',
              zIndex: 1
            }}
          >
            <h3 style={{ margin: 0, fontFamily: '"Fraunces", serif', fontSize: 22, fontWeight: 600, color: '#1a1a1a' }}>{tip.titel}</h3>
            <p style={{ margin: '14px 0', fontSize: 14, lineHeight: 1.6, color: '#1a1a1a', whiteSpace: 'pre-wrap' }}>{tip.uitleg}</p>
            {tip.formule && (
              <pre style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
                background: '#fafaf7', padding: '10px 14px', margin: '0 0 14px 0',
                whiteSpace: 'pre-wrap', borderLeft: '3px solid #d94f30'
              }}>{tip.formule}</pre>
            )}
            <div style={{ fontSize: 11, color: '#6b6b65', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Bron: {tip.bron}
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                marginTop: 18, padding: '8px 16px', background: '#1a1a1a',
                color: 'white', border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 500, fontFamily: 'inherit'
              }}
            >{VERTALINGEN.nl.modal_sluiten}</button>
          </div>
        </div>
      )}
    </>
  );
};

// =============================================================================
// REKENMOTOR (fase 3 logica)
// =============================================================================

const berekenBMR = (g, l, a, sex) => {
  const b = 10 * g + 6.25 * l - 5 * a;
  return sex === 'man' ? b + 5 : b - 161;
};

// =============================================================================
// TRAININGSBELASTING — MET-GEBASEERDE BEREKENING
// Bron: Ainsworth et al. Compendium of Physical Activities 2011
//       ACSM Guidelines for Exercise Testing and Prescription 2021
//       IOC Consensus on Sports Nutrition 2018
//
// Formule: netto extra verbruik = (MET − 1.3) × gewicht_kg × duur_uren
// De 1.3 aftrek vermijdt dubbeltelling met basaalmetabolisme (rust-MET ≈ 1.3)
// =============================================================================

const MET_WAARDEN = {
  // Krachttraining (Compendium code 02050, 02060)
  kracht_licht:    3.5,   // techniek, lange rustpauzes
  kracht_gemiddeld: 4.5,  // normale gymsessie
  kracht_zwaar:    5.0,   // high density, full-body, korte rust

  // Cardio / looptraining (Compendium code 12050, 12070)
  cardio_onderhoud: 9.0,  // ~10 km/u
  cardio_zwaar:    12.0,  // ~13 km/u

  // Handbal (Compendium code 15270)
  handbal_licht:   8.0,   // tactisch/technisch, lage intensiteit
  handbal_gemiddeld: 10.0, // standaard training (aanbevolen default)
  handbal_zwaar:   12.0,  // wedstrijd of zeer intensieve training

  RUST_MET: 1.3           // zitten heeft MET 1.3 — nooit onder dit gaan
};

/**
 * Bereken netto extra kcal-verbruik voor één trainingsactiviteit.
 * @param {number} met       - MET-waarde voor de activiteit
 * @param {number} gewichtKg - lichaamsgewicht in kg
 * @param {number} duurUren  - duur in uren (bijv. 1.5 voor 90 min)
 * @returns {number} netto extra kcal (bovenop basaalmetabolisme)
 */
const berekenTrainingKcal = (met, gewichtKg, duurUren) => {
  return (met - MET_WAARDEN.RUST_MET) * gewichtKg * duurUren;
};

/**
 * Bereken TDEE op basis van BMR + netto trainingsverbruik over de week.
 * Elke trainingsdag voegt zijn netto extra kcal toe, gedeeld door 7 voor daggemiddelde.
 */
const berekenTDEE = (bmr, input) => {
  const handbalMET = input.handbalIntensiteit === 'licht' ? MET_WAARDEN.handbal_licht
    : input.handbalIntensiteit === 'zwaar' ? MET_WAARDEN.handbal_zwaar
    : MET_WAARDEN.handbal_gemiddeld;
  const krachtMET = input.krachtIntensiteit === 'licht' ? MET_WAARDEN.kracht_licht
    : input.krachtIntensiteit === 'zwaar' ? MET_WAARDEN.kracht_zwaar
    : MET_WAARDEN.kracht_gemiddeld;
  const cardioMET = input.cardioIntensiteit === 'zwaar' ? MET_WAARDEN.cardio_zwaar
    : MET_WAARDEN.cardio_onderhoud;

  const hpw = input.handbalPerWeek || 0;
  const hd  = hpw > 0 ? (parseFloat(input.handbalDuur) || 0) : 0;
  const kpw = input.krachtPerWeek  || 0;
  const kd  = kpw > 0 ? (parseFloat(input.krachtDuur)  || 0) : 0;
  const cpw = input.cardioPerWeek  || 0;
  const cd  = cpw > 0 ? (parseFloat(input.cardioDuur)  || 0) : 0;

  const weekKcalHandbal = berekenTrainingKcal(handbalMET, input.gewicht, hd) * hpw;
  const weekKcalKracht  = berekenTrainingKcal(krachtMET,  input.gewicht, kd) * kpw;
  const weekKcalCardio  = berekenTrainingKcal(cardioMET,  input.gewicht, cd) * cpw;

  const weekKcalTotaal = weekKcalHandbal + weekKcalKracht + weekKcalCardio;
  const dagGemiddeldeExtra = weekKcalTotaal / 7;

  // Basis-PAL voor sedentaire activiteit buiten training (lopen, staan, dagdagelijks)
  const basisPAL = 1.40;
  const tdeeBase = bmr * basisPAL;

  return tdeeBase + dagGemiddeldeExtra;
};

/**
 * Bereken netto extra kcal voor één specifieke trainingsdag.
 * Wordt gebruikt voor dagtype-differentiatie.
 */
const dagTrainingKcal = (dagtype, input) => {
  const gewicht = input.gewicht;
  // Gebruik exacte waarden — geen || fallbacks die 0 overschrijven
  const hd  = parseFloat(input.handbalDuur) || 0;
  const kd  = parseFloat(input.krachtDuur)  || 0;
  const cd  = parseFloat(input.cardioDuur)  || 0;

  const handbalMET = input.handbalIntensiteit === 'licht' ? MET_WAARDEN.handbal_licht
    : input.handbalIntensiteit === 'zwaar' ? MET_WAARDEN.handbal_zwaar
    : MET_WAARDEN.handbal_gemiddeld;
  const krachtMET = input.krachtIntensiteit === 'licht' ? MET_WAARDEN.kracht_licht
    : input.krachtIntensiteit === 'zwaar' ? MET_WAARDEN.kracht_zwaar
    : MET_WAARDEN.kracht_gemiddeld;
  const cardioMET = input.cardioIntensiteit === 'zwaar' ? MET_WAARDEN.cardio_zwaar
    : MET_WAARDEN.cardio_onderhoud;

  switch (dagtype) {
    case 'krachtdag':
      return kd > 0 ? berekenTrainingKcal(krachtMET, gewicht, kd) : 0;
    case 'cardiodag':
      return cd > 0 ? berekenTrainingKcal(cardioMET, gewicht, cd) : 0;
    case 'handbaldag':
      return hd > 0 ? berekenTrainingKcal(handbalMET, gewicht, hd) : 0;
    case 'kracht_handbal':
      return (kd > 0 ? berekenTrainingKcal(krachtMET, gewicht, kd) : 0)
           + (hd > 0 ? berekenTrainingKcal(handbalMET, gewicht, hd) : 0);
    case 'wedstrijddag':
      return hd > 0 ? berekenTrainingKcal(MET_WAARDEN.handbal_zwaar, gewicht, hd) : 0;
    case 'rustdag':
    default:
      return 0;
  }
};

// Legacy wrapper — wordt nog gebruikt door UI-componenten die PAL tonen
const bepaalPAL = (tdee, bmr) => bmr > 0 ? tdee / bmr : 1.55;



const schatFFM = (g, vp, sex) => {
  if (vp && vp > 0) return g * (1 - vp / 100);
  return sex === 'man' ? g * 0.83 : g * 0.75;
};

const pasDoelToe = (tdee, doel, vp, sex) => {
  if (doel === 'maintain') return tdee;
  if (doel === 'cut') {
    let def = Math.min(500, tdee * 0.20);
    const lean = (sex === 'man' && vp && vp < 12) || (sex === 'vrouw' && vp && vp < 22);
    if (lean) def = Math.min(300, tdee * 0.10);
    return tdee - def;
  }
  return tdee + Math.min(500, tdee * 0.15);
};

const berekenEiwit = (g, doel, sex, fase) => {
  let pk;
  if (doel === 'cut') pk = sex === 'man' ? 2.2 : 2.1;
  else pk = 1.8;
  // Off-season: hypertrofie-focus → meer eiwit
  if (fase === 'off_season' && doel !== 'cut') pk = 2.0;
  return { eiwitG: g * pk, perKg: pk };
};

const berekenVet = (g, kc, doel) => {
  let bpk = doel === 'cut' ? 0.8 : doel === 'bulk' ? 1.0 : 0.9;
  return Math.max(bpk * g, (0.25 * kc) / 9);
};

const berekenCH = (kc, e, v, g, fase) => {
  const c = (kc - e * 4 - v * 9) / 4;
  return { chG: c, perKg: c / g };
};

// Fase-modulatie: past TDEE/kcal-doel aan op basis van seizoensfase
const pasFaseToe = (kcal, fase) => {
  if (fase === 'pre_season') return kcal * 1.05;  // +5% door volume-opbouw
  if (fase === 'in_season') return kcal * 1.0;
  return kcal;  // off_season: standaard
};

// Bron: IOC 2018, ACSM 2016 (B1), Stellingwerff et al. 2019 voor periodisering.
// Off-season: CH gemiddeld (3-5 g/kg gemiddelde dag)
// Pre-season: CH ↑ (5-7 g/kg gemiddelde dag) — door PAL-stijging
// In-season: CH gemiddeld + carb-load matchdagen — al automatisch via PAL+matchdag-extra

const valideer = (input, doelen, profiel) => {
  const w = [];
  const minK = input.geslacht === 'man' ? 1500 : 1300;
  // Drempel voor doorverwijzing naar erkend sportdiëtist
  const drempelProfessioneel = input.geslacht === 'man' ? 1700 : 1500;

  if (doelen.kcalDag < minK) {
    w.push({ niveau: 'rode_vlag', bericht: `Berekend caloriedoel (${Math.round(doelen.kcalDag)} kcal) onder veilige minimum (${minK}). Stop met deze cut en raadpleeg een erkend sportdiëtist of huisarts.` });
  } else if (doelen.kcalDag < drempelProfessioneel && input.doel === 'cut') {
    w.push({ niveau: 'rode_vlag', bericht: `Caloriedoel ${Math.round(doelen.kcalDag)} kcal is laag voor een sporter. Een cut onder ${drempelProfessioneel} kcal kan zonder begeleiding leiden tot prestatieverlies, hormonale verstoring en ondervoeding. Raadpleeg een erkend sportdiëtist (ingeschreven bij BVD-ABD of NVD).` });
  }
  if (input.doel === 'cut') {
    const hKpm = input.geslacht === 'man' ? 9 : 7.5;
    const kKpm = input.geslacht === 'man' ? 7 : 5.5;
    const cKpm = input.geslacht === 'man' ? 6 : 5;   // cardio: lager MET dan handbal
    const oWk = input.handbalPerWeek * input.handbalDuur * 60 * hKpm
              + input.krachtPerWeek * input.krachtDuur * 60 * kKpm
              + (input.cardioPerWeek || 0) * (input.cardioDuur || 0.5) * 60 * cKpm;
    const oDag = oWk / 7;
    const ea = (doelen.kcalDag - oDag) / profiel.ffm;
    profiel.ea = ea;
    if (input.geslacht === 'vrouw' && ea < 30) w.push({ niveau: 'rode_vlag', bericht: `Energy availability ${ea.toFixed(1)} kcal/kg FFM/dag — onder REDs-drempel van 30.` });
    else if (input.geslacht === 'vrouw' && ea < 35) w.push({ niveau: 'let_op', bericht: `Energy availability ${ea.toFixed(1)} kcal/kg FFM/dag is laag.` });
    else if (input.geslacht === 'man' && ea < 30) w.push({ niveau: 'rode_vlag', bericht: `Energy availability ${ea.toFixed(1)} kcal/kg FFM/dag te laag.` });
  }
  if (doelen.eiwitPerKg < 1.6) w.push({ niveau: 'let_op', bericht: `Eiwit-target ${doelen.eiwitPerKg.toFixed(2)} g/kg suboptimaal.` });
  if (input.leeftijd < 15 || input.leeftijd > 40) w.push({ niveau: 'info', bericht: 'Tool primair gevalideerd voor 15-40 jaar.' });
  return w;
};

const verdeelMacros = (eG, cG, vG, n, type, gewicht, trainingMoment) => {
  // trainingMoment: 'ochtend' | 'middag' | 'avond' (default avond)
  const tm = trainingMoment || 'avond';
  let sjabloon;

  if (n === 3) {
    if (tm === 'ochtend') {
      sjabloon = [
        { naam: 'Pre-training ontbijt', tijd: '06:00', pE: 0.30, pC: 0.40, pV: 0.20, type: 'ontbijt', alt: 'pre_workout' },
        { naam: 'Recovery-lunch', tijd: '12:00', pE: 0.40, pC: 0.40, pV: 0.40, type: 'lunch', alt: 'post_workout' },
        { naam: 'Avondeten', tijd: '19:00', pE: 0.30, pC: 0.20, pV: 0.40, type: 'diner' }
      ];
    } else if (tm === 'middag') {
      sjabloon = [
        { naam: 'Ontbijt', tijd: '07:00', pE: 0.30, pC: 0.30, pV: 0.35, type: 'ontbijt' },
        { naam: 'Pre-training lunch', tijd: '11:30', pE: 0.30, pC: 0.40, pV: 0.25, type: 'lunch', alt: 'pre_workout' },
        { naam: 'Post-training diner', tijd: '18:30', pE: 0.40, pC: 0.30, pV: 0.40, type: 'diner', alt: 'post_workout' }
      ];
    } else {
      sjabloon = [
        { naam: 'Ontbijt', tijd: '07:00-08:30', pE: 0.33, pC: 0.30, pV: 0.35, type: 'ontbijt' },
        { naam: 'Lunch', tijd: '12:00-13:00', pE: 0.33, pC: 0.35, pV: 0.35, type: 'lunch' },
        { naam: 'Avondeten', tijd: '19:00-20:00', pE: 0.34, pC: 0.35, pV: 0.30, type: 'diner' }
      ];
    }
  } else if (n === 4) {
    if (tm === 'ochtend') {
      sjabloon = [
        { naam: 'Pre-training ontbijt', tijd: '06:00', pE: 0.20, pC: 0.30, pV: 0.15, type: 'ontbijt', alt: 'pre_workout' },
        { naam: 'Recovery-lunch', tijd: '11:00', pE: 0.30, pC: 0.30, pV: 0.30, type: 'lunch', alt: 'post_workout' },
        { naam: 'Snack', tijd: '15:00', pE: 0.20, pC: 0.20, pV: 0.20, type: 'snack' },
        { naam: 'Avondeten', tijd: '19:00', pE: 0.30, pC: 0.20, pV: 0.35, type: 'diner' }
      ];
    } else if (tm === 'middag') {
      sjabloon = [
        { naam: 'Ontbijt', tijd: '07:00', pE: 0.25, pC: 0.20, pV: 0.30, type: 'ontbijt' },
        { naam: 'Pre-training lunch', tijd: '11:30', pE: 0.25, pC: 0.35, pV: 0.20, type: 'lunch', alt: 'pre_workout' },
        { naam: 'Post-training snack', tijd: '15:00', pE: 0.20, pC: 0.25, pV: 0.15, type: 'snack', alt: 'post_workout' },
        { naam: 'Avondeten', tijd: '19:00', pE: 0.30, pC: 0.20, pV: 0.35, type: 'diner' }
      ];
    } else {
      sjabloon = [
        { naam: 'Ontbijt', tijd: '07:00-08:30', pE: 0.25, pC: 0.25, pV: 0.30, type: 'ontbijt' },
        { naam: 'Lunch', tijd: '12:00-13:00', pE: 0.25, pC: 0.25, pV: 0.30, type: 'lunch' },
        { naam: 'Pre-training snack', tijd: '16:30', pE: 0.20, pC: 0.30, pV: 0.15, type: 'snack', alt: 'pre_workout' },
        { naam: 'Post-training diner', tijd: '20:30', pE: 0.30, pC: 0.20, pV: 0.25, type: 'diner', alt: 'post_workout' }
      ];
    }
  } else {
    if (tm === 'ochtend') {
      sjabloon = [
        { naam: 'Pre-training ontbijt', tijd: '06:00', pE: 0.16, pC: 0.25, pV: 0.10, type: 'ontbijt', alt: 'pre_workout' },
        { naam: 'Recovery-snack', tijd: '09:00', pE: 0.18, pC: 0.20, pV: 0.15, type: 'snack', alt: 'post_workout' },
        { naam: 'Lunch', tijd: '12:30', pE: 0.22, pC: 0.20, pV: 0.25, type: 'lunch' },
        { naam: 'Snack 2', tijd: '16:00', pE: 0.18, pC: 0.15, pV: 0.20, type: 'snack' },
        { naam: 'Avondeten', tijd: '19:30', pE: 0.26, pC: 0.20, pV: 0.30, type: 'diner' }
      ];
    } else if (tm === 'middag') {
      sjabloon = [
        { naam: 'Ontbijt', tijd: '07:00', pE: 0.22, pC: 0.18, pV: 0.25, type: 'ontbijt' },
        { naam: 'Snack 1', tijd: '10:30', pE: 0.18, pC: 0.18, pV: 0.15, type: 'snack' },
        { naam: 'Pre-training lunch', tijd: '12:00', pE: 0.20, pC: 0.30, pV: 0.20, type: 'lunch', alt: 'pre_workout' },
        { naam: 'Post-training snack', tijd: '15:30', pE: 0.16, pC: 0.20, pV: 0.15, type: 'snack', alt: 'post_workout' },
        { naam: 'Avondeten', tijd: '19:00', pE: 0.24, pC: 0.14, pV: 0.25, type: 'diner' }
      ];
    } else {
      sjabloon = [
        { naam: 'Ontbijt', tijd: '07:00-08:30', pE: 0.22, pC: 0.22, pV: 0.25, type: 'ontbijt' },
        { naam: 'Snack 1', tijd: '10:30', pE: 0.18, pC: 0.18, pV: 0.15, type: 'snack' },
        { naam: 'Lunch', tijd: '12:30-13:30', pE: 0.22, pC: 0.25, pV: 0.25, type: 'lunch' },
        { naam: 'Pre-training snack', tijd: '16:30', pE: 0.16, pC: 0.22, pV: 0.15, type: 'snack', alt: 'pre_workout' },
        { naam: 'Post-training diner', tijd: '20:30', pE: 0.22, pC: 0.18, pV: 0.20, type: 'diner', alt: 'post_workout' }
      ];
    }
  }
  let m = sjabloon.map(s => {
    const e = Math.round(eG * s.pE);
    const c = Math.round(cG * s.pC);
    const v = Math.round(vG * s.pV);
    return { ...s, eiwitG: e, chG: c, vetG: v, kcal: e * 4 + c * 4 + v * 9 };
  });
  // Note: rustdag/matchdag-totalen worden nu op dagniveau aangepast in genereerDagSchema
  // Hier alleen nog matchdag-extra CH-pulse rond de wedstrijd zelf (pre-match en post-match)
  if (type === 'matchdag') {
    const extra = Math.round(gewicht * 1.5);
    if (m.length >= 3) {
      const mid = Math.floor(m.length / 2);
      m[mid].chG += Math.round(extra * 0.6);
      m[m.length - 1].chG += Math.round(extra * 0.4);
      m.forEach(x => { x.kcal = x.eiwitG * 4 + x.chG * 4 + x.vetG * 9; });
    }
  }
  return m;
};

// =============================================================================
// BEREIDING-UITBREIDING — voor beginners
// =============================================================================
// Genereert generieke kookinstructies op basis van ingrediënten zodat de korte
// recept-instructie aangevuld wordt met basics voor wie weinig ervaring heeft.

// Generieke kook-tips per ingredient-categorie
const KOOK_TIPS = {
  rijst_basmati_droog: { tip: 'Spoel de rijst in een zeef tot het water helder is (verwijdert overtollig zetmeel). Doe in pan met dubbele hoeveelheid water + snufje zout. Aan de kook brengen, dan deksel erop, vuur héél laag, 12 min koken zonder roeren. Vuur uit, 5 min laten staan, dan losroeren met vork.', tijd: 17 },
  rijst_jasmine_droog: { tip: 'Spoel rijst kort. Doe in pan met 1.5× water + snufje zout. Aan kook brengen, dan deksel erop, lage temperatuur, 10-12 min. Daarna 5 min laten rusten.', tijd: 15 },
  rijst_volkoren_droog: { tip: 'Volkorenrijst heeft meer water nodig: 2.5× water. Kook 30-35 min met deksel op laag vuur.', tijd: 35 },
  pasta_droog: { tip: 'Grote pan ruim water aan de kook brengen, flink zout (1 el per liter). Pasta erin, regelmatig roeren eerste minuut zodat het niet plakt. Kook tijd op verpakking volgen of proeven (al dente = nog beetje bite).', tijd: 10 },
  pasta_volkoren_droog: { tip: 'Zoals gewone pasta, maar 1-2 min langer koken. Volkoren heeft stevigere structuur.', tijd: 12 },
  havermout: { tip: 'Doe havermout in een steelpan met de melk/water (verhouding 1:3). Aan de kook brengen, dan vuur laag zetten en 4-5 min roeren tot het dik wordt. Smaakmakers (banaan, kaneel, honing) achteraf toevoegen.', tijd: 6 },
  aardappel: { tip: 'Schil de aardappelen, snij in gelijke stukken (ongeveer 3 cm). Doe in koud water met flink zout, breng aan de kook. Kook 15-20 min tot een vork er gemakkelijk in gaat. Giet af.', tijd: 20 },
  zoete_aardappel: { tip: 'Schil en snij in blokjes van 2 cm. Kook 12-15 min tot zacht, OF rooster in oven 25 min op 200°C met beetje olie en zout (geeft veel meer smaak).', tijd: 25 },
  ei: { tip: 'Hardgekookt: ei in koud water leggen, aan kook brengen, 8-9 min koken, daarna direct in koud water (zo wordt het pellen makkelijker). Zachtgekookt: 6 min. Spiegelei: pan met klein beetje olie op middelhoog vuur, ei erin, 2-3 min tot wit gestold is.', tijd: 9 },
  kipfilet: { tip: 'Pat kipfilet droog met keukenpapier (= betere kleur). Kruid met zout en peper. Pan op middelhoog vuur, beetje olie. Kip erin, 4-5 min per kant tot goudbruin. Check gaarheid: snij door, vlees moet wit zijn (niet roze).', tijd: 12 },
  kalkoenfilet: { tip: 'Kalkoen droogt sneller uit dan kip. Bak max 4 min per kant op middelhoog vuur. Klaar als sappen helder zijn.', tijd: 10 },
  rundsbiefstuk_mager: { tip: 'Haal biefstuk 20 min voor het bakken uit de koelkast (op kamertemperatuur). Pan ZEER heet, druppeltje olie, biefstuk erin. 2-3 min per kant voor medium-rare. Niet bewegen tijdens bakken. Laat 5 min rusten voor je snijdt.', tijd: 8 },
  zalm_vers: { tip: 'Zalm met de huidkant naar beneden in hete pan, beetje olie. 4-5 min op huidkant (krokant), dan 1-2 min op andere kant. Tussen wit en lichtroze in midden = perfect.', tijd: 7 },
  kabeljauw: { tip: 'Kabeljauw is delicaat — niet te vaak omdraaien. Pan middelhoog, 3-4 min per kant. Klaar als het in vlokken uit elkaar valt.', tijd: 8 },
  ui: { tip: 'Snij ui in gelijke stukjes. Bak op middelhoog vuur met olie, regelmatig roeren. 5-8 min tot glazig (transparant). Voor "gekarameliseerd" (zoeter, bruiner): 15-20 min op laag vuur.', tijd: 6 },
  knoflook: { tip: 'Pers knoflook (knoflookpers) of hak héél fijn. Voeg pas LAAT toe aan de pan (na ui) — knoflook verbrandt snel en wordt dan bitter. 30-60 sec roerbakken, dan andere ingrediënten erbij.', tijd: 1 },
  champignons: { tip: 'Niet wassen onder kraan (zuigen water op) — afvegen met vochtig keukenpapier. Snij in dikke plakjes. Hete pan, niet te vol (anders stoven ze i.p.v. bakken). 5-7 min op hoog vuur tot goudbruin.', tijd: 7 },
  tomaat: { tip: 'Voor saus: hak in stukjes en bak mee tot ze uit elkaar vallen. Voor salade: snij vlak voor serveren (anders waterig).', tijd: 3 },
  broccoli: { tip: 'Snij in roosjes (niet te klein). Stoom 4-6 min boven kokend water, of kook 4 min in zout water. Klaar als nog beetje krokant maar makkelijk te prikken met vork.', tijd: 6 },
  spinazie: { tip: 'Verse spinazie: was goed (zand!). Doe in droge hete pan, deksel erop, 1-2 min. Slinkt enorm. Diepvries: ontdooi en knijp uit.', tijd: 3 },
};

// Detecteer welke ingredienten in een recept een tip krijgen
const getKookTips = (recept) => {
  const tips = [];
  recept.ingredienten.forEach(ing => {
    if (KOOK_TIPS[ing.item]) {
      tips.push({ ingredient: ing.item, ...KOOK_TIPS[ing.item] });
    }
  });
  return tips;
};

// Algemene basis-kooktips voor beginners
const ALGEMENE_TIPS = [
  '🔪 Mise en place: snij EERST alle groenten en zet alle ingrediënten klaar voor je begint te bakken. Veel sneller en minder stress.',
  '🌡️ Pan-temperatuur: middelhoog is voor de meeste dingen ideaal. Te hoog = aanbranden buiten, rauw binnen. Te laag = stoven i.p.v. bakken.',
  '🧂 Kruiden in fases: een snufje aan begin, proeven aan eind, bijkruiden indien nodig. Liever te weinig dan te veel.',
  '⏱️ Lees het hele recept eerst: weet wat je gaat doen voor je begint. Sommige stappen zijn parallel (rijst koken WHILE kip bakken).'
];

// =============================================================================
// MEAL-PREP SUGGESTIES
// =============================================================================
// Genereert meal-prep tips op basis van het weekschema en boodschappen-frequentie

const genereerMealPrepSuggesties = (week, input) => {
  if (!week || week.length === 0) return [];
  const suggesties = [];

  // Verzamel alle batch_geschikte recepten in de week
  const batchRecepten = {};
  week.forEach(dag => {
    dag.maaltijden.forEach(m => {
      if (m.recept && m.recept.batch_geschikt) {
        const id = m.recept.id;
        if (!batchRecepten[id]) {
          batchRecepten[id] = { naam: m.recept.naam, dagen: [], type: m.recept.type, kooktijd: m.recept.kooktijd_min };
        }
        batchRecepten[id].dagen.push(dag.dagNaam);
      }
    });
  });

  // Suggestie 1: Identieke batch-recepten over meerdere dagen
  Object.values(batchRecepten).forEach(b => {
    if (b.dagen.length >= 2) {
      suggesties.push({
        type: 'batch_dubbel',
        titel: `Maak ${b.dagen.length}× porties van "${b.naam}" tegelijk`,
        beschrijving: `Komt voor op ${b.dagen.join(', ')}. Bereid alles op zondag in 1 keer (${b.kooktijd} min × 1 = nog steeds ${b.kooktijd} min, gewoon meer ingrediënten). Bewaar in luchtdichte bakjes max 4 dagen in koelkast, of vries in.`,
        tijd_winst: `Bespaart ~${b.kooktijd * (b.dagen.length - 1)} min totaal`
      });
    }
  });

  // Suggestie 2: Algemene meal-prep tips als boodschappen-frequentie 1× per week
  if (input.boodschappen === 1) {
    suggesties.push({
      type: 'algemeen',
      titel: 'Zondag-prep ritueel',
      beschrijving: 'Zet 90 min apart op zondag voor: (1) kook 500g rijst en/of pasta voorruit (4 dagen koelkast OK), (2) snij alle groenten voor 3 dagen vooruit (in luchtdichte bakjes), (3) gril 600-800g kipfilet of kalkoenfilet in één keer (verdeel over diners), (4) maak 1 grote pot soep of stoofpot voor lunches.',
      tijd_winst: 'Gemiddelde tijdwinst: 15-20 min/dag tijdens de week'
    });
    suggesties.push({
      type: 'bewaartips',
      titel: 'Bewaartijden in koelkast (luchtdicht)',
      beschrijving: 'Gekookte rijst: 4 dagen · gekookte pasta: 3-5 dagen · gegrild vlees/kip: 3-4 dagen · gekookte eieren: 7 dagen · gesneden groenten: 3-4 dagen · zelfgemaakte sauzen: 5 dagen · soepen/stoofpotten: 3-4 dagen of vries in.',
      tijd_winst: ''
    });
  }

  // Suggestie 3: Trainingsdag pre-prep
  const trainingsdagen = week.filter(d => d.dagtype === 'trainingsdag').length;
  if (trainingsdagen >= 3) {
    suggesties.push({
      type: 'training',
      titel: 'Pre-workout snacks weekvoorraad',
      beschrijving: `Je hebt ${trainingsdagen} trainingsdagen deze week. Maak een batch met 7 portions van: rijstwafels + pindakaas, banaan-haver-blokjes, of bouw je eigen energy bars (havermout 100g + pindakaas 80g + honing 50g + rozijnen 30g, mengen, plat drukken in vorm, koelkast 2u, snij in 7 stukken).`,
      tijd_winst: 'Geen "wat ga ik nu eten?" stress voor training'
    });
  }

  // Suggestie 4: Vries-portie tip
  suggesties.push({
    type: 'vries',
    titel: 'Vries-portie buffer',
    beschrijving: 'Maak elke week minstens 1× een dubbele portie van een stoofpot of curry — vries de helft in (in 1-portie-bakjes). Na 4 weken heb je 4 verschillende noodmaaltijden in de vriezer voor drukke dagen.',
    tijd_winst: 'Vermijdt afhalen op vermoeide dagen'
  });

  return suggesties;
};


// =============================================================================
// Eenvoudige sauzen die smaak geven aan basisgerechten. Macros per portie.
const SAUZEN_DB = [
  {
    id: 'yogh_knoflook', naam: 'Yoghurt-knoflook saus', tijd_min: 5,
    keuken: ['mediterraans', 'midden_oosters', 'belgisch_nederlands'], type: 'koud',
    ingredienten: ['Griekse yoghurt 0% (100g)', '1 teen knoflook (geperst)', '1 el citroensap', 'snufje zout, peper', 'optioneel: dille of munt'],
    bereiding: 'Meng alle ingrediënten. Laat 10 min trekken. Past bij gegrilde kip, vis, falafel, gebakken aardappel.',
    macros: { kcal: 60, eiwit: 7, ch: 5, vet: 1 }
  },
  {
    id: 'pesto_basis', naam: 'Snelle pesto', tijd_min: 5,
    keuken: ['mediterraans'], type: 'koud',
    ingredienten: ['30g basilicum', '20g pijnboompitten of zonnebloempitten', '20g Parmezaan', '1 teen knoflook', '40ml olijfolie', 'snuf zout'],
    bereiding: 'Stamp alles in vijzel of mix kort in blender. Past bij pasta, gegrild vlees, geroosterde groenten.',
    macros: { kcal: 380, eiwit: 8, ch: 3, vet: 38 }
  },
  {
    id: 'currysaus_kokos', naam: 'Snelle currysaus', tijd_min: 12,
    keuken: ['indisch', 'aziatisch'], type: 'warm',
    ingredienten: ['100ml kokosmelk', '1 tl currypoeder', '1 tl gemberpoeder', '1 teen knoflook', '1 ui (gesnipperd)', '1 el tomatenpuree', '5ml olie'],
    bereiding: 'Fruit ui + knoflook. Voeg currypoeder + gember toe (30 sec). Roer tomatenpuree door. Giet kokosmelk erbij. Laat 5 min sudderen. Past bij kip, vis, peulvruchten, rijst.',
    macros: { kcal: 200, eiwit: 2, ch: 6, vet: 18 }
  },
  {
    id: 'salsa_verde', naam: 'Salsa verde (kruidenolie)', tijd_min: 5,
    keuken: ['mediterraans'], type: 'koud',
    ingredienten: ['30g peterselie', '15g basilicum', '1 teen knoflook', '5 kappertjes', '40ml olijfolie', '1 el citroensap'],
    bereiding: 'Hak kruiden + knoflook fijn. Meng met kappertjes, olie en citroen. Past bij vis, gegrild vlees, gekookte aardappel.',
    macros: { kcal: 350, eiwit: 1, ch: 2, vet: 36 }
  },
  {
    id: 'chimichurri', naam: 'Chimichurri (Argentijns)', tijd_min: 5,
    keuken: ['mexicaans', 'mediterraans'], type: 'koud',
    ingredienten: ['30g peterselie', '10g oregano (vers of 1 tl gedroogd)', '2 tenen knoflook', '1 chilipeper of snufje chiliflakes', '40ml olijfolie', '15ml rode wijnazijn', 'snuf zout'],
    bereiding: 'Hak kruiden, knoflook, chili fijn. Meng met olie, azijn en zout. 10 min trekken. Past bij rood vlees (biefstuk, lam) en gegrilde groenten.',
    macros: { kcal: 350, eiwit: 1, ch: 2, vet: 36 }
  },
  {
    id: 'tahini_citroen', naam: 'Tahini-citroensaus', tijd_min: 3,
    keuken: ['midden_oosters', 'mediterraans'], type: 'koud',
    ingredienten: ['30g tahini', '15ml citroensap', '1 teen knoflook (geperst)', '30-50ml water', 'snuf zout, peper'],
    bereiding: 'Meng tahini + citroensap (zal eerst stevig worden). Voeg geleidelijk water toe tot gewenste dikte. Past bij falafel, gegrilde groenten, kip-shoarma, salades.',
    macros: { kcal: 180, eiwit: 5, ch: 4, vet: 16 }
  },
  {
    id: 'tzatziki', naam: 'Tzatziki (Grieks)', tijd_min: 8,
    keuken: ['mediterraans', 'midden_oosters'], type: 'koud',
    ingredienten: ['150g Griekse yoghurt 0%', '½ komkommer (geraspt + uitgeknepen)', '1 teen knoflook (geperst)', '1 el dille of munt', '5ml olijfolie', 'snuf zout'],
    bereiding: 'Rasp komkommer en knijp uit. Meng met yoghurt, knoflook, kruiden en olie. 15 min koud zetten. Past bij gegrild vlees, vis, pita, salades.',
    macros: { kcal: 130, eiwit: 12, ch: 6, vet: 5 }
  },
  {
    id: 'sojasaus_gember', naam: 'Aziatische soja-gember saus', tijd_min: 3,
    keuken: ['aziatisch'], type: 'koud',
    ingredienten: ['30ml sojasaus (low-sodium)', '15ml rijstazijn', '5ml sesamolie', '1 tl gembersnippers', '1 tl honing of bruine suiker', '1 lente-ui'],
    bereiding: 'Meng alles. 5 min trekken. Past bij rijst, noedels, tofu, kip, vis.',
    macros: { kcal: 80, eiwit: 2, ch: 8, vet: 5 }
  },
  {
    id: 'salsa_pico', naam: 'Salsa pico de gallo', tijd_min: 8,
    keuken: ['mexicaans'], type: 'koud',
    ingredienten: ['2 tomaten (in kleine blokjes)', '½ rode ui', '1 chilipeper', 'koriander', '1 limoen (sap)', 'snuf zout'],
    bereiding: 'Snij alles fijn. Meng en laat 15 min trekken. Past bij gegrild vlees, vis, taco, rijstgerechten.',
    macros: { kcal: 50, eiwit: 2, ch: 10, vet: 0 }
  },
  {
    id: 'mosterd_honing', naam: 'Mosterd-honing dressing', tijd_min: 3,
    keuken: ['belgisch_nederlands'], type: 'koud',
    ingredienten: ['2 el mosterd (Dijon)', '1 el honing', '20ml olijfolie', '1 el citroensap of azijn', 'peper'],
    bereiding: 'Klop alles op. Past bij koude kip, gegrilde varkenshaas, salades, gekookte aardappel.',
    macros: { kcal: 220, eiwit: 1, ch: 18, vet: 18 }
  },
  {
    id: 'champignonroomsaus', naam: 'Champignonroomsaus (light)', tijd_min: 12,
    keuken: ['belgisch_nederlands', 'mediterraans'], type: 'warm',
    ingredienten: ['200g champignons (gesneden)', '1 ui', '1 teen knoflook', '100ml halfvolle melk of kookroom-light', '1 tl tijm', '5ml olijfolie', '1 tl maïzena (in koud water)'],
    bereiding: 'Bak champignons + ui + knoflook. Voeg tijm toe. Voeg melk + maïzena-water toe, laat indikken. Past bij kip, varkenshaas, pasta, aardappel.',
    macros: { kcal: 160, eiwit: 8, ch: 14, vet: 7 }
  },
  {
    id: 'tomatensaus_basisrecept', naam: 'Tomatensaus snel', tijd_min: 12,
    keuken: ['mediterraans', 'belgisch_nederlands'], type: 'warm',
    ingredienten: ['1 ui', '2 tenen knoflook', '400g passata', '1 tl Italiaanse kruiden', 'snuf suiker', '10ml olijfolie', 'verse basilicum optioneel'],
    bereiding: 'Fruit ui + knoflook. Voeg passata + kruiden + suiker toe. Laat 10 min sudderen. Past bij pasta, gegrilde kip, gehaktballen.',
    macros: { kcal: 130, eiwit: 4, ch: 14, vet: 6 }
  },
  {
    id: 'pindakaas_dressing', naam: 'Pindasaus (satay-style)', tijd_min: 5,
    keuken: ['aziatisch'], type: 'warm',
    ingredienten: ['30g pindakaas 100%', '15ml sojasaus', '50ml warm water', '1 tl honing', '1 tl gember-poeder', '1 limoen (sap)', 'snufje chili'],
    bereiding: 'Meng alles tot smeuïge saus. Past bij kip, tofu, noedels, gestoomde groenten.',
    macros: { kcal: 200, eiwit: 8, ch: 8, vet: 16 }
  },
  {
    id: 'mosterd_yoghurt', naam: 'Yoghurt-mosterd-dille saus', tijd_min: 3,
    keuken: ['belgisch_nederlands', 'mediterraans'], type: 'koud',
    ingredienten: ['100g Griekse yoghurt 0%', '1 el mosterd', '1 el dille (vers of gedroogd)', '5ml citroensap', 'peper'],
    bereiding: 'Meng alles. Past bij zalm, gerookte vis, koude aardappelsalade, gekookte eieren.',
    macros: { kcal: 80, eiwit: 9, ch: 6, vet: 2 }
  },
  {
    id: 'avocado_lime', naam: 'Avocado-limoen smashed (guacamole)', tijd_min: 5,
    keuken: ['mexicaans'], type: 'koud',
    ingredienten: ['1 avocado', '1 limoen (sap)', '½ rode ui (fijn)', 'koriander', 'snuf zout', 'optioneel: tomaat'],
    bereiding: 'Prak avocado. Meng met limoen, ui, koriander, zout. Past bij gegrild vlees, vis, taco, eieren, brood.',
    macros: { kcal: 220, eiwit: 3, ch: 12, vet: 18 }
  }
];

// Detect: is een recept "droog" (zonder saus, zonder dressing, weinig vet/vocht)?
const isDroogRecept = (recept) => {
  // Indicaties: geen passata, salsa, kokosmelk, yoghurt-natuur, melk, room
  const sauzigeIngredienten = ['passata_tomatensaus', 'salsa_verde', 'kokosmelk_blik', 'yoghurt_natuur',
                                'griekse_yoghurt_0pct', 'magere_kwark', 'halfvolle_melk', 'pesto', 'tahini',
                                'pindakaas_100pct', 'soyasaus', 'oestersaus', 'mosterd', 'honing', 'tomatenpuree'];
  const heeftSaus = recept.ingredienten.some(i => sauzigeIngredienten.includes(i.item));
  if (heeftSaus) return false;
  // Hoog vet (>20g) is meestal niet droog
  if (recept.macros.vet_g > 20) return false;
  // Stevige eiwitbron + zetmeel + groente = potentieel droog
  return true;
};

// Suggereer een passende saus voor een recept (op basis van keuken)
const suggesteerSaus = (recept) => {
  const passend = SAUZEN_DB.filter(s => s.keuken.includes(recept.keuken));
  if (passend.length === 0) return SAUZEN_DB[0];
  // Eenvoudige match: neem de eerste passende
  // Beter: hash op recept-id zodat je consistent dezelfde saus krijgt
  return passend[recept.id % passend.length];
};


// =============================================================================
// Bron: VLAM (Vlaams Centrum voor Agro- en Visserijmarketing) seizoenskalender,
// Milieu Centraal NL (groente- en fruitkalender).
// Maand 1=januari, 12=december. true = beschikbaar uit lokale teelt of seizoen.
const SEIZOEN_INFO = {
  // Groenten — open teelt (geen serre)
  tomaat: [false, false, false, false, true, true, true, true, true, true, false, false],     // mei-okt
  courgette: [false, false, false, false, false, true, true, true, true, false, false, false], // jun-sep
  paprika: [false, false, false, false, false, true, true, true, true, true, false, false],   // jun-okt
  aubergine: [false, false, false, false, false, false, true, true, true, false, false, false], // jul-sep
  komkommer: [false, false, false, false, true, true, true, true, true, false, false, false],  // mei-sep
  broccoli: [false, false, false, false, true, true, true, true, true, true, true, false],     // mei-nov
  bloemkool: [false, false, false, false, true, true, true, true, true, true, true, false],
  spinazie: [false, false, true, true, true, true, true, true, true, true, true, false],
  rucola: [false, false, true, true, true, true, true, true, true, true, false, false],
  sla: [false, false, false, true, true, true, true, true, true, true, false, false],
  asperges: [false, false, false, true, true, true, false, false, false, false, false, false], // apr-jun
  boontjes: [false, false, false, false, false, true, true, true, true, false, false, false],
  spruitjes: [true, true, false, false, false, false, false, false, false, true, true, true],   // okt-feb
  witloof: [true, true, true, true, false, false, false, false, false, true, true, true],       // okt-apr
  rode_kool: [true, true, false, false, false, false, false, false, false, true, true, true],
  witte_kool: [true, true, false, false, false, false, false, false, false, true, true, true],
  bok_choi: [false, false, false, false, true, true, true, true, true, true, false, false],
  wortel: [true, true, true, true, true, true, true, true, true, true, true, true],   // hele jaar
  ui: [true, true, true, true, true, true, true, true, true, true, true, true],
  knoflook: [true, true, true, true, true, true, true, true, true, true, true, true],
  aardappel: [true, true, true, true, true, true, true, true, true, true, true, true],
  zoete_aardappel: [true, true, true, true, false, false, false, false, true, true, true, true], // grotendeels import, maar bewaarbaar
  champignons: [true, true, true, true, true, true, true, true, true, true, true, true],   // jaarrond gekweekt
  shiitake: [true, true, true, true, true, true, true, true, true, true, true, true],
  okra: [false, false, false, false, false, false, true, true, true, false, false, false],   // import — maar zomers
  lente_ui: [false, false, true, true, true, true, true, true, true, false, false, false],
  // Fruit
  appel: [true, true, true, true, false, false, false, false, true, true, true, true],   // okt-apr
  peer: [true, true, true, false, false, false, false, false, true, true, true, true],
  aardbeien: [false, false, false, false, true, true, true, false, false, false, false, false], // mei-jul
  frambozen: [false, false, false, false, false, true, true, true, true, false, false, false],
  blauwe_bessen: [false, false, false, false, false, true, true, true, false, false, false, false],
  perzik: [false, false, false, false, false, true, true, true, true, false, false, false],   // import in seizoen
  druiven: [false, false, false, false, false, false, false, true, true, true, true, false],
  banaan: [false, false, false, false, false, false, false, false, false, false, false, false],   // altijd import
  kiwi: [false, false, false, false, false, false, false, false, false, true, true, true],   // okt-dec uit Italië
  mango: [false, false, false, false, false, false, false, false, false, false, false, false], // import
  ananas: [false, false, false, false, false, false, false, false, false, false, false, false],
  sinaasappel: [true, true, true, true, false, false, false, false, false, false, true, true],   // win-import
  citroen: [true, true, true, true, false, false, false, false, false, false, true, true],
  limoen: [false, false, false, false, false, false, false, false, false, false, false, false],
  granaatappel: [true, true, false, false, false, false, false, false, true, true, true, true],
  diepvries_bessen: [true, true, true, true, true, true, true, true, true, true, true, true]   // diepvries = altijd OK
};

// Helper: is een ingredient nu in seizoen?
const isInSeizoen = (item, maand = null) => {
  const m = maand !== null ? maand - 1 : new Date().getMonth();
  if (!SEIZOEN_INFO[item]) return null;   // unknown — assume ok
  return SEIZOEN_INFO[item][m];
};

// Seizoen-vervangers: per buiten-seizoen groente/fruit een lijstje van goede alternatieven
const SEIZOEN_VERVANGERS = {
  tomaat: ['wortel', 'rode_kool', 'paprika'],            // winter: wortels + kool
  courgette: ['wortel', 'aardappel', 'knolselderij'],
  paprika: ['wortel', 'rode_kool', 'spruitjes'],
  aubergine: ['rode_kool', 'witte_kool', 'champignons'],
  komkommer: ['witloof', 'wortel', 'appel'],
  broccoli: ['spruitjes', 'rode_kool', 'witloof'],
  bloemkool: ['spruitjes', 'witte_kool', 'knolselderij'],
  spinazie: ['witloof', 'rode_kool', 'diepvries_spinazie'],  // diepvries = altijd OK
  rucola: ['witloof', 'lente_ui', 'rode_kool'],
  sla: ['witloof', 'rode_kool', 'lente_ui'],
  asperges: ['broccoli', 'courgette', 'sperziebonen'],
  boontjes: ['spruitjes', 'wortel', 'witte_kool'],
  aardbeien: ['appel', 'peer', 'diepvries_bessen'],
  frambozen: ['appel', 'peer', 'diepvries_bessen'],
  blauwe_bessen: ['appel', 'granaatappel', 'diepvries_bessen'],
  perzik: ['peer', 'appel', 'granaatappel'],
  druiven: ['appel', 'peer', 'sinaasappel'],
  banaan: ['appel', 'peer', 'sinaasappel'],              // altijd import-alternatief
  mango: ['sinaasappel', 'granaatappel', 'peer'],
};

const getSeizoensVervanger = (item) => {
  const vervangers = SEIZOEN_VERVANGERS[item] || [];
  return vervangers.filter(v => isInSeizoen(v) === true).slice(0, 2);
};

// Helper: bereken een seizoens-bonus voor een recept (lager = beter)
const seizoenBonus = (recept) => {
  let inSeizoen = 0, nietInSeizoen = 0, onbekend = 0;
  recept.ingredienten.forEach(i => {
    const status = isInSeizoen(i.item);
    if (status === true) inSeizoen++;
    else if (status === false) nietInSeizoen++;
    else onbekend++;
  });
  // Score: -0.05 voor elk seizoens-item, +0.10 voor niet-seizoen
  return inSeizoen * -0.05 + nietInSeizoen * 0.10;
};


// =============================================================================
// Bron: NEVO + USDA. Niet alle ingrediënten in de database hebben vezels (vlees, vis = 0).
const VEZEL_PER_100G = {
  havermout: 10, gv_havermout: 10, volkoren_brood: 7, spelt_brood: 7,
  glutenvrij_brood: 5, wrap_volkoren: 6, pita_volkoren: 5, naan_brood: 3,
  ciabatta: 3, rijstwafels: 4, tortillawrap_mais: 7,
  pasta_volkoren_droog: 11, pasta_droog: 3, rijst_volkoren_droog: 4, rijst_basmati_droog: 1.5,
  rijst_jasmine_droog: 1.5, rijstpasta_droog: 2, quinoa_droog: 7, boekweit_droog: 10,
  couscous_droog: 5, bulgur_droog: 13, freekeh_droog: 13,
  rijstnoedels_droog: 1, udonnoedels_droog: 2, soba_noedels_droog: 5, polenta_droog: 4,
  aardappel: 2.2, zoete_aardappel: 3,
  // Peulvruchten - hoog
  linzen_gekookt: 8, kikkererwten_gekookt: 8, zwarte_bonen_gekookt: 9, rode_kidneybonen: 7.5,
  pintobonen: 9, edamame: 5, rode_linzen_droog: 11, groene_linzen_droog: 11,
  tofu_naturel: 1, tofu_gerookt: 1.5, tempeh: 5, seitan: 2, falafel: 5,
  // Groenten - matig tot hoog
  broccoli: 3, bloemkool: 2, spinazie: 2.5, wortel: 2.8, courgette: 1, paprika: 2,
  tomaat: 1.2, komkommer: 0.5, sla: 1.3, rucola: 1.6, champignons: 1, shiitake: 2.5,
  ui: 1.7, lente_ui: 2.6, knoflook: 2.1, asperges: 2, boontjes: 3.5, rode_kool: 2.5,
  witte_kool: 2.5, spruitjes: 4, witloof: 3, aubergine: 3, okra: 3.2, bok_choi: 1,
  diepvries_spinazie: 2.5, diepvries_broccoli: 3, diepvries_groentemix: 3,
  passata_tomatensaus: 1.5, tomatenpuree: 4, salsa_verde: 1.5, zongedroogde_tomaten: 6,
  olijven_groen: 3,
  // Fruit
  banaan: 2.6, appel: 2.4, peer: 3.1, sinaasappel: 2.4, kiwi: 3, ananas: 1.4, mango: 1.6,
  druiven: 0.9, aardbeien: 2, frambozen: 6.5, blauwe_bessen: 2.4, diepvries_bessen: 2.4,
  perzik: 1.5, granaatappel: 4, limoen: 2.8,
  // Noten/zaden - hoog
  amandelen: 12, walnoten: 7, cashewnoten: 3.3, pistachenoten: 10, "pinda's": 8.5,
  pindakaas_100pct: 6, amandelpasta: 10, tahini: 9,
  lijnzaad: 27, chiazaad: 34, zonnebloempitten: 8.6, pompoenpitten: 6, sesamzaad: 12,
  // Diversen
  rozijnen: 4, dadels: 8, abrikozen_gedroogd: 7,
  avocado: 6.7,
  // Lage/0
  honing: 0, ahornsiroop: 0
};

// Bereken totaal vezel voor een recept (op basis van ingredienten)
const berekenVezels = (ingredienten) => {
  let totaal = 0;
  ingredienten.forEach(i => {
    const vezelP100 = VEZEL_PER_100G[i.item] || 0;
    if (vezelP100 === 0) return;
    let actualG = i.gram;
    const id = RECIPES_DB.ingredienten_database[i.item];
    if (id && id.per_stuk) {
      const stukG = id.stuk_g || (i.item === 'ei' ? 50 : i.item === 'eiwit' ? 33 : 50);
      actualG = i.gram * stukG;
    }
    totaal += vezelP100 * (actualG / 100);
  });
  return Math.round(totaal * 10) / 10;
};

// =============================================================================
// MICRO-NUTRIËNTEN — ijzer (Fe), vitamine D, magnesium (Mg), calcium (Ca)
// =============================================================================
// Bron: NEVO 2023 + USDA FoodData Central. Waarden in mg per 100g (vit D in µg).
// Doelwaarden EFSA/RDA voor sporters:
//   IJzer: 8 mg/dag man, 18 mg/dag vrouw (premenopauzaal); +30% voor sporters
//   Vit D: 15 µg/dag (alle volwassenen), kritiek in winter (oktober-april)
//   Magnesium: 350 mg/dag man, 300 mg/dag vrouw; +10-20% voor sporters
//   Calcium: 1000 mg/dag (lager bij goede vit D-status)

const MICRO_PER_100G = {
  // {ijzer_mg, vitD_ug, mg_mg, ca_mg}
  // Vlees & vis
  rundsbiefstuk_mager: { fe: 2.6, vitD: 0.1, mg: 23, ca: 5 },
  rundsgehakt_5pct: { fe: 2.4, vitD: 0.1, mg: 21, ca: 12 },
  lamsvlees_mager: { fe: 2.0, vitD: 0.5, mg: 25, ca: 17 },
  varkenshaas: { fe: 1.0, vitD: 0.7, mg: 24, ca: 10 },
  kipfilet: { fe: 0.5, vitD: 0.1, mg: 27, ca: 5 },
  kalkoenfilet: { fe: 0.7, vitD: 0.1, mg: 30, ca: 12 },
  ham_mager: { fe: 0.8, vitD: 0.6, mg: 18, ca: 6 },
  zalm_vers: { fe: 0.5, vitD: 11.0, mg: 27, ca: 12 },
  tonijn_vers: { fe: 1.3, vitD: 5.7, mg: 50, ca: 8 },
  tonijn_blik_water: { fe: 1.0, vitD: 1.7, mg: 27, ca: 11 },
  kabeljauw: { fe: 0.4, vitD: 1.0, mg: 32, ca: 16 },
  tilapia: { fe: 0.6, vitD: 3.1, mg: 27, ca: 10 },
  garnalen_gepeld: { fe: 1.5, vitD: 0.0, mg: 35, ca: 70 },
  ansjovis_blik: { fe: 4.6, vitD: 0.0, mg: 41, ca: 232 },
  sardientjes_blik: { fe: 2.9, vitD: 4.8, mg: 39, ca: 382 },   // top calcium
  mosselen: { fe: 6.7, vitD: 0.0, mg: 34, ca: 26 },           // top ijzer
  // Eieren & zuivel
  ei: { fe: 1.8, vitD: 2.0, mg: 12, ca: 56 },
  eiwit: { fe: 0.1, vitD: 0.0, mg: 11, ca: 7 },
  griekse_yoghurt_0pct: { fe: 0.1, vitD: 0.0, mg: 11, ca: 110 },
  magere_kwark: { fe: 0.1, vitD: 0.0, mg: 11, ca: 92 },
  cottage_cheese: { fe: 0.1, vitD: 0.0, mg: 9, ca: 83 },
  feta: { fe: 0.7, vitD: 0.4, mg: 19, ca: 493 },
  halloumi: { fe: 0.6, vitD: 0.4, mg: 22, ca: 720 },
  mozzarella_light: { fe: 0.2, vitD: 0.4, mg: 20, ca: 575 },
  harde_kaas: { fe: 0.7, vitD: 0.6, mg: 28, ca: 720 },
  ricotta: { fe: 0.4, vitD: 0.2, mg: 11, ca: 207 },
  halfvolle_melk: { fe: 0.0, vitD: 0.0, mg: 11, ca: 120 },
  yoghurt_natuur: { fe: 0.1, vitD: 0.1, mg: 12, ca: 121 },
  whey_concentraat: { fe: 1.0, vitD: 0.0, mg: 50, ca: 200 },
  whey_isolaat: { fe: 0.5, vitD: 0.0, mg: 30, ca: 160 },
  // Granen & zetmeel
  havermout: { fe: 4.2, vitD: 0.0, mg: 138, ca: 52 },
  gv_havermout: { fe: 4.2, vitD: 0.0, mg: 138, ca: 52 },
  volkoren_brood: { fe: 2.5, vitD: 0.0, mg: 76, ca: 73 },
  spelt_brood: { fe: 2.6, vitD: 0.0, mg: 80, ca: 80 },
  pasta_volkoren_droog: { fe: 3.6, vitD: 0.0, mg: 143, ca: 40 },
  pasta_droog: { fe: 1.3, vitD: 0.0, mg: 53, ca: 21 },
  rijst_basmati_droog: { fe: 0.8, vitD: 0.0, mg: 25, ca: 10 },
  rijst_volkoren_droog: { fe: 1.5, vitD: 0.0, mg: 143, ca: 23 },
  quinoa_droog: { fe: 4.6, vitD: 0.0, mg: 197, ca: 47 },
  boekweit_droog: { fe: 2.2, vitD: 0.0, mg: 231, ca: 18 },
  bulgur_droog: { fe: 2.5, vitD: 0.0, mg: 164, ca: 35 },
  couscous_droog: { fe: 1.1, vitD: 0.0, mg: 44, ca: 24 },
  aardappel: { fe: 0.8, vitD: 0.0, mg: 23, ca: 12 },
  zoete_aardappel: { fe: 0.6, vitD: 0.0, mg: 25, ca: 30 },
  // Peulvruchten & noten
  rode_linzen_droog: { fe: 7.5, vitD: 0.0, mg: 47, ca: 35 },   // top ijzer
  groene_linzen_droog: { fe: 7.5, vitD: 0.0, mg: 47, ca: 35 },
  zwarte_bonen_gekookt: { fe: 2.1, vitD: 0.0, mg: 70, ca: 27 },
  kikkererwten_gekookt: { fe: 2.9, vitD: 0.0, mg: 48, ca: 49 },
  edamame: { fe: 2.3, vitD: 0.0, mg: 64, ca: 63 },
  tofu_naturel: { fe: 2.7, vitD: 0.0, mg: 58, ca: 350 },        // top calcium
  tempeh: { fe: 2.7, vitD: 0.0, mg: 81, ca: 111 },
  amandelen: { fe: 3.7, vitD: 0.0, mg: 270, ca: 269 },          // top mg
  walnoten: { fe: 2.9, vitD: 0.0, mg: 158, ca: 98 },
  cashewnoten: { fe: 6.7, vitD: 0.0, mg: 292, ca: 37 },         // top mg
  pistachenoten: { fe: 3.9, vitD: 0.0, mg: 121, ca: 105 },
  sesamzaad: { fe: 14.6, vitD: 0.0, mg: 351, ca: 975 },         // sterk in alle
  pompoenpitten: { fe: 8.8, vitD: 0.0, mg: 535, ca: 46 },       // top mg
  zonnebloempitten: { fe: 5.3, vitD: 0.0, mg: 325, ca: 78 },
  chiazaad: { fe: 7.7, vitD: 0.0, mg: 335, ca: 631 },
  lijnzaad: { fe: 5.7, vitD: 0.0, mg: 392, ca: 255 },
  pindakaas_100pct: { fe: 1.9, vitD: 0.0, mg: 154, ca: 43 },
  tahini: { fe: 8.9, vitD: 0.0, mg: 95, ca: 426 },
  // Groenten (rijke bronnen)
  spinazie: { fe: 2.7, vitD: 0.0, mg: 79, ca: 99 },             // ijzer
  diepvries_spinazie: { fe: 2.7, vitD: 0.0, mg: 79, ca: 99 },
  bok_choi: { fe: 0.8, vitD: 0.0, mg: 19, ca: 105 },
  broccoli: { fe: 0.7, vitD: 0.0, mg: 21, ca: 47 },
  rucola: { fe: 1.5, vitD: 0.0, mg: 47, ca: 160 },
  okra: { fe: 0.6, vitD: 0.0, mg: 57, ca: 82 },
  tomaat: { fe: 0.3, vitD: 0.0, mg: 11, ca: 10 },
  paprika: { fe: 0.4, vitD: 0.0, mg: 12, ca: 7 },
  // Champignons (vitamine D bron als blootgesteld aan UV)
  champignons: { fe: 0.5, vitD: 0.2, mg: 9, ca: 3 },
  shiitake: { fe: 0.4, vitD: 0.4, mg: 20, ca: 2 },
  // Fruit
  banaan: { fe: 0.3, vitD: 0.0, mg: 27, ca: 5 },
  appel: { fe: 0.1, vitD: 0.0, mg: 5, ca: 6 },
  avocado: { fe: 0.6, vitD: 0.0, mg: 29, ca: 12 },
  blauwe_bessen: { fe: 0.3, vitD: 0.0, mg: 6, ca: 6 },
  diepvries_bessen: { fe: 0.4, vitD: 0.0, mg: 8, ca: 12 },
  granaatappel: { fe: 0.3, vitD: 0.0, mg: 12, ca: 10 },
  dadels: { fe: 1.0, vitD: 0.0, mg: 54, ca: 39 },
  rozijnen: { fe: 1.9, vitD: 0.0, mg: 32, ca: 50 },
};

// Bereken alle 4 micros voor een recept
const berekenMicros = (ingredienten) => {
  let fe = 0, vitD = 0, mg = 0, ca = 0;
  ingredienten.forEach(i => {
    const m = MICRO_PER_100G[i.item];
    if (!m) return;
    let actualG = i.gram;
    const id = RECIPES_DB.ingredienten_database[i.item];
    if (id && id.per_stuk) {
      const stukG = id.stuk_g || (i.item === 'ei' ? 50 : i.item === 'eiwit' ? 33 : 50);
      actualG = i.gram * stukG;
    }
    const ratio = actualG / 100;
    fe += (m.fe || 0) * ratio;
    vitD += (m.vitD || 0) * ratio;
    mg += (m.mg || 0) * ratio;
    ca += (m.ca || 0) * ratio;
  });
  return {
    fe: Math.round(fe * 10) / 10,
    vitD: Math.round(vitD * 10) / 10,
    mg: Math.round(mg),
    ca: Math.round(ca)
  };
};

// Doelwaarden voor handbalspelers (RDA × sporter-correctie)
const microDoelen = (input) => ({
  fe_doel: input.geslacht === 'vrouw' ? 22 : 10,        // vrouw RDA 18 + 20% sport
  vitD_doel: 15,                                        // µg/dag
  mg_doel: input.geslacht === 'vrouw' ? 360 : 420,      // RDA + sport correctie
  ca_doel: 1000                                         // mg/dag
});


// =============================================================================
// Volgens EU Regulation 1169/2011: 14 stoffen die verplicht gedeclareerd moeten worden.
// Voor elke allergeen: welke ingrediënten bevatten het direct? En welke geven cross-contact-risico?

const ALLERGENEN_INFO = {
  gluten: { label: 'Gluten (tarwe, rogge, gerst, haver)' },
  schaaldieren: { label: 'Schaaldieren' },
  eieren: { label: 'Eieren' },
  vis: { label: 'Vis' },
  pinda: { label: "Pinda's" },
  soja: { label: 'Soja' },
  melk: { label: 'Melk / lactose' },
  noten: { label: 'Noten (amandel, walnoot, cashew, pistache, hazelnoot, pecan)' },
  selderij: { label: 'Selderij' },
  mosterd: { label: 'Mosterd' },
  sesam: { label: 'Sesamzaad' },
  sulfiet: { label: 'Sulfieten / SO2' },
  lupine: { label: 'Lupine' },
  weekdieren: { label: 'Weekdieren (mosselen, oesters)' }
};

// Ingrediënt → set allergenen die het bevat (DIRECT)
const ING_ALLERGENEN = {
  // Gluten — alle producten op basis van tarwe/rogge/gerst/haver
  havermout: ['gluten'], pasta_droog: ['gluten'], pasta_volkoren_droog: ['gluten'],
  couscous_droog: ['gluten'], bulgur_droog: ['gluten'], freekeh_droog: ['gluten'],
  volkoren_brood: ['gluten'], spelt_brood: ['gluten'], wrap_volkoren: ['gluten'],
  pita_volkoren: ['gluten'], naan_brood: ['gluten'], ciabatta: ['gluten'],
  udonnoedels_droog: ['gluten'], soba_noedels_droog: ['gluten'], seitan: ['gluten'],
  // Schaaldieren
  garnalen_gepeld: ['schaaldieren'], scampi: ['schaaldieren'],
  // Eieren
  ei: ['eieren'], eiwit: ['eieren'],
  // Vis
  zalm_vers: ['vis'], tonijn_vers: ['vis'], kabeljauw: ['vis'], tilapia: ['vis'],
  tonijn_blik_water: ['vis'], ansjovis_blik: ['vis'], sardientjes_blik: ['vis'],
  // Pinda's
  "pinda's": ['pinda'], pindakaas_100pct: ['pinda'],
  // Soja
  tofu_naturel: ['soja'], tofu_gerookt: ['soja'], tempeh: ['soja'], edamame: ['soja'],
  soyamelk_ongezoet: ['soja'], soyayoghurt: ['soja'], soyasaus: ['soja', 'gluten'],
  soja_eiwitpoeder: ['soja'], miso_pasta: ['soja'],
  // Melk
  griekse_yoghurt_0pct: ['melk'], magere_kwark: ['melk'], skyr: ['melk'],
  cottage_cheese: ['melk'], feta: ['melk'], halloumi: ['melk'], mozzarella_light: ['melk'],
  harde_kaas: ['melk'], ricotta: ['melk'], halfvolle_melk: ['melk'], kefir: ['melk'],
  labneh: ['melk'], yoghurt_natuur: ['melk'], boter: ['melk'], ghee: ['melk'],
  whey_concentraat: ['melk'], whey_isolaat: ['melk'], caseine: ['melk'],
  // Noten
  amandelen: ['noten'], walnoten: ['noten'], cashewnoten: ['noten'],
  pistachenoten: ['noten'], amandelpasta: ['noten'], amandelmelk_ongezoet: ['noten'],
  // Mosterd
  mosterd: ['mosterd'],
  // Sesam
  sesamzaad: ['sesam'], sesamolie: ['sesam'], tahini: ['sesam'],
  // Weekdieren
  mosselen: ['weekdieren']
  // Selderij, sulfiet, lupine: niet direct in onze ingrediëntendatabase
};

// Cross-contact risico mapping: recept met X kan sporen van Y bevatten
const CROSS_CONTACT_RISICO = {
  noten: ['pinda'], // recepten met noten zijn risico voor pinda-allergie (cross-contact in fabrieken/keukens)
  pinda: ['noten'], // omgekeerd ook
};

// Check of een recept conflict heeft met een lijst allergieën
// Return: { uitsluiten: bool, waarschuwingen: [string], directe: [string] }
const checkAllergenen = (recept, allergieenLijst) => {
  if (!allergieenLijst || allergieenLijst.length === 0) {
    return { uitsluiten: false, waarschuwingen: [], directe: [] };
  }
  const directe = new Set();
  const waarschuwingen = new Set();

  recept.ingredienten.forEach(i => {
    const ingAllergenen = ING_ALLERGENEN[i.item] || [];
    ingAllergenen.forEach(allergeen => {
      if (allergieenLijst.includes(allergeen)) {
        directe.add(allergeen);
      }
      // Cross-contact: als recept allergeen X bevat, en gebruiker is allergisch voor Y
      // dat in CROSS_CONTACT_RISICO[X] zit, dan waarschuwen
      const risicos = CROSS_CONTACT_RISICO[allergeen] || [];
      risicos.forEach(crossAllergeen => {
        if (allergieenLijst.includes(crossAllergeen) && !directe.has(crossAllergeen)) {
          waarschuwingen.add(crossAllergeen);
        }
      });
    });
  });

  return {
    uitsluiten: directe.size > 0,
    waarschuwingen: Array.from(waarschuwingen),
    directe: Array.from(directe)
  };
};



const parseNietLekker = (str) =>
  str.split(',').map(s => s.toLowerCase().trim()).filter(s => s.length > 0);

/**
 * Quota-gebaseerd filteren.
 *
 * De gebruiker geeft per categorie aan hoeveel maaltijden per week ze willen:
 * - quotaVegetarisch: aantal vegetarische maaltijden / week (0-21)
 * - quotaVegan: aantal vegan / week
 * - quotaGlutenvrij: aantal glutenvrije / week
 * - quotaLactosevrij: aantal lactosevrije / week
 *
 * Op weekschema-niveau verdelen we deze quota over de week.
 * Op individuele maaltijdkeuze: gebruik de gespecificeerde "categoriePref" parameter
 * om aan te geven welke categorie deze maaltijd moet zijn (of "normaal" voor vlees/vis/zuivel).
 */
const filterReceptenV4 = (type, categoriePref, nietLekker, alGebruikt, allergieen, geblokkeerdMap) => {
  // Bepaal eiwit_niveau filter op basis van categoriePref
  let toegestaneNiveaus;
  if (categoriePref === 'vegan') {
    toegestaneNiveaus = ['veganistisch'];
  } else if (categoriePref === 'vegetarisch') {
    toegestaneNiveaus = ['zuivel_ei', 'vegetarisch', 'veganistisch'];
  } else {
    // 'normaal': vlees_vis eerst, zuivel_ei alleen als fallback
    toegestaneNiveaus = ['vlees_vis', 'zuivel_ei'];
  }

  let kandidaten = RECIPES_DB.recepten.filter(r =>
    r.type === type && toegestaneNiveaus.includes(r.eiwit_niveau)
  );

  // Voor 'normaal': probeer eerst puur vlees_vis, val terug op zuivel_ei alleen als nodig
  let vleesVisKandidaten = null;
  if (categoriePref === 'normaal') {
    vleesVisKandidaten = kandidaten.filter(r => r.eiwit_niveau === 'vlees_vis');
  }
  // Geblokkeerde recepten uitsluiten (als gebruiker een actief blok heeft)
  if (geblokkeerdMap && Object.keys(geblokkeerdMap).length > 0) {
    const nu = new Date();
    kandidaten = kandidaten.filter(r => {
      const vervalDatum = geblokkeerdMap[r.id];
      if (!vervalDatum) return true;
      return new Date(vervalDatum) <= nu;   // verlopen = weer toegestaan
    });
  }

  // Glutenvrij/lactosevrij — als categoriePref dit specificeert, hardfilteren
  if (categoriePref === 'glutenvrij') {
    kandidaten = kandidaten.filter(r => r.tags.glutenvrij);
  }
  if (categoriePref === 'lactosevrij') {
    kandidaten = kandidaten.filter(r => r.tags.lactosevrij);
  }

  // ALLERGENEN — harde uitsluiting van recepten met directe allergenen
  if (allergieen && allergieen.length > 0) {
    kandidaten = kandidaten.filter(r => {
      const check = checkAllergenen(r, allergieen);
      return !check.uitsluiten;
    });
  }

  // Niet-lekker — verbeterde matching: exacte woord-grens, ook synoniemen
  if (nietLekker && nietLekker.length > 0) {
    kandidaten = kandidaten.filter(r => {
      return !r.ingredienten.some(i => {
        const ingNorm = i.item.toLowerCase().replace(/_/g, ' ');
        return nietLekker.some(nl => {
          // Exacte match op ingredient-naam of de gebruiker typte een substring die als woord voorkomt
          return ingNorm === nl
            || ingNorm.startsWith(nl + ' ')
            || ingNorm.includes(' ' + nl)
            || nl === ingNorm.split(' ')[0];  // eerste woord match (bijv. "kip" matcht "kip filet")
        });
      });
    });
  }

  // Vermijd herhaling
  if (alGebruikt && alGebruikt.length > 0) {
    const nietGebruikt = kandidaten.filter(r => !alGebruikt.includes(r.id));
    if (nietGebruikt.length > 0) kandidaten = nietGebruikt;
  }

  // Voor 'normaal': geef sterk de voorkeur aan vlees_vis
  // Alleen terugvallen op zuivel_ei als er <2 vlees_vis kandidaten overblijven
  if (categoriePref === 'normaal' && vleesVisKandidaten) {
    const vleesVisNietGebruikt = alGebruikt && alGebruikt.length > 0
      ? vleesVisKandidaten.filter(r => !alGebruikt.includes(r.id))
      : vleesVisKandidaten;
    if (vleesVisNietGebruikt.length >= 2) {
      kandidaten = vleesVisNietGebruikt;
    } else if (vleesVisKandidaten.length >= 1) {
      kandidaten = vleesVisKandidaten; // gebruik vlees_vis ook al is het al gebruikt
    }
    // Pas als er echt geen vlees_vis is: gebruik volledige kandidatenlijst
  }

  return kandidaten;
};

// LEGACY filterRecepten (voor backwards-compat)
const filterRecepten = filterReceptenV4;

const berekenAfwijking = (recept, target) => {
  const m = recept.macros;
  const eD = Math.abs(m.eiwit_g - target.eiwitG) / Math.max(target.eiwitG, 10);
  const cD = Math.abs(m.ch_g - target.chG) / Math.max(target.chG, 20);
  const vD = Math.abs(m.vet_g - target.vetG) / Math.max(target.vetG, 5);
  const kD = Math.abs(m.kcal - target.kcal) / target.kcal;
  return 2.0 * eD + 1.0 * cD + 0.5 * vD + 1.5 * kD;
};

// Helper: parse voorkeursingrediënten (komma-gescheiden)
const parseVoorkeuren = (str) =>
  str.split(',').map(s => s.toLowerCase().trim()).filter(s => s.length > 0);

// Voorkeursingrediënten-bonus: als recept een voorkeurs-ingredient bevat → score *= 0.85
const heeftVoorkeursIngredient = (recept, voorkeuren) => {
  if (!voorkeuren || voorkeuren.length === 0) return false;
  return recept.ingredienten.some(i =>
    voorkeuren.some(vk => i.item.toLowerCase().includes(vk) || vk.includes(i.item.toLowerCase().replace(/_/g, ' ')))
  );
};

const selecteerRecept = (target, type, categoriePref, nietLekker, voorkeuren, boodschappenFreq, alGebruikt, voorkeursKeuken, terugAantal, allergieen, seizoenFilter, budgetMode, favorietenLijst, geblokkeerdMap) => {
  let kandidaten = filterReceptenV4(type, categoriePref, nietLekker, alGebruikt, allergieen, geblokkeerdMap);

  if (kandidaten.length === 0) {
    kandidaten = filterReceptenV4(type, categoriePref, nietLekker, [], allergieen, geblokkeerdMap);
    if (kandidaten.length === 0) return terugAantal > 1 ? [] : null;
  }

  // Strikte voorkeurskeuken
  let scoringSet = kandidaten;
  if (voorkeursKeuken && voorkeursKeuken !== 'geen') {
    const inVoorkeurskeuken = kandidaten.filter(r => r.keuken === voorkeursKeuken);
    if (inVoorkeurskeuken.length > 0) {
      scoringSet = inVoorkeurskeuken;
    }
  }

  const scored = scoringSet.map(r => {
    let score = berekenAfwijking(r, target);
    if (boodschappenFreq === 1 && r.batch_geschikt) score *= 0.85;
    if (r.kooktijd_min <= 15) score *= 0.92;
    if (heeftVoorkeursIngredient(r, voorkeuren)) score *= 0.65;
    if (seizoenFilter !== false) {
      score *= (1 + seizoenBonus(r));
    }
    // Geef vlees_vis een duidelijk voordeel bij 'normaal' categorie
    // zodat zuivel_ei (kwark, yoghurt, ei) alleen als echte fallback dient
    if (categoriePref === 'normaal' && r.eiwit_niveau === 'vlees_vis') {
      score *= 0.75;  // 25% lager = sterk voorkeur
    }
    if (categoriePref === 'normaal' && r.eiwit_niveau === 'zuivel_ei') {
      score *= 1.25;  // zuivel_ei wordt minder gekozen bij normaal
    }
    if (budgetMode) {
      const goedkoop = ['ei', 'eiwit', 'kipfilet', 'kalkoenfilet', 'kalkoenspek', 'tonijn_blik_water', 'sardientjes_blik',
                        'magere_kwark', 'cottage_cheese', 'havermout', 'pasta_droog', 'rijst_basmati_droog',
                        'rijst_jasmine_droog', 'aardappel', 'zwarte_bonen_gekookt', 'kikkererwten_gekookt',
                        'rode_linzen_droog', 'tofu_naturel'];
      const duur = ['rundsbiefstuk_mager', 'lamsvlees_mager', 'zalm_vers', 'tonijn_vers', 'kabeljauw',
                    'garnalen_gepeld', 'scampi', 'halloumi', 'feta', 'mozzarella_light', 'amandelen', 'walnoten',
                    'pistachenoten', 'cashewnoten', 'amandelpasta'];
      const heeftGoedkoop = r.ingredienten.some(i => goedkoop.includes(i.item));
      const heeftDuur = r.ingredienten.some(i => duur.includes(i.item));
      if (heeftGoedkoop && !heeftDuur) score *= 0.7;
      else if (heeftDuur && !heeftGoedkoop) score *= 1.4;
      if (r.batch_geschikt) score *= 0.9;
    }
    // Favorieten boost
    if (favorietenLijst && favorietenLijst.includes(r.id)) {
      score *= 0.6;   // sterke voorkeur, blijft niet super-dominant want andere bonussen kunnen omkeren
    }
    return { recept: r, score };
  });

  scored.sort((a, b) => a.score - b.score);

  if (terugAantal > 1) {
    return scored.slice(0, terugAantal).map(s => s.recept);
  }
  return scored[0].recept;
};

const schaalRecept = (recept, target) => {
  if (!recept) return null;
  let factor;
  if (recept.macros.eiwit_g >= 15 && target.eiwitG >= 15) {
    factor = target.eiwitG / recept.macros.eiwit_g;
  } else {
    factor = target.kcal / recept.macros.kcal;
  }
  factor = Math.max(0.7, Math.min(1.4, factor));
  const ings = recept.ingredienten.map(i => ({
    item: i.item,
    gram: Math.round(i.gram * factor)
  }));
  let e = 0, c = 0, v = 0, k = 0;
  ings.forEach(i => {
    const id = RECIPES_DB.ingredienten_database[i.item];
    if (!id) return;
    let actualG = i.gram;
    if (id.per_stuk) {
      const stukG = id.stuk_g || (i.item === 'ei' ? 50 : i.item === 'eiwit' ? 33 : 50);
      actualG = i.gram * stukG;
    }
    const r = actualG / 100;
    e += id.e * r;
    c += id.c * r;
    v += id.v * r;
    k += id.kcal * r;
  });
  return {
    ...recept,
    ingredienten: ings,
    macros: { eiwit_g: Math.round(e * 10) / 10, ch_g: Math.round(c * 10) / 10, vet_g: Math.round(v * 10) / 10, kcal: Math.round(k) },
    portie_factor: Math.round(factor * 100) / 100
  };
};

// Helper: ingredient-naam mooi formatteren
const formatIngredientName = (key) => {
  const map = {
    rijst_basmati_droog: 'Rijst basmati (droog)', rijst_volkoren_droog: 'Volkoren rijst (droog)',
    rijst_jasmine_droog: 'Jasmijnrijst (droog)', pasta_droog: 'Pasta (droog)',
    pasta_volkoren_droog: 'Volkoren pasta (droog)', quinoa_droog: 'Quinoa (droog)',
    rijstpasta_droog: 'Rijstpasta (droog)', couscous_droog: 'Couscous (droog)',
    bulgur_droog: 'Bulgur (droog)', boekweit_droog: 'Boekweit (droog)',
    rode_linzen_droog: 'Rode linzen (droog)', groene_linzen_droog: 'Groene linzen (droog)',
    rijstnoedels_droog: 'Rijstnoedels (droog)', udonnoedels_droog: 'Udon noedels (droog)',
    soba_noedels_droog: 'Soba noedels (droog)', polenta_droog: 'Polenta (droog)',
    freekeh_droog: 'Freekeh (droog)',
    griekse_yoghurt_0pct: 'Griekse yoghurt 0%', magere_kwark: 'Magere kwark',
    cottage_cheese: 'Cottage cheese', halfvolle_melk: 'Halfvolle melk',
    yoghurt_natuur: 'Yoghurt natuur',
    zalm_vers: 'Zalm (vers)', tonijn_vers: 'Tonijn (vers)',
    tonijn_blik_water: 'Tonijn (blik, in water)', sardientjes_blik: 'Sardientjes (blik)',
    ansjovis_blik: 'Ansjovis (blik)',
    rundsbiefstuk_mager: 'Rundsbiefstuk (mager)', rundsgehakt_5pct: 'Rundsgehakt 5%',
    kipfilet: 'Kipfilet', kalkoenfilet: 'Kalkoenfilet', kalkoenspek: 'Kalkoenspek',
    kippenboutje_zonder_vel: 'Kippenboutje (zonder vel)',
    varkenshaas: 'Varkenshaas', lamsvlees_mager: 'Lamsvlees (mager)',
    ham_mager: 'Magere ham', shoarmavlees_kip: 'Shoarmavlees (kip)',
    kabeljauw: 'Kabeljauw', tilapia: 'Tilapia',
    garnalen_gepeld: 'Garnalen (gepeld)', scampi: 'Scampi', mosselen: 'Mosselen',
    havermout: 'Havermout', gv_havermout: 'Glutenvrije havermout',
    glutenvrij_brood: 'Glutenvrij brood', volkoren_brood: 'Volkoren brood',
    spelt_brood: 'Spelt brood', wrap_volkoren: 'Wrap volkoren',
    tortillawrap_mais: 'Tortilla (mais)', pita_volkoren: 'Pita volkoren',
    naan_brood: 'Naan brood', ciabatta: 'Ciabatta', rijstwafels: 'Rijstwafels',
    aardappel: 'Aardappel', zoete_aardappel: 'Zoete aardappel',
    diepvries_spinazie: 'Diepvries spinazie', diepvries_broccoli: 'Diepvries broccoli',
    diepvries_groentemix: 'Diepvries groentemix', diepvries_bessen: 'Diepvries bessen',
    passata_tomatensaus: 'Passata / tomatensaus', tomatenpuree: 'Tomatenpuree',
    salsa_verde: 'Salsa verde', zongedroogde_tomaten: 'Zongedroogde tomaten',
    olijven_groen: 'Groene olijven',
    olijfolie: 'Olijfolie', raapzaadolie: 'Raapzaadolie',
    sesamolie: 'Sesamolie', kokosolie: 'Kokosolie',
    pindakaas_100pct: 'Pindakaas (100%)', amandelpasta: 'Amandelpasta',
    tahini: 'Tahini',
    blauwe_bessen: 'Blauwe bessen',
    soyamelk_ongezoet: 'Sojamelk (ongezoet)', havermelk_ongezoet: 'Havermelk (ongezoet)',
    amandelmelk_ongezoet: 'Amandelmelk (ongezoet)', kokosmelk_blik: 'Kokosmelk (blik)',
    kokosroom: 'Kokosroom', soyayoghurt: 'Sojayoghurt',
    lactosevrije_kwark: 'Lactosevrije kwark', lactosevrije_yoghurt: 'Lactosevrije yoghurt',
    whey_concentraat: 'Whey concentraat', whey_isolaat: 'Whey isolaat',
    soja_eiwitpoeder: 'Soja-eiwitpoeder', erwten_eiwitpoeder: 'Erwten-eiwitpoeder',
    caseine: 'Caseïne',
    rode_kool: 'Rode kool', witte_kool: 'Witte kool',
    harde_kaas: 'Harde kaas', mozzarella_light: 'Mozzarella (light)',
    halloumi: 'Halloumi', ricotta: 'Ricotta', feta: 'Feta', labneh: 'Labneh',
    kefir: 'Kefir',
    tofu_naturel: 'Tofu (naturel)', tofu_gerookt: 'Tofu (gerookt)',
    tempeh: 'Tempeh', seitan: 'Seitan', edamame: 'Edamame', falafel: 'Falafel',
    linzen_gekookt: 'Linzen (gekookt)', kikkererwten_gekookt: 'Kikkererwten (gekookt)',
    zwarte_bonen_gekookt: 'Zwarte bonen (gekookt)', rode_kidneybonen: 'Rode kidneybonen',
    pintobonen: 'Pintobonen',
    cashewnoten: 'Cashewnoten', pistachenoten: 'Pistachenoten',
    'pinda\'s': "Pinda's", zonnebloempitten: 'Zonnebloempitten',
    pompoenpitten: 'Pompoenpitten', sesamzaad: 'Sesamzaad',
    chiazaad: 'Chiazaad', lijnzaad: 'Lijnzaad',
    ahornsiroop: 'Ahornsiroop', abrikozen_gedroogd: 'Gedroogde abrikozen',
    soyasaus: 'Sojasaus', oestersaus: 'Oestersaus', miso_pasta: 'Misopasta',
    rode_currypasta: 'Rode currypasta', groene_currypasta: 'Groene currypasta',
    harissa: 'Harissa', mosterd: 'Mosterd',
    lente_ui: 'Lente-ui', bok_choi: 'Bok choi',
    chorizo: 'Chorizo', boter: 'Boter', ghee: 'Ghee',
    granaatappel: 'Granaatappel', limoen: 'Limoen', perzik: 'Perzik',
    ei: 'Eieren', eiwit: 'Eiwitten (alleen wit)'
  };
  return map[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
};

const formatGram = (gram, item) => {
  const id = RECIPES_DB.ingredienten_database[item];
  if (id && id.per_stuk) {
    return gram === 1 ? '1 stuk' : `${gram} stuks`;
  }
  return `${gram}g`;
};

const formatBoodschappenItem = (item) => {
  if (item.per_stuk) return `${item.gram} ${item.gram === 1 ? 'stuk' : 'stuks'}`;
  const isVerseEiwit = ['kipfilet', 'kalkoenfilet', 'kippenboutje_zonder_vel', 'rundsbiefstuk_mager',
    'varkenshaas', 'rundsgehakt_5pct', 'lamsvlees_mager', 'shoarmavlees_kip',
    'zalm_vers', 'tonijn_vers', 'kabeljauw', 'tilapia', 'garnalen_gepeld', 'scampi'].includes(item.item);
  if (isVerseEiwit) return `~${Math.ceil(item.gram / 100) * 100}g`;
  return `~${Math.ceil(item.gram / 50) * 50}g`;
};

// Keuken-labels
// KEUKEN_LABELS — resolved at render time based on active language
// (see KEUKEN_LABELS_NL / KEUKEN_LABELS_EN defined above)
const KEUKEN_LABELS = KEUKEN_LABELS_NL; // default; overridden per component via taal state

// =============================================================================
// SUPPLEMENTEN
// =============================================================================

const genereerSupplementen = (input) => {
  const advies = [];
  advies.push({ naam: 'Creatine monohydraat', dosering: '3-5 g/dag', timing: 'op een vast moment per dag, dagelijks (geen laadfase nodig)', reden: 'Sterk evidence-base voor handbal: kracht, herhaalde sprints, lean mass.', prioriteit: 1, tooltip: 'creatine' });
  advies.push({ naam: 'Vitamine D3', dosering: '1000-2000 IE/dag', timing: 'oktober-april in België; jaarrond bij weinig zonblootstelling', reden: 'Indoor-handballers hebben verhoogd deficiëntierisico.', prioriteit: 1, tooltip: 'vitd' });
  if (input.eetmomenten <= 3 || input.doel === 'bulk') {
    const heeftLactoseQuota = (input.quotaLactosevrij || 0) > 5;
    const w = heeftLactoseQuota ? 'Whey isolate of plantaardig (soja/erwt)' : 'Whey concentraat of isolate';
    advies.push({ naam: 'Eiwitsupplement', dosering: '20-40 g per portie', timing: 'post-workout of pre-bed', reden: `${w}. Hulp om dagelijkse eiwit-target (${(input.gewicht * 1.8).toFixed(0)}-${(input.gewicht * 2.2).toFixed(0)} g) te halen.`, prioriteit: 2 });
  }
  advies.push({ naam: 'Cafeïne (situationeel)', dosering: `${Math.round(input.gewicht * 3)}-${Math.round(input.gewicht * 6)} mg`, timing: '30-60 min voor match of zware training; NIET na 16:00', reden: 'Verbetert sprint, jump, kracht-uithouding. Geleidelijk wennen.', prioriteit: 2, tooltip: 'cafeine' });
  advies.push({ naam: 'Omega-3 (EPA + DHA)', dosering: '2-3 g EPA+DHA/dag', timing: 'bij maaltijd', reden: 'Vermindert spierschade en DOMS. Vooral bij <2× vette vis/week.', prioriteit: 2, tooltip: 'omega3' });
  if (input.geslacht === 'vrouw') {
    advies.push({ naam: 'IJzerstatus controleren', dosering: 'jaarlijkse bloedtest', timing: 'jaarlijks via huisarts', reden: 'Vrouwelijke handballers: hoogste risico ijzertekort. NOOIT speculatief supplementeren.', prioriteit: 1 });
    advies.push({ naam: 'Calcium via voeding', dosering: '1000-1500 mg/dag', timing: 'verspreid over de dag', reden: 'Botgezondheid, kritiek bij LEA-risico.', prioriteit: 2 });
  }
  return advies;
};

// =============================================================================
// SCHEMA-GENERATOR
// =============================================================================

/**
 * Bepaalt voor elke maaltijd over de week welke categorie het moet krijgen
 * gebaseerd op de quota's. Returned een array van categoriePref's.
 *
 * Voorbeeld: 7 dagen × 4 maaltijden = 28 maaltijdmomenten.
 * quotaVegetarisch=5 → 5 maaltijden per week zijn vegetarisch, rest is normaal.
 *
 * Strategie: vegan eerst, dan vegetarisch, dan glutenvrij/lactosevrij,
 * dan rest = normaal (vlees/vis/zuivel).
 */
const verdeelCategoriesOverWeek = (quotaVegetarisch, quotaVegan, quotaGlutenvrij, quotaLactosevrij, totaalMaaltijden) => {
  const cats = new Array(totaalMaaltijden).fill('normaal');
  let idx = 0;

  // Vegan slots
  for (let i = 0; i < quotaVegan && idx < totaalMaaltijden; i++) {
    cats[idx] = 'vegan';
    idx += Math.max(1, Math.floor(totaalMaaltijden / Math.max(quotaVegan, 1)));
    if (idx >= totaalMaaltijden) idx = totaalMaaltijden - 1;
  }

  // Reset idx zodat we vegetarisch verdelen op andere posities
  // Nieuwe strategie: bouw één combined plan
  const plan = [];
  for (let i = 0; i < quotaVegan; i++) plan.push('vegan');
  for (let i = 0; i < quotaVegetarisch; i++) plan.push('vegetarisch');
  for (let i = 0; i < quotaGlutenvrij; i++) plan.push('glutenvrij');
  for (let i = 0; i < quotaLactosevrij; i++) plan.push('lactosevrij');
  while (plan.length < totaalMaaltijden) plan.push('normaal');

  // Shuffle/spread plan zodat categorieën verspreid liggen
  // Eenvoudige verdeling: stride
  const result = new Array(totaalMaaltijden).fill('normaal');
  const usedSlots = new Set();
  let pi = 0;
  for (const cat of plan.filter(c => c !== 'normaal')) {
    if (pi >= totaalMaaltijden) break;
    while (usedSlots.has(pi) && pi < totaalMaaltijden) pi++;
    if (pi >= totaalMaaltijden) break;
    result[pi] = cat;
    usedSlots.add(pi);
    pi += Math.max(2, Math.floor(totaalMaaltijden / 8));
    if (pi >= totaalMaaltijden) pi = 0;
  }

  return result;
};

// =============================================================================
// MATCH-DAY PROTOCOL GENERATOR
// =============================================================================
// Genereert een gedetailleerd uur-per-uur protocol rond een match.
// Bron: ACSM 2016 (B1), IOC 2018 (B3), ISSN nutrient timing 2017 (B6)

const subTime = (timeStr, hoursBack) => {
  const [h, m] = timeStr.split(':').map(Number);
  const totalMin = h * 60 + m - hoursBack * 60;
  const newH = Math.floor(((totalMin % (24 * 60)) + 24 * 60) % (24 * 60) / 60);
  const newM = ((totalMin % 60) + 60) % 60;
  return `${String(newH).padStart(2, '0')}:${String(Math.round(newM)).padStart(2, '0')}`;
};

const addTime = (timeStr, hoursForward) => subTime(timeStr, -hoursForward);

const genereerMatchProtocol = (input, gewicht, matchDuurMin) => {
  const matchTijd = input.matchTijd || '19:30';
  const eindMatchTijd = addTime(matchTijd, matchDuurMin / 60);

  // Fase 1: 3-4u voor (CH-rijke maaltijd, weinig vet/vezel)
  const tijd_premaaltijd = subTime(matchTijd, 3.5);
  const ch_premaaltijd = Math.round(gewicht * 1.5); // 1-1.5g/kg
  const eiwit_premaaltijd = Math.round(gewicht * 0.3);

  // Fase 2: 1-2u voor (snelle CH)
  const tijd_snack = subTime(matchTijd, 1);
  const ch_snack = Math.round(gewicht * 0.7);

  // Fase 3: 30-60min voor (cafeïne + drinkgel)
  const tijd_pre = subTime(matchTijd, 0.5);
  const cafeine_dose = `${Math.round(gewicht * 3)}-${Math.round(gewicht * 6)} mg`;

  // Fase 4: tijdens match (CH/u)
  const ch_per_uur = '30-60g/uur';

  // Fase 5: 0-30min na match (snel herstel)
  const tijd_post = addTime(eindMatchTijd, 0.25);
  const ch_post = Math.round(gewicht * 1.0);
  const eiwit_post = Math.round(gewicht * 0.3);

  // Fase 6: 1.5-2u na (volwaardige avondmaaltijd)
  const tijd_avond = addTime(eindMatchTijd, 1.5);

  return {
    matchTijd, eindMatchTijd, matchDuurMin,
    fases: [
      {
        nummer: 1,
        titel: 'Pre-match maaltijd',
        wanneer: `${tijd_premaaltijd} (3-4u voor match)`,
        kleur: '#22c55e',
        doel: 'CH-rijke maaltijd, laag vet en vezels — vermijdt maagklachten',
        macros: `${ch_premaaltijd}g CH · ${eiwit_premaaltijd}g eiwit · weinig vet`,
        voorbeelden: [
          'Witte pasta met magere kipfilet en lichte tomatensaus',
          'Witte rijst met kabeljauw en wortel',
          "Pita met kalkoenfilet, weinig groenten, beetje hummus",
          'Gnocchi met magere kipfilet en passata'
        ],
        tip: '⚠️ Vermijd: vetrijke sauzen, gefrituurd, peulvruchten, koolsoorten, veel vezels (broccoli, volkoren brood). Drink 500ml water mee.'
      },
      {
        nummer: 2,
        titel: 'Pre-match snack',
        wanneer: `${tijd_snack} (1-2u voor match)`,
        kleur: '#3b82f6',
        doel: 'Snelle CH — bovenop glycogeen-voorraden',
        macros: `${ch_snack}g CH · weinig eiwit/vet`,
        voorbeelden: [
          'Banaan + 2 rijstwafels met honing',
          'Witte boterham met confituur + sportdrank',
          'Energy bar (40g CH) + appel',
          'Sportgel + glas vruchtensap (200ml)'
        ],
        tip: '💧 Begin met hydratatie: 200-300ml water of sportdrank. Geen nieuwe voeding uitproberen op matchdag!'
      },
      {
        nummer: 3,
        titel: 'Activatie',
        wanneer: `${tijd_pre} (30-45 min voor match)`,
        kleur: '#a855f7',
        doel: 'Cafeïne + finale CH-boost voor alertheid en sprint',
        macros: `${cafeine_dose} cafeïne · 20-30g CH (gel)`,
        voorbeelden: [
          'Sportgel (25-30g CH) + sportdrank',
          'Espresso (kleine) + banaan',
          'Cafeïne-tablet (100-200mg) + 200ml sportdrank'
        ],
        tip: `🎯 Cafeïne dosering: 3-6 mg/kg lichaamsgewicht voor jou = ${cafeine_dose}. Test eerst tijdens trainingen, niet op wedstrijddag.`
      },
      {
        nummer: 4,
        titel: 'Tijdens match',
        wanneer: `${matchTijd} - ${eindMatchTijd}`,
        kleur: '#d94f30',
        doel: 'Hydratatie + brandstof voor 2e helft + elektrolyten',
        macros: `${ch_per_uur} CH · 400-800ml vocht/uur · 500-700mg natrium/L`,
        voorbeelden: [
          'Sportdrank 500ml (30g CH + elektrolyten)',
          'Sportgel in pauze + water erbij',
          'Energierepen (kleine porties) tussen halftijden',
          'DIY: 500ml water + 30g suiker + ¼ tl zout'
        ],
        tip: `🏃 Bij matches >60min: minstens 1 sportgel of equivalent in pauze. Bij warmte (>22°C): elektrolyten ↑. Doelweegverlies tijdens: max 2% lichaamsgewicht (= ${(gewicht * 0.02).toFixed(1)} kg).`
      },
      {
        nummer: 5,
        titel: 'Recovery shake',
        wanneer: `${tijd_post} (binnen 30min na fluitsignaal)`,
        kleur: '#0891b2',
        doel: 'Glycogeen-resynthese aanvangen + eiwitsynthese starten',
        macros: `${ch_post}g CH · ${eiwit_post}g eiwit (3:1 ratio)`,
        voorbeelden: [
          `Recovery shake: 400ml chocolademelk + 30g whey`,
          `Banaan + 2 rijstwafels + whey-shake (250ml melk + 30g whey)`,
          `Smoothie: 250ml melk + 1 banaan + 30g whey + 40g havermout`,
          `Recovery-bar (40g CH + 20g eiwit) + 500ml water`
        ],
        tip: '⚡ Drink direct na douche: ~500ml vocht per kg verloren gewicht. Voeg snufje zout toe als je veel zweette.'
      },
      {
        nummer: 6,
        titel: 'Volledig herstel-diner',
        wanneer: `${tijd_avond} (1.5-2u na match)`,
        kleur: '#1a1a1a',
        doel: 'Vol herstel-pakket: glycogeen aanvullen, spierherstel, slaapvoorbereiding',
        macros: `40-50g eiwit · 80-120g CH · 20-30g vet · groenten voor micronutriënten`,
        voorbeelden: [
          'Zalm met zoete aardappel en broccoli',
          'Rundsbiefstuk met aardappelpuree en spinazie',
          'Kip-rijstbowl met avocado en paprika',
          'Pasta bolognese met gehakt en tomaat'
        ],
        tip: '🌙 Voor je gaat slapen: 30-40g caseïne (kwark, magere kwark, caseïne-shake) — overnight muscle protein synthesis. Vermijd zware vetrijke maaltijd vlak voor bed.'
      }
    ]
  };
};


const genereerDagSchema = (input, dagtype, alGebruikt = {}, categoriesVoorDag = null) => {
  const bmr = berekenBMR(input.gewicht, input.lengte, input.leeftijd, input.geslacht);
  const tdee = berekenTDEE(bmr, input);  // weekgemiddelde — gebruikt voor TDEE-display én als basis
  const pal = bepaalPAL(tdee, bmr);
  const ffm = schatFFM(input.gewicht, input.vetpct, input.geslacht);

  // Veilige duur-waarden: als sessies/week = 0, duur = 0
  const veiligInput = {
    ...input,
    handbalDuur: (input.handbalPerWeek || 0) > 0 ? (parseFloat(input.handbalDuur) || 0) : 0,
    krachtDuur:  (input.krachtPerWeek  || 0) > 0 ? (parseFloat(input.krachtDuur)  || 0) : 0,
    cardioDuur:  (input.cardioPerWeek  || 0) > 0 ? (parseFloat(input.cardioDuur)  || 0) : 0,
  };

  // Extra kcal voor DIT dagtype (netto MET-berekening)
  const extraKcalDag = dagTrainingKcal(dagtype, veiligInput);

  // Gemiddelde trainingskcal per dag over de week (voor delta-berekening)
  const hd = veiligInput.handbalDuur; const hpw = input.handbalPerWeek || 0;
  const kd = veiligInput.krachtDuur;  const kpw = input.krachtPerWeek  || 0;
  const cd = veiligInput.cardioDuur;  const cpw = input.cardioPerWeek  || 0;
  const handbalMET = input.handbalIntensiteit === 'licht' ? MET_WAARDEN.handbal_licht : input.handbalIntensiteit === 'zwaar' ? MET_WAARDEN.handbal_zwaar : MET_WAARDEN.handbal_gemiddeld;
  const krachtMET  = input.krachtIntensiteit  === 'licht' ? MET_WAARDEN.kracht_licht  : input.krachtIntensiteit  === 'zwaar' ? MET_WAARDEN.kracht_zwaar  : MET_WAARDEN.kracht_gemiddeld;
  const cardioMET  = input.cardioIntensiteit  === 'zwaar' ? MET_WAARDEN.cardio_zwaar  : MET_WAARDEN.cardio_onderhoud;
  const weekKcalTraining = berekenTrainingKcal(handbalMET, input.gewicht, hd) * hpw
    + berekenTrainingKcal(krachtMET, input.gewicht, kd) * kpw
    + berekenTrainingKcal(cardioMET, input.gewicht, cd) * cpw;
  const gemTrainingPerDag = weekKcalTraining / 7;

  // ── CORRECTE DAGKCAL-BEREKENING ──────────────────────────────────────────
  // Rustdag    = TDEE (weekgemiddelde, geen dag-extra)
  // Trainingsdag = TDEE + netto extra kcal van die dag boven het weekgemiddelde
  //
  // Waarom TDEE als rustdag-basis?
  //   • TDEE = BMR × 1.40 + weekgemiddelde trainingskcal/dag
  //   • Meer kracht/cardio sessies → hogere TDEE → ook rustdagen stijgen ✓
  //   • Op een rustdag is er geen dag-specifieke training, maar het lichaam
  //     heeft nog steeds meer energie nodig voor herstel na meer trainingsvolume
  //   • Trainingsdagen: TDEE + (extraKcalDag - gemTrainingPerDag)
  //     = rustdag-basis + dag-specifieke extra bovenop het gemiddelde
  //
  // Bron: Impey et al. 2018 "Fuel for the Work Required", ACSM 2016
  const basisDagKcal = dagtype === 'rustdag'
    ? tdee
    : tdee + (extraKcalDag - gemTrainingPerDag);

  const doelKcalRaw = pasDoelToe(basisDagKcal, input.doel, input.vetpct, input.geslacht);
  const doelKcalBase = pasFaseToe(doelKcalRaw, input.fase || 'in_season');

  // Gewichtstrendcorrectie (zie berekenKcalCorrectie)
  const trendCorrectie = input._kcalCorrectie || 0;
  const doelKcalGecorrigeerd = doelKcalBase + trendCorrectie;

  const { eiwitG, perKg: eiwitPerKg } = berekenEiwit(input.gewicht, input.doel, input.geslacht, input.fase || 'in_season');
  const vetGBase = berekenVet(input.gewicht, doelKcalGecorrigeerd, input.doel);
  const { chG: chGBase } = berekenCH(doelKcalGecorrigeerd, eiwitG, vetGBase, input.gewicht);

  // Dagtype-specifieke KH en vet modulatie
  // Gebaseerd op MET-belasting van de dag: hogere training = meer KH nodig
  let chFactor = 1.0;
  let vetFactor = 1.0;
  switch (dagtype) {
    case 'rustdag':
      chFactor = 0.65;   // 3-4 g/kg — weinig glycogeen nodig
      vetFactor = 1.10;  // meer vet voor verzadiging
      break;
    case 'krachtdag':
      chFactor = 0.85;   // 4-5 g/kg — matige KH voor kracht
      vetFactor = 1.00;
      break;
    case 'cardiodag':
      chFactor = 1.10;   // 5-7 g/kg — cardio verbrandt veel glycogeen
      vetFactor = 0.95;
      break;
    case 'handbaldag':
      chFactor = 1.10;   // 5-7 g/kg — handbal = hoge glycogeen-vraag
      vetFactor = 0.90;
      break;
    case 'kracht_handbal':
      chFactor = 1.20;   // 6-8 g/kg — dubbele prikkel = hoogste KH-behoefte
      vetFactor = 0.85;
      break;
    case 'wedstrijddag':
      chFactor = 1.35;   // 7-10 g/kg — wedstrijd carb-load protocol
      vetFactor = 0.80;  // laag vet voor snelle vertering
      break;
    default:             // legacy 'trainingsdag'
      chFactor = 1.0;
      vetFactor = 1.0;
  }

  const doelKcal = Math.round(doelKcalGecorrigeerd);
  const chG = Math.round(chGBase * chFactor);
  const vetG = Math.round(vetGBase * vetFactor);
  const chPerKg = chG / input.gewicht;

  const profiel = { bmr, pal, tdee, ffm, extraKcalDag: Math.round(extraKcalDag), trendCorrectie };
  const vezelTarget = (input.geslacht === 'man' ? 35 : 28) * (dagtype === 'rustdag' ? 0.9 : 1.0);
  const doelen = {
    kcalDag: doelKcal, eiwitG, eiwitPerKg, chG, chPerKg, vetG,
    vetPctKcal: (vetG * 9) / doelKcal * 100, vezelG: Math.round(vezelTarget),
    dagtype, chFactor, extraKcalDag: Math.round(extraKcalDag), trendCorrectie
  };
  const waarschuwingen = valideer(input, doelen, profiel);

  const nietLekker = parseNietLekker(input.nietLekker || '');
  const voorkeuren = parseVoorkeuren(input.voorkeuren || '');
  const verdeeldeMaaltijden = verdeelMacros(eiwitG, chG, vetG, input.eetmomenten, dagtype, input.gewicht, input.trainingMoment || 'avond');

  const maaltijdenMetRecept = verdeeldeMaaltijden.map((m, idx) => {
    let recepttype = m.type;
    if (dagtype === 'trainingsdag' && m.alt) recepttype = m.alt;

    // Categorie voor deze specifieke maaltijd
    const categoriePref = categoriesVoorDag ? categoriesVoorDag[idx] || 'normaal' : 'normaal';

    const recept = selecteerRecept(
      { kcal: m.kcal, eiwitG: m.eiwitG, chG: m.chG, vetG: m.vetG },
      recepttype, categoriePref, nietLekker, voorkeuren, input.boodschappen,
      alGebruikt[recepttype] || [], input.keuken, 1, input.allergieen || [],
      input.seizoenFilter, input.budgetMode,
      input._favorieten || [], input._geblokkeerd || {}
    );
    const geschaald = recept ? schaalRecept(recept, { kcal: m.kcal, eiwitG: m.eiwitG, chG: m.chG, vetG: m.vetG }) : null;
    if (recept) {
      if (!alGebruikt[recepttype]) alGebruikt[recepttype] = [];
      alGebruikt[recepttype].push(recept.id);
    }
    return { ...m, recept: geschaald, recepttype, categoriePref };
  });

  return { profiel, doelen, maaltijden: maaltijdenMetRecept, waarschuwingen, alGebruikt };
};

const genereerWeekschema = (input, trainingsdagen, taalParam = 'nl') => {
  const week = [];
  const dagNamen = DAG_NAMEN[taalParam] || DAG_NAMEN.nl;
  const alGebruikt = {};

  // Bepaal totaal aantal maaltijden over de week
  const totaalMaaltijden = 7 * input.eetmomenten;
  const categoriesPlan = verdeelCategoriesOverWeek(
    input.quotaVegetarisch || 0,
    input.quotaVegan || 0,
    input.quotaGlutenvrij || 0,
    input.quotaLactosevrij || 0,
    totaalMaaltijden
  );

  for (let i = 0; i < 7; i++) {
    const dagtype = trainingsdagen[i] || 'rustdag';
    const startIdx = i * input.eetmomenten;
    const endIdx = startIdx + input.eetmomenten;
    const categoriesVoorDag = categoriesPlan.slice(startIdx, endIdx);
    const dag = genereerDagSchema(input, dagtype, alGebruikt, categoriesVoorDag);
    week.push({ dagNaam: dagNamen[i], dagtype, ...dag });
  }
  return week;
};

const genereerBoodschappen = (week, ingrDB) => {
  const totalen = {};
  week.forEach(dag => {
    dag.maaltijden.forEach(m => {
      if (!m.recept) return;
      m.recept.ingredienten.forEach(i => {
        totalen[i.item] = (totalen[i.item] || 0) + i.gram;
      });
    });
  });
  const supermarktCategorieën = {
    // Volgorde: ENTREE → KOELING → BAKKERIJ → DROOGWAAR → DIEPVRIES → KASSA
    // Optimaal voor BE/NL supermarkten (Colruyt, Delhaize, AH, Jumbo)
    '🥬 1. Groenten & fruit (entree)': [
      'broccoli', 'bloemkool', 'spinazie', 'wortel', 'courgette', 'paprika', 'tomaat', 'komkommer',
      'sla', 'rucola', 'champignons', 'shiitake', 'ui', 'lente_ui', 'knoflook', 'asperges', 'boontjes',
      'rode_kool', 'witte_kool', 'spruitjes', 'witloof', 'aubergine', 'okra', 'bok_choi',
      'banaan', 'appel', 'peer', 'sinaasappel', 'kiwi', 'ananas', 'mango', 'druiven',
      'aardbeien', 'frambozen', 'blauwe_bessen', 'perzik', 'granaatappel', 'limoen', 'citroen',
      'aardappel', 'zoete_aardappel', 'avocado', 'olijven_groen'
    ],
    '🐟 2. Verse vis & vlees (koeling)': [
      'kipfilet', 'kalkoenfilet', 'kippenboutje_zonder_vel', 'rundsbiefstuk_mager', 'varkenshaas',
      'rundsgehakt_5pct', 'lamsvlees_mager', 'ham_mager', 'chorizo', 'kalkoenspek', 'shoarmavlees_kip',
      'zalm_vers', 'tonijn_vers', 'kabeljauw', 'tilapia', 'garnalen_gepeld', 'scampi', 'mosselen',
      'kapitein_vis'
    ],
    '🥚 3. Zuivel & eieren (koeling)': [
      'ei', 'eiwit', 'griekse_yoghurt_0pct', 'magere_kwark', 'skyr', 'cottage_cheese', 'feta',
      'halloumi', 'mozzarella_light', 'harde_kaas', 'ricotta', 'halfvolle_melk', 'kefir', 'labneh',
      'yoghurt_natuur', 'boter', 'ghee',
      'soyamelk_ongezoet', 'havermelk_ongezoet', 'amandelmelk_ongezoet', 'rijstmelk_ongezoet',
      'soyayoghurt', 'lactosevrije_kwark', 'lactosevrije_yoghurt', 'kokosyoghurt_naturel',
      'tofu_naturel', 'tofu_gerookt', 'tempeh', 'seitan', 'falafel'
    ],
    '🍞 4. Brood & bakkerij': [
      'volkoren_brood', 'spelt_brood', 'glutenvrij_brood', 'wrap_volkoren', 'tortillawrap_mais',
      'tortilla_mais_klein', 'pita_volkoren', 'naan_brood', 'ciabatta', 'rijstwafels',
      'rijstcrackers', 'boekweit_pannenkoek', 'injera'
    ],
    '🌾 5. Droge waar — granen, peulvruchten, conserven': [
      'havermout', 'gv_havermout', 'rijst_basmati_droog', 'rijst_volkoren_droog', 'rijst_jasmine_droog',
      'pasta_droog', 'pasta_volkoren_droog', 'rijstpasta_droog', 'boekweitpasta_droog',
      'linzenpasta_droog', 'kikkererwtenpasta_droog',
      'quinoa_droog', 'couscous_droog', 'bulgur_droog', 'boekweit_droog', 'freekeh_droog',
      'fonio_droog', 'teff_droog', 'maismeel', 'kokosmeel', 'maizena', 'polenta_droog',
      'rijstnoedels_droog', 'udonnoedels_droog', 'soba_noedels_droog',
      'tonijn_blik_water', 'sardientjes_blik', 'ansjovis_blik',
      'linzen_gekookt', 'kikkererwten_gekookt', 'zwarte_bonen_gekookt', 'rode_kidneybonen',
      'pintobonen', 'rode_linzen_droog', 'groene_linzen_droog', 'edamame',
      'kokosmelk_blik', 'kokosroom',
      'amandelen', 'walnoten', 'cashewnoten', 'pistachenoten', "pinda's",
      'pindakaas_100pct', 'amandelpasta', 'tahini', 'lijnzaad', 'chiazaad',
      'zonnebloempitten', 'pompoenpitten', 'sesamzaad',
      'rozijnen', 'dadels', 'abrikozen_gedroogd', 'honing', 'ahornsiroop'
    ],
    '🧊 6. Diepvries': [
      'diepvries_spinazie', 'diepvries_broccoli', 'diepvries_groentemix', 'diepvries_bessen'
    ],
    '🌶️ 7. Specerijen, sauzen & kruiden': [
      'soyasaus', 'oestersaus', 'miso_pasta', 'rode_currypasta', 'groene_currypasta',
      'harissa', 'mosterd', 'salsa_verde', 'passata_tomatensaus', 'tomatenpuree',
      'zongedroogde_tomaten', 'berbere_kruiden', 'ras_el_hanout',
      'nigeriaanse_pepersoep_kruiden', 'voedingsgist', 'scotch_bonnet_peper'
    ],
    '🫒 8. Oliën & vetten': [
      'olijfolie', 'raapzaadolie', 'sesamolie', 'kokosolie', 'rode_palmoolie'
    ],
    '💊 9. Supplementen': [
      'whey_concentraat', 'whey_isolaat', 'caseine', 'soja_eiwitpoeder', 'erwten_eiwitpoeder',
      'noten_eiwitpoeder', 'ricepoeder_eiwit'
    ]
  };
  const lijst = {};
  Object.entries(supermarktCategorieën).forEach(([cat, items]) => {
    const inThisCat = items
      .filter(i => totalen[i] !== undefined && totalen[i] > 0)
      .map(i => ({
        item: i, naam: formatIngredientName(i),
        gram: Math.round(totalen[i]), per_stuk: ingrDB[i]?.per_stuk || false
      }))
      .sort((a, b) => a.naam.localeCompare(b.naam));
    if (inThisCat.length > 0) lijst[cat] = inThisCat;
  });
  return lijst;
};

// =============================================================================
// REACT COMPONENT
// =============================================================================

export default function HandbalVoedingstoolV2() {
  const DEFAULT_INPUT = {
    gewicht: 80, lengte: 185, leeftijd: 22, geslacht: 'man', vetpct: '',
    handbalPerWeek: 3, handbalDuur: 1.5, krachtPerWeek: 2, krachtDuur: 1.0,
    cardioPerWeek: 0, cardioDuur: 1.0,
    // Intensiteitsinstellingen voor correcte MET-berekening
    handbalIntensiteit: 'gemiddeld',   // 'licht' | 'gemiddeld' | 'zwaar'
    krachtIntensiteit: 'gemiddeld',    // 'licht' | 'gemiddeld' | 'zwaar'
    cardioIntensiteit: 'onderhoud',    // 'onderhoud' | 'zwaar'
    doel: 'maintain', eetmomenten: 4, boodschappen: 2,
    keuken: 'belgisch_nederlands',
    fase: 'in_season',
    trainingMoment: 'avond',
    quotaVegetarisch: 0, quotaVegan: 0, quotaGlutenvrij: 0, quotaLactosevrij: 0,
    nietLekker: '', voorkeuren: '',
    allergieen: [],
    matchTijd: '19:30', matchDuur: 60,
    budgetMode: false, flexMeal: false, mentaalOptIn: false, seizoenFilter: true
  };

  // Auto-herstel van lokale state na refresh (via localStorage)
  const [input, setInput] = useState(() => {
    try {
      const saved = window.localStorage && window.localStorage.getItem('hb-input-v12');
      if (saved) return { ...DEFAULT_INPUT, ...JSON.parse(saved) };
    } catch(e) {}
    return DEFAULT_INPUT;
  });
  const [activeTab, setActiveTab] = useState('dagschema');
  const [activeDay, setActiveDay] = useState('handbaldag');
  const [trainingsdagen, setTrainingsdagen] = useState(() => {
    try {
      const saved = window.localStorage && window.localStorage.getItem('hb-trainingsdagen-v12');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return ['handbaldag', 'krachtdag', 'handbaldag', 'rustdag', 'kracht_handbal', 'wedstrijddag', 'rustdag'];
  });

  // Profielen-state
  const [profielenLijst, setProfielenLijst] = useState([]);
  const [actiefProfielNaam, setActiefProfielNaam] = useState('');
  const [profielModalOpen, setProfielModalOpen] = useState(false);
  const [nieuweProfielNaam, setNieuweProfielNaam] = useState('');
  const [profielenLaden, setProfielenLaden] = useState(true);

  // Recipe detail modal
  const [openRecept, setOpenRecept] = useState(null);

  // TRACKING state
  const [trackingLogs, setTrackingLogs] = useState([]); // [{ datum: '2026-01-15', gewicht: 80.5, herstel: 8, notitie: '' }]
  const [trackingNieuw, setTrackingNieuw] = useState({
    datum: new Date().toISOString().slice(0, 10),
    gewicht: '', herstel: 7, notitie: ''
  });

  // Favorieten + blokkeer-lijst
  const [favorieten, setFavorieten] = useState([]); // array of recept-IDs
  const [geblokkeerd, setGeblokkeerd] = useState({}); // { recept_id: 'YYYY-MM-DD' (vervaldatum) }

  // Recepten-overzicht filters
  const [recipeFilter, setRecipeFilter] = useState({
    zoek: '', type: 'alle', keuken: 'alle', eiwitNiveau: 'alle',
    maxKooktijd: 0, glutenvrij: false, lactosevrij: false,
    alleenFavorieten: false, toonGeblokkeerd: false
  });

  // Adherence-tracking: per profiel een mapping { 'YYYY-MM-DD-mealIndex': 'gegeten' | 'afgeweken' }
  const [adherence, setAdherence] = useState({});
  const [adherenceNotitie, setAdherenceNotitie] = useState({});

  // Hydratatie-tracking: sweat-rate metingen
  const [sweatMetingen, setSweatMetingen] = useState([]);   // [{ datum, gewichtVoor, gewichtNa, dronken, duurMin, type }]
  const [sweatNieuw, setSweatNieuw] = useState({
    gewichtVoor: '', gewichtNa: '', dronken: 0, duurMin: 60, type: 'training_zwaar'
  });

  // Wizard state — toon wizard bij eerste bezoek (geen profiel + niet expliciet uitgezet)
  const [wizardStap, setWizardStap] = useState(null);   // null = niet actief, 1-3 = actieve stap
  const [wizardKlaar, setWizardKlaar] = useState(false);
  const [verfijnZichtbaar, setVerfijnZichtbaar] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);
  const [walkthroughStap, setWalkthroughStap] = useState(0);
  const [walkthroughPersoon, setWalkthroughPersoon] = useState(null); // 'tim' | 'sarah'
  const [voeding101Open, setVoeding101Open] = useState(false);
  const [taal, setTaal] = useState('nl');
  const t = useT(taal);
  const KL = taal === 'en' ? KEUKEN_LABELS_EN : KEUKEN_LABELS_NL;
  const MLTYPES = MAALTIJDTYPE_LABELS[taal] || MAALTIJDTYPE_LABELS.nl;
  const DAGNAMEN = DAG_NAMEN[taal] || DAG_NAMEN.nl;

  // Bij eerste mount: open wizard als er geen actief profiel is en de gebruiker hem niet eerder afgesloten heeft
  useEffect(() => {
    const heeftEerderGesloten = window.localStorage ? window.localStorage.getItem('hb-wizard-gesloten') : null;
    if (!actiefProfielNaam && !heeftEerderGesloten && !wizardKlaar) {
      setWizardStap(1);
    }
  }, []);

  const sluitWizard = () => {
    setWizardStap(null);
    setWizardKlaar(true);
    if (window.localStorage) {
      try { window.localStorage.setItem('hb-wizard-gesloten', '1'); } catch (e) {}
    }
  };

  // Vervang-modal state: { dagIndex, maaltijdIndex, alternatieven }
  const [swapModal, setSwapModal] = useState(null);

  // Overrides per dagtype + maaltijdIndex
  // Structure: { [dagtype]: { [maaltijdIndex]: receptId } } voor dagschema
  // Voor weekschema: { [dagIndex]: { [maaltijdIndex]: receptId } }
  const [dagOverrides, setDagOverrides] = useState({});
  const [weekOverrides, setWeekOverrides] = useState({});

  // PDF status
  const [pdfBezig, setPdfBezig] = useState(false);

  const u = (k, v) => setInput(p => ({ ...p, [k]: v }));

  // -------- PROFIELEN-OPSLAG via window.storage --------
  // Auto-bewaar input bij elke wijziging (localStorage)
  React.useEffect(() => {
    try {
      if (window.localStorage) {
        window.localStorage.setItem('hb-input-v12', JSON.stringify(input));
        window.localStorage.setItem('hb-trainingsdagen-v12', JSON.stringify(trainingsdagen));
      }
    } catch(e) {}
  }, [input, trainingsdagen]);

  const laadProfielenLijst = async () => {
    setProfielenLaden(true);
    try {
      const result = await window.storage.list('profile:');
      if (result && result.keys) {
        const namen = result.keys.map(k => k.replace('profile:', ''));
        setProfielenLijst(namen);
      } else {
        setProfielenLijst([]);
      }
    } catch (err) {
      console.error('Storage list error:', err);
      setProfielenLijst([]);
    }
    setProfielenLaden(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.storage) {
      laadProfielenLijst();
    } else {
      setProfielenLaden(false);
    }
  }, []);

  const opslaanProfiel = async (naam) => {
    if (!naam || !naam.trim()) return;
    const cleanNaam = naam.trim().replace(/[^a-zA-Z0-9_-]/g, '_');
    try {
      await window.storage.set(
        `profile:${cleanNaam}`,
        JSON.stringify({ input, trainingsdagen, savedAt: new Date().toISOString() })
      );
      // Save tracking logs apart
      if (trackingLogs.length > 0) {
        await window.storage.set(
          `tracking:${cleanNaam}`,
          JSON.stringify(trackingLogs)
        );
      }
      setActiefProfielNaam(cleanNaam);
      await laadProfielenLijst();
      setProfielModalOpen(false);
      setNieuweProfielNaam('');
    } catch (err) {
      console.error('Save error:', err);
      alert('Kon profiel niet opslaan: ' + err.message);
    }
  };

  const laadProfiel = async (naam) => {
    try {
      const result = await window.storage.get(`profile:${naam}`);
      if (result && result.value) {
        const data = JSON.parse(result.value);
        if (data.input) setInput({ ...DEFAULT_INPUT, ...data.input });
        if (data.trainingsdagen) setTrainingsdagen(data.trainingsdagen);
        setActiefProfielNaam(naam);
      }
      // Laad tracking logs (kan ontbreken, dat is OK)
      try {
        const trackingResult = await window.storage.get(`tracking:${naam}`);
        if (trackingResult && trackingResult.value) {
          setTrackingLogs(JSON.parse(trackingResult.value));
        } else {
          setTrackingLogs([]);
        }
      } catch (te) {
        setTrackingLogs([]);
      }
      // Laad favorieten
      try {
        const favResult = await window.storage.get(`favorieten:${naam}`);
        if (favResult && favResult.value) {
          setFavorieten(JSON.parse(favResult.value));
        } else {
          setFavorieten([]);
        }
      } catch (e) {
        setFavorieten([]);
      }
      // Laad geblokkeerd
      try {
        const blokResult = await window.storage.get(`geblokkeerd:${naam}`);
        if (blokResult && blokResult.value) {
          setGeblokkeerd(JSON.parse(blokResult.value));
        } else {
          setGeblokkeerd({});
        }
      } catch (e) {
        setGeblokkeerd({});
      }
      // Laad adherence
      try {
        const adhResult = await window.storage.get(`adherence:${naam}`);
        if (adhResult && adhResult.value) {
          const data = JSON.parse(adhResult.value);
          setAdherence(data.status || {});
          setAdherenceNotitie(data.notitie || {});
        } else {
          setAdherence({});
          setAdherenceNotitie({});
        }
      } catch (e) {
        setAdherence({});
        setAdherenceNotitie({});
      }
      // Laad sweat-metingen
      try {
        const sweatResult = await window.storage.get(`sweat:${naam}`);
        if (sweatResult && sweatResult.value) {
          setSweatMetingen(JSON.parse(sweatResult.value));
        } else {
          setSweatMetingen([]);
        }
      } catch (e) {
        setSweatMetingen([]);
      }
    } catch (err) {
      console.error('Load error:', err);
      alert('Kon profiel niet laden.');
    }
  };

  const verwijderProfiel = async (naam) => {
    if (!confirm(`Profiel "${naam}" verwijderen?`)) return;
    try {
      await window.storage.delete(`profile:${naam}`);
      try { await window.storage.delete(`tracking:${naam}`); } catch (e) {}
      try { await window.storage.delete(`favorieten:${naam}`); } catch (e) {}
      try { await window.storage.delete(`geblokkeerd:${naam}`); } catch (e) {}
      try { await window.storage.delete(`adherence:${naam}`); } catch (e) {}
      try { await window.storage.delete(`sweat:${naam}`); } catch (e) {}
      if (actiefProfielNaam === naam) {
        setActiefProfielNaam('');
        setTrackingLogs([]);
        setFavorieten([]);
        setGeblokkeerd({});
        setAdherence({});
        setAdherenceNotitie({});
        setSweatMetingen([]);
      }
      await laadProfielenLijst();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // -------- FAVORIETEN & BLOKKEER --------
  const isFavoriet = (receptId) => favorieten.includes(receptId);
  const isGeblokkeerd = (receptId) => {
    const vervalDatum = geblokkeerd[receptId];
    if (!vervalDatum) return false;
    return new Date() < new Date(vervalDatum);
  };

  const toggleFavoriet = async (receptId) => {
    let nieuw;
    if (isFavoriet(receptId)) {
      nieuw = favorieten.filter(id => id !== receptId);
    } else {
      nieuw = [...favorieten, receptId];
    }
    setFavorieten(nieuw);
    if (actiefProfielNaam && window.storage) {
      try {
        await window.storage.set(`favorieten:${actiefProfielNaam}`, JSON.stringify(nieuw));
      } catch (e) { console.error(e); }
    }
  };

  const blokkeerRecept = async (receptId, weken = 4) => {
    const vervalDatum = new Date();
    vervalDatum.setDate(vervalDatum.getDate() + weken * 7);
    const datumStr = vervalDatum.toISOString().slice(0, 10);
    const nieuw = { ...geblokkeerd, [receptId]: datumStr };
    setGeblokkeerd(nieuw);
    if (actiefProfielNaam && window.storage) {
      try {
        await window.storage.set(`geblokkeerd:${actiefProfielNaam}`, JSON.stringify(nieuw));
      } catch (e) { console.error(e); }
    }
  };

  const deBlokkeerRecept = async (receptId) => {
    const nieuw = { ...geblokkeerd };
    delete nieuw[receptId];
    setGeblokkeerd(nieuw);
    if (actiefProfielNaam && window.storage) {
      try {
        await window.storage.set(`geblokkeerd:${actiefProfielNaam}`, JSON.stringify(nieuw));
      } catch (e) { console.error(e); }
    }
  };

  // Auto-cleanup van verlopen blokkeringen — bij elke render
  useEffect(() => {
    const nu = new Date();
    let veranderd = false;
    const opgeschoond = {};
    Object.entries(geblokkeerd).forEach(([id, datum]) => {
      if (new Date(datum) > nu) {
        opgeschoond[id] = datum;
      } else {
        veranderd = true;
      }
    });
    if (veranderd) {
      setGeblokkeerd(opgeschoond);
      if (actiefProfielNaam && window.storage) {
        window.storage.set(`geblokkeerd:${actiefProfielNaam}`, JSON.stringify(opgeschoond)).catch(() => {});
      }
    }
  }, []);

  // Helper: aantal actief geblokkeerde recepten
  const aantalGeblokkeerd = Object.entries(geblokkeerd).filter(([, datum]) => new Date(datum) > new Date()).length;

  // -------- ADHERENCE --------
  const adherenceKey = (datum, idx) => `${datum}-${idx}`;
  const getAdherence = (datum, idx) => adherence[adherenceKey(datum, idx)] || null;

  const setAdherenceVoor = async (datum, idx, status, notitie = '') => {
    const key = adherenceKey(datum, idx);
    let nieuw;
    if (status === null) {
      nieuw = { ...adherence };
      delete nieuw[key];
    } else {
      nieuw = { ...adherence, [key]: status };
    }
    setAdherence(nieuw);

    let nieuwNotitie = adherenceNotitie;
    if (notitie) {
      nieuwNotitie = { ...adherenceNotitie, [key]: notitie };
      setAdherenceNotitie(nieuwNotitie);
    } else if (status === null) {
      nieuwNotitie = { ...adherenceNotitie };
      delete nieuwNotitie[key];
      setAdherenceNotitie(nieuwNotitie);
    }

    if (actiefProfielNaam && window.storage) {
      try {
        await window.storage.set(`adherence:${actiefProfielNaam}`, JSON.stringify({ status: nieuw, notitie: nieuwNotitie }));
      } catch (e) { console.error(e); }
    }
  };

  // Adherence-score over laatste 7 dagen
  const adherence7d = useMemo(() => {
    const today = new Date();
    const dagen = [];
    for (let d = 0; d < 7; d++) {
      const dat = new Date(today);
      dat.setDate(dat.getDate() - d);
      dagen.push(dat.toISOString().slice(0, 10));
    }
    let gepland = 0, gegeten = 0, afgeweken = 0;
    Object.entries(adherence).forEach(([key, status]) => {
      const datum = key.slice(0, 10);
      if (dagen.includes(datum)) {
        gepland++;
        if (status === 'gegeten') gegeten++;
        else if (status === 'afgeweken') afgeweken++;
      }
    });
    if (gepland === 0) return null;
    return {
      score: Math.round((gegeten / gepland) * 100),
      gegeten, afgeweken, totaal: gepland
    };
  }, [adherence]);

  // -------- GEWICHTSTRENDKOPPELING --------
  // Sweet spot voor bulk: 0.5–1% lichaamsgewicht per maand
  // Bron: Helms et al. 2014 (muscle gain rate), NSCA recommendations
  const gewichtsTrend = useMemo(() => {
    if (trackingLogs.length < 2) return null;
    const gesorteerd = [...trackingLogs]
      .filter(l => l.gewicht)
      .sort((a, b) => new Date(a.datum) - new Date(b.datum));
    if (gesorteerd.length < 2) return null;

    // Neem eerste en laatste meting — bij voorkeur minstens 2 weken apart
    const eerste = gesorteerd[0];
    const laatste = gesorteerd[gesorteerd.length - 1];
    const dagenVerschil = (new Date(laatste.datum) - new Date(eerste.datum)) / (1000 * 60 * 60 * 24);
    if (dagenVerschil < 7) return null; // te weinig data

    const gewichtsDelta = laatste.gewicht - eerste.gewicht; // kg
    const deltaPerMaand = (gewichtsDelta / dagenVerschil) * 30;
    const deltaPercentPerMaand = (deltaPerMaand / input.gewicht) * 100;

    // Sweet spot grenzen
    const minPct = 0.5; // % per maand
    const maxPct = 1.0;
    const minKg = (minPct / 100) * input.gewicht;
    const maxKg = (maxPct / 100) * input.gewicht;

    // Kcal-correctie op basis van trend vs doel
    let kcalCorrectie = 0;
    let status = 'ok';
    let advies = '';

    if (input.doel === 'bulk') {
      if (deltaPercentPerMaand < minPct) {
        kcalCorrectie = deltaPercentPerMaand < 0 ? +200 : +125;
        status = 'te_weinig';
        advies = deltaPercentPerMaand < 0
          ? `Gewicht daalt (${deltaPerMaand.toFixed(2)} kg/maand) terwijl doel bulk is → +200 kcal/dag`
          : `Toename te traag (${deltaPercentPerMaand.toFixed(2)}%/maand, doel ≥${minPct}%) → +125 kcal/dag`;
      } else if (deltaPercentPerMaand > maxPct) {
        kcalCorrectie = -150;
        status = 'te_snel';
        advies = `Toename te snel (${deltaPercentPerMaand.toFixed(2)}%/maand > ${maxPct}% sweet spot) → risico op vettoename → −150 kcal/dag`;
      } else {
        status = 'ok';
        advies = `Gewichtstoename in sweet spot (${deltaPercentPerMaand.toFixed(2)}%/maand) — plan behouden`;
      }
    } else if (input.doel === 'cut') {
      // Voor cut: check of ≈ 0.5-1% verlies per maand (niet te snel, niet te traag)
      if (deltaPercentPerMaand > -minPct) {
        kcalCorrectie = -150;
        status = 'te_weinig';
        advies = `Gewichtsverlies te traag (${deltaPercentPerMaand.toFixed(2)}%/maand) → −150 kcal/dag`;
      } else if (deltaPercentPerMaand < -maxPct * 1.5) {
        kcalCorrectie = +150;
        status = 'te_snel';
        advies = `Gewichtsverlies te snel (${deltaPercentPerMaand.toFixed(2)}%/maand) → risico op spierverlies → +150 kcal/dag`;
      } else {
        status = 'ok';
        advies = `Gewichtsverlies in gezond tempo (${deltaPercentPerMaand.toFixed(2)}%/maand) — plan behouden`;
      }
    }

    return {
      deltaKgPerMaand: Math.round(deltaPerMaand * 100) / 100,
      deltaPctPerMaand: Math.round(deltaPercentPerMaand * 100) / 100,
      kcalCorrectie,
      status,
      advies,
      aantalMetingen: gesorteerd.length,
      dagenGevolgd: Math.round(dagenVerschil),
      minKgPerMaand: Math.round(minKg * 100) / 100,
      maxKgPerMaand: Math.round(maxKg * 100) / 100,
    };
  }, [trackingLogs, input.gewicht, input.doel]);

  // -------- HYDRATATIE / SWEAT-RATE --------
  // Bereken sweat-rate van een meting in L/uur
  const berekenSweatRate = (m) => {
    if (!m.gewichtVoor || !m.gewichtNa || !m.duurMin) return null;
    const verlies = m.gewichtVoor - m.gewichtNa + (m.dronken / 1000);  // kg
    return verlies / (m.duurMin / 60);   // L/u
  };

  // Persoonlijke sweat-rate (gewogen gemiddelde van alle metingen — recent zwaarder)
  const persoonlijkeSweatRate = useMemo(() => {
    if (sweatMetingen.length === 0) return null;
    const recent = sweatMetingen.slice(-5);   // laatste 5 metingen
    let som = 0, gewichten = 0;
    recent.forEach((m, i) => {
      const sr = berekenSweatRate(m);
      if (sr === null || sr <= 0) return;
      const w = i + 1;   // recente metingen zwaarder
      som += sr * w;
      gewichten += w;
    });
    return gewichten > 0 ? som / gewichten : null;
  }, [sweatMetingen]);

  // Sweat-rate per training-type (factor)
  const SWEAT_TYPE_FACTORS = {
    'training_licht': 0.7,    // technisch, weinig zweet
    'training_normaal': 1.0,
    'training_zwaar': 1.2,    // zware conditie
    'match': 1.3,             // wedstrijd, hoge intensiteit
    'kracht': 0.8             // kracht is minder zweet dan cardio
  };

  // Persoonlijke vochtaanbeveling per training-sessie
  const persoonlijkAdvies = useMemo(() => {
    if (!persoonlijkeSweatRate) return null;
    const baseDuurUur = (input.handbalDuur || 90) / 60;
    const advies = {};
    Object.entries(SWEAT_TYPE_FACTORS).forEach(([type, factor]) => {
      const verwacht = persoonlijkeSweatRate * factor * baseDuurUur;
      advies[type] = {
        sweatRate: persoonlijkeSweatRate * factor,
        verwachtVerlies: verwacht,
        // Aanbeveling: 75% compenseren tijdens, 125% replenish na
        tijdens: Math.round(verwacht * 0.75 * 1000),     // ml
        na: Math.round(verwacht * 1.25 * 1000)           // ml
      };
    });
    return advies;
  }, [persoonlijkeSweatRate, input.handbalDuur]);

  const voegSweatMetingToe = async () => {
    if (!sweatNieuw.gewichtVoor || !sweatNieuw.gewichtNa) {
      alert('Voer gewicht voor en na in.');
      return;
    }
    const meting = {
      datum: new Date().toISOString().slice(0, 10),
      gewichtVoor: parseFloat(sweatNieuw.gewichtVoor),
      gewichtNa: parseFloat(sweatNieuw.gewichtNa),
      dronken: parseFloat(sweatNieuw.dronken) || 0,
      duurMin: parseInt(sweatNieuw.duurMin) || 60,
      type: sweatNieuw.type
    };
    const nieuw = [...sweatMetingen, meting];
    setSweatMetingen(nieuw);
    setSweatNieuw({ gewichtVoor: '', gewichtNa: '', dronken: 0, duurMin: 60, type: 'training_zwaar' });
    if (actiefProfielNaam && window.storage) {
      try { await window.storage.set(`sweat:${actiefProfielNaam}`, JSON.stringify(nieuw)); }
      catch (e) { console.error(e); }
    }
  };

  const verwijderSweatMeting = async (idx) => {
    const nieuw = sweatMetingen.filter((_, i) => i !== idx);
    setSweatMetingen(nieuw);
    if (actiefProfielNaam && window.storage) {
      try { await window.storage.set(`sweat:${actiefProfielNaam}`, JSON.stringify(nieuw)); }
      catch (e) { console.error(e); }
    }
  };


  const voegTrackingToeIn = async () => {
    if (!trackingNieuw.gewicht) { alert('Voer een gewicht in.'); return; }
    const nieuw = {
      datum: trackingNieuw.datum,
      gewicht: parseFloat(trackingNieuw.gewicht),
      herstel: parseInt(trackingNieuw.herstel),
      notitie: trackingNieuw.notitie
    };
    // Vervang als datum al bestaat
    const filtered = trackingLogs.filter(l => l.datum !== nieuw.datum);
    const nieuweLogs = [...filtered, nieuw].sort((a, b) => a.datum.localeCompare(b.datum));
    setTrackingLogs(nieuweLogs);
    // Auto-save als profiel actief
    if (actiefProfielNaam && window.storage) {
      try {
        await window.storage.set(`tracking:${actiefProfielNaam}`, JSON.stringify(nieuweLogs));
      } catch (e) { console.error(e); }
    }
    setTrackingNieuw({ datum: new Date().toISOString().slice(0, 10), gewicht: '', herstel: 7, notitie: '' });
  };

  const verwijderTracking = async (datum) => {
    const nieuweLogs = trackingLogs.filter(l => l.datum !== datum);
    setTrackingLogs(nieuweLogs);
    if (actiefProfielNaam && window.storage) {
      try {
        await window.storage.set(`tracking:${actiefProfielNaam}`, JSON.stringify(nieuweLogs));
      } catch (e) {}
    }
  };

  // Genereer tracking-suggesties op basis van trends
  const trackingSuggesties = useMemo(() => {
    if (trackingLogs.length < 4) return [];
    const sugg = [];

    // Eerst: als adherence laag is, waarschuw dat trends onbetrouwbaar zijn
    if (adherence7d && adherence7d.score < 60) {
      sugg.push({
        type: 'adherence', niveau: 'let_op',
        tekst: `Plan-adherence is ${adherence7d.score}% — onder 60%. Gewichts- en hersteltrends die hieronder volgen zijn minder betrouwbaar omdat je niet consistent volgens plan eet. Voor we het plan aanpassen: kun je het plan beter laten aansluiten op je leefstijl (porties, recepten, timing)?`
      });
    }

    const recent = trackingLogs.slice(-14); // laatste 14 dagen
    if (recent.length < 4) return sugg;

    // Gewicht trend: lineaire regressie van gewicht over tijd
    const gewichten = recent.map(l => l.gewicht);
    const gemiddeld = gewichten.reduce((s, g) => s + g, 0) / gewichten.length;
    const eersteHelft = gewichten.slice(0, Math.floor(gewichten.length / 2));
    const tweedeHelft = gewichten.slice(Math.floor(gewichten.length / 2));
    const gem1 = eersteHelft.reduce((s, g) => s + g, 0) / eersteHelft.length;
    const gem2 = tweedeHelft.reduce((s, g) => s + g, 0) / tweedeHelft.length;
    const dagenSpan = Math.max(1, (new Date(recent[recent.length - 1].datum) - new Date(recent[0].datum)) / (1000 * 60 * 60 * 24));
    const veranderPerWeek = ((gem2 - gem1) / (dagenSpan / 2)) * 7;

    // Doel: bulk = +0.25-0.5 kg/week, cut = -0.5-1.0 kg/week, maintain = ±0.2 kg/week
    if (input.doel === 'bulk') {
      if (veranderPerWeek > 0.6) {
        sugg.push({ type: 'gewicht', niveau: 'let_op', tekst: `Je gewicht stijgt ${veranderPerWeek.toFixed(2)} kg/week — sneller dan ideaal voor bulk (0.25-0.5 kg/week). Overweeg ~150 kcal/dag minder, vooral CH.` });
      } else if (veranderPerWeek < 0.1) {
        sugg.push({ type: 'gewicht', niveau: 'let_op', tekst: `Gewicht stijgt slechts ${veranderPerWeek.toFixed(2)} kg/week — te traag voor bulk. Verhoog kcal met ~150-200/dag.` });
      } else {
        sugg.push({ type: 'gewicht', niveau: 'goed', tekst: `Gewichtstoename ${veranderPerWeek.toFixed(2)} kg/week — perfect voor bulk. Houd vol.` });
      }
    } else if (input.doel === 'cut') {
      if (veranderPerWeek < -1.0) {
        sugg.push({ type: 'gewicht', niveau: 'rode_vlag', tekst: `Gewicht daalt ${Math.abs(veranderPerWeek).toFixed(2)} kg/week — te snel. Risico op spierverlies. Verhoog kcal met ~200/dag.` });
      } else if (veranderPerWeek > -0.2) {
        sugg.push({ type: 'gewicht', niveau: 'let_op', tekst: `Gewicht daalt slechts ${Math.abs(veranderPerWeek).toFixed(2)} kg/week — te traag. Overweeg ~150 kcal/dag minder of trainingsvolume ↑.` });
      } else {
        sugg.push({ type: 'gewicht', niveau: 'goed', tekst: `Gewichtsverlies ${Math.abs(veranderPerWeek).toFixed(2)} kg/week — gezond cuttempo. Houd vol.` });
      }
    } else {
      if (Math.abs(veranderPerWeek) > 0.4) {
        sugg.push({ type: 'gewicht', niveau: 'let_op', tekst: `Gewicht verandert ${veranderPerWeek > 0 ? '+' : ''}${veranderPerWeek.toFixed(2)} kg/week ondanks maintain-doel. Pas kcal aan met ${Math.round(veranderPerWeek * 250)}/dag.` });
      }
    }

    // Herstel-score
    const herstelGem = recent.reduce((s, l) => s + l.herstel, 0) / recent.length;
    if (herstelGem < 5) {
      sugg.push({ type: 'herstel', niveau: 'rode_vlag', tekst: `Gemiddelde herstel-score ${herstelGem.toFixed(1)}/10 — laag. Mogelijke oorzaken: te lage kcal-inname (vooral CH), slaaptekort, te hoge trainingsbelasting. Overweeg overleg met sportdiëtist.` });
    } else if (herstelGem < 6.5) {
      sugg.push({ type: 'herstel', niveau: 'let_op', tekst: `Gemiddelde herstel-score ${herstelGem.toFixed(1)}/10 — middelmatig. Probeer 0.5-1 g/kg extra CH op trainingsdagen en check je slaapkwaliteit.` });
    } else {
      sugg.push({ type: 'herstel', niveau: 'goed', tekst: `Herstel-score gemiddeld ${herstelGem.toFixed(1)}/10 — goed niveau. Trainingsbelasting en voeding lijken in balans.` });
    }

    return sugg;
  }, [trackingLogs, input.doel, adherence7d]);


  // Helper: pas een override toe op een maaltijd
  const applyOverrideToMaaltijd = (m, override) => {
    if (!override) return m;
    const recept = RECIPES_DB.recepten.find(r => r.id === override);
    if (!recept) return m;
    const geschaald = schaalRecept(recept, { kcal: m.kcal, eiwitG: m.eiwitG, chG: m.chG, vetG: m.vetG });
    return { ...m, recept: geschaald };
  };

  // -------- AFGELEIDE DATA (memoized) --------
  const dagSchema = useMemo(() => {
    try {
      const result = genereerDagSchema(
        { ...input, vetpct: input.vetpct ? parseFloat(input.vetpct) : null,
          _favorieten: favorieten, _geblokkeerd: geblokkeerd,
          _kcalCorrectie: gewichtsTrend ? gewichtsTrend.kcalCorrectie : 0 },
        activeDay
      );
      const overrides = dagOverrides[activeDay] || {};
      result.maaltijden = result.maaltijden.map((m, idx) =>
        applyOverrideToMaaltijd(m, overrides[idx])
      );
      return result;
    } catch (e) { console.error(e); return null; }
  }, [input, activeDay, dagOverrides, favorieten, geblokkeerd, gewichtsTrend]);

  const weekSchema = useMemo(() => {
    try {
      const week = genereerWeekschema(
        { ...input, vetpct: input.vetpct ? parseFloat(input.vetpct) : null,
          _favorieten: favorieten, _geblokkeerd: geblokkeerd,
          _kcalCorrectie: gewichtsTrend ? gewichtsTrend.kcalCorrectie : 0 },
        trainingsdagen,
        taal
      );
      week.forEach((dag, di) => {
        const overrides = weekOverrides[di] || {};
        dag.maaltijden = dag.maaltijden.map((m, mi) =>
          applyOverrideToMaaltijd(m, overrides[mi])
        );
      });
      return week;
    } catch (e) { console.error(e); return null; }
  }, [input, trainingsdagen, weekOverrides, favorieten, geblokkeerd, taal, gewichtsTrend]);

  const boodschappen = useMemo(() => {
    if (!weekSchema) return null;
    return genereerBoodschappen(weekSchema, RECIPES_DB.ingredienten_database);
  }, [weekSchema]);

  const supplementen = useMemo(() => genereerSupplementen({
    ...input, vetpct: input.vetpct ? parseFloat(input.vetpct) : null
  }), [input]);

  // -------- SWAP / ALTERNATIEVEN --------
  const openSwap = (context, dagIndex, maaltijdIndex, maaltijd) => {
    // Bepaal de target macros + categorie + recepttype voor deze maaltijd
    const target = { kcal: maaltijd.kcal, eiwitG: maaltijd.eiwitG, chG: maaltijd.chG, vetG: maaltijd.vetG };
    const recepttype = maaltijd.recepttype || maaltijd.type;
    const categoriePref = maaltijd.categoriePref || 'normaal';
    const nietLekker = parseNietLekker(input.nietLekker || '');
    const voorkeuren = parseVoorkeuren(input.voorkeuren || '');
    // Excludeer huidig recept van alternatieven
    const huidigeId = maaltijd.recept ? maaltijd.recept.id : null;
    const alternatieven = selecteerRecept(
      target, recepttype, categoriePref, nietLekker, voorkeuren,
      input.boodschappen, huidigeId ? [huidigeId] : [],
      input.keuken, 4, input.allergieen || [],
      input.seizoenFilter, input.budgetMode,
      favorieten, geblokkeerd
    );
    if (!Array.isArray(alternatieven) || alternatieven.length === 0) {
      alert('Geen alternatieven beschikbaar voor deze maaltijd. Probeer minder restricties of een andere keuken.');
      return;
    }
    setSwapModal({
      context, dagIndex, maaltijdIndex,
      huidig: maaltijd.recept,
      alternatieven: alternatieven.slice(0, 3),
      target
    });
  };

  const kiesAlternatief = (alternatief) => {
    if (!swapModal) return;
    const { context, dagIndex, maaltijdIndex } = swapModal;
    if (context === 'dag') {
      setDagOverrides(prev => ({
        ...prev,
        [activeDay]: { ...(prev[activeDay] || {}), [maaltijdIndex]: alternatief.id }
      }));
    } else if (context === 'week') {
      setWeekOverrides(prev => ({
        ...prev,
        [dagIndex]: { ...(prev[dagIndex] || {}), [maaltijdIndex]: alternatief.id }
      }));
    }
    setSwapModal(null);
  };

  const resetOverride = (context, dagIndex, maaltijdIndex) => {
    if (context === 'dag') {
      setDagOverrides(prev => {
        const newDay = { ...(prev[activeDay] || {}) };
        delete newDay[maaltijdIndex];
        return { ...prev, [activeDay]: newDay };
      });
    } else if (context === 'week') {
      setWeekOverrides(prev => {
        const newDay = { ...(prev[dagIndex] || {}) };
        delete newDay[maaltijdIndex];
        return { ...prev, [dagIndex]: newDay };
      });
    }
  };

  // Helper: heeft een maaltijd een override
  const heeftOverride = (context, dagIndex, maaltijdIndex) => {
    if (context === 'dag') {
      return !!(dagOverrides[activeDay] && dagOverrides[activeDay][maaltijdIndex]);
    }
    return !!(weekOverrides[dagIndex] && weekOverrides[dagIndex][maaltijdIndex]);
  };

  // -------- HTML EXPORT (download als printbaar HTML-bestand) --------
  const exportPDF = () => {
    // Haal data op
    const schema = dagSchema;
    const week = weekSchema;

    if (!schema || !week) {
      alert(taal === 'en'
        ? 'Fill in your profile first (weight, height, age) so a plan can be generated.'
        : 'Vul eerst je profiel in (gewicht, lengte, leeftijd) zodat een plan gegenereerd wordt.');
      return;
    }

    setPdfBezig(true);

    try {
      const isEN = taal === 'en';
      const profiel = schema.profiel || {};
      const doelen = schema.doelen || {};

      // ── HEADER ──────────────────────────────────────────────────────────
      const title = (actiefProfielNaam ? actiefProfielNaam + ' — ' : '') + (isEN ? 'Handball Nutrition Plan' : 'Handbal Voedingsplan');
      const dateStr = new Date().toLocaleDateString('nl-BE', { day: '2-digit', month: 'long', year: 'numeric' });

      let html = '<!DOCTYPE html><html lang="' + (isEN ? 'en' : 'nl') + '"><head><meta charset="utf-8"><title>' + title + '</title><style>'
        + '@page{margin:18mm;size:A4}'
        + 'body{font-family:-apple-system,Arial,sans-serif;color:#1a1a1a;font-size:11pt;max-width:800px;margin:20px auto;padding:20px}'
        + 'h1{font-family:Georgia,serif;font-size:24pt;margin:0 0 4px}'
        + 'h2{font-family:Georgia,serif;font-size:16pt;margin:24px 0 8px;padding-bottom:4px;border-bottom:2px solid #d94f30}'
        + 'h3{font-size:13pt;margin:14px 0 6px;color:#d94f30}'
        + '.meta{color:#6b6b65;font-size:10pt;margin-bottom:16px}'
        + '.hint{background:#fef7ed;border-left:4px solid #d94f30;padding:10px 14px;margin-bottom:20px}'
        + '@media print{.hint{display:none}}'
        + '.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px}'
        + '.card{border:1px solid #ccc;padding:8px 12px}'
        + '.card .lbl{font-size:8pt;text-transform:uppercase;color:#6b6b65}'
        + '.card .val{font-size:17pt;font-family:Georgia,serif;font-weight:600}'
        + '.day{page-break-inside:avoid;margin-bottom:16px;padding:12px 14px;border-left:4px solid #d94f30;background:#fafaf7}'
        + '.day.rust{border-left-color:#94a3b8;background:#f8fafc}'
        + '.day.match{border-left-color:#1a1a1a;background:#fef3c7}'
        + '.day h3{margin:0 0 6px}'
        + '.tag{display:inline-block;padding:2px 8px;font-size:8pt;text-transform:uppercase;background:#1a1a1a;color:white;margin-left:6px;vertical-align:middle}'
        + '.tag.r{background:#94a3b8}.tag.t{background:#d94f30}.tag.m{background:#1a1a1a}'
        + '.totals{font-size:9pt;color:#6b6b65;margin-bottom:8px;padding:3px 6px;background:white;border-left:2px solid #d94f30}'
        + '.meal{padding:6px 0;border-bottom:1px dotted #ccc;font-size:10pt}'
        + '.meal:last-child{border:none}'
        + '.meal .naam{font-weight:600}'
        + '.meal .recept{color:#d94f30;font-style:italic;font-size:10pt}'
        + '.meal .macros{font-size:8pt;color:#6b6b65;margin-top:2px}'
        + '.meal .macros span{display:inline-block;padding:1px 5px;background:white;margin-right:3px;border:1px solid #e5e5e0}'
        + '.dtag{display:inline-block;padding:1px 5px;font-size:7.5pt;font-weight:700;margin-right:3px;border-radius:2px}'
        + '.gv{background:#fef3c7;color:#92400e;border:1px solid #fcd34d}'
        + '.lv{background:#e0f2fe;color:#075985;border:1px solid #7dd3fc}'
        + '.veg{background:#dcfce7;color:#166534;border:1px solid #86efac}'
        + '.vegan{background:#f0fdf4;color:#15803d;border:1px solid #4ade80}'
        + '.shop h3{font-size:11pt;border-bottom:1.5px solid #d94f30;padding-bottom:3px;margin:14px 0 4px}'
        + '.shop-list{columns:2;gap:20px;font-size:10pt}'
        + '.shop-list div{padding:2px 0}'
        + '.footer{margin-top:24px;padding-top:10px;border-top:1px solid #ddd;font-size:9pt;color:#6b6b65}'
        + '</style></head><body>';

      // ── PRINT HINT ───────────────────────────────────────────────────────
      html += '<div class="hint"><strong>' + (isEN ? 'Ready to save as PDF?' : 'Klaar om op te slaan als PDF?') + '</strong> '
        + (isEN ? 'Press Ctrl+P (or Cmd+P) and choose "Save as PDF".' : 'Druk op Ctrl+P (of Cmd+P) en kies "Opslaan als PDF".')
        + ' <button onclick="window.print()" style="margin-left:10px;padding:6px 14px;background:#1a1a1a;color:white;border:none;cursor:pointer">'
        + (isEN ? 'Print / PDF' : 'Afdrukken / PDF') + '</button></div>';

      // ── TITLE ────────────────────────────────────────────────────────────
      html += '<h1>' + title + '</h1>';
      html += '<div class="meta">' + dateStr
        + ' · ' + input.gewicht + ' kg, ' + input.lengte + ' cm, ' + input.leeftijd + (isEN ? ' yr' : ' jaar')
        + ' · ' + (isEN ? 'goal' : 'doel') + ': ' + input.doel
        + '</div>';

      // ── DAGDOELEN ────────────────────────────────────────────────────────
      html += '<h2>' + (isEN ? 'Daily targets' : 'Dagdoelen') + '</h2>';
      html += '<div class="grid4">'
        + '<div class="card"><div class="lbl">' + (isEN ? 'Calories' : 'Calorieën') + '</div><div class="val">' + Math.round(doelen.kcalDag || 0) + '</div></div>'
        + '<div class="card"><div class="lbl">' + (isEN ? 'Protein' : 'Eiwit') + '</div><div class="val">' + Math.round(doelen.eiwitG || 0) + 'g</div></div>'
        + '<div class="card"><div class="lbl">' + (isEN ? 'Carbs' : 'Koolhydraten') + '</div><div class="val">' + Math.round(doelen.chG || 0) + 'g</div></div>'
        + '<div class="card"><div class="lbl">' + (isEN ? 'Fat' : 'Vet') + '</div><div class="val">' + Math.round(doelen.vetG || 0) + 'g</div></div>'
        + '</div>';

      // ── WEEKSCHEMA ───────────────────────────────────────────────────────
      html += '<h2>' + (isEN ? 'Weekly schedule' : 'Weekschema') + '</h2>';
      week.forEach(function(dag) {
        var cls = dag.dagtype === 'matchdag' ? 'match' : dag.dagtype === 'rustdag' ? 'rust' : '';
        var tagCls = dag.dagtype === 'matchdag' ? 'm' : dag.dagtype === 'trainingsdag' ? 't' : 'r';
        var tagLabel = dag.dagtype === 'matchdag' ? (isEN ? 'Match' : 'Match') : dag.dagtype === 'trainingsdag' ? (isEN ? 'Training' : 'Training') : (isEN ? 'Rest' : 'Rust');
        var maaltijden = dag.maaltijden || [];
        var dagKcal = Math.round(maaltijden.reduce(function(s, m) { return s + (m.kcal || 0); }, 0));
        var dagEiwit = Math.round(maaltijden.reduce(function(s, m) { return s + (m.eiwitG || 0); }, 0));
        var dagCh = Math.round(maaltijden.reduce(function(s, m) { return s + (m.chG || 0); }, 0));
        var dagVet = Math.round(maaltijden.reduce(function(s, m) { return s + (m.vetG || 0); }, 0));

        html += '<div class="day ' + cls + '"><h3>' + dag.dagNaam + '<span class="tag ' + tagCls + '">' + tagLabel + '</span></h3>';
        html += '<div class="totals">~' + dagKcal + ' kcal · ' + dagEiwit + 'g ' + (isEN ? 'protein' : 'eiwit') + ' · ' + dagCh + 'g CH · ' + dagVet + 'g ' + (isEN ? 'fat' : 'vet') + '</div>';

        maaltijden.forEach(function(m) {
          var receptNaam = m.recept ? m.recept.naam : (isEN ? 'No recipe' : 'Geen recept');
          var kcal2 = m.recept ? Math.round(m.recept.macros.kcal) : 0;
          var eiwit2 = m.recept ? Math.round(m.recept.macros.eiwit_g) : 0;
          var ch2 = m.recept ? Math.round(m.recept.macros.ch_g) : 0;
          var vet2 = m.recept ? Math.round(m.recept.macros.vet_g) : 0;
          var tags = '';
          if (m.recept && m.recept.tags) {
            if (m.recept.tags.glutenvrij) tags += '<span class="dtag gv">' + (isEN ? 'GF' : 'GV') + '</span>';
            if (m.recept.tags.lactosevrij) tags += '<span class="dtag lv">' + (isEN ? 'LF' : 'LV') + '</span>';
            if (m.recept.tags.veganistisch) tags += '<span class="dtag vegan">vegan</span>';
            else if (m.recept.tags.vegetarisch) tags += '<span class="dtag veg">veg.</span>';
          }
          html += '<div class="meal">'
            + '<div><span class="naam">' + m.naam + '</span> <span style="font-size:9pt;color:#6b6b65">' + m.tijd + '</span></div>'
            + '<div class="recept">' + receptNaam + '</div>'
            + '<div class="macros"><span>' + kcal2 + ' kcal</span><span>' + eiwit2 + 'g E</span><span>' + ch2 + 'g CH</span><span>' + vet2 + 'g V</span>' + tags + '</div>'
            + '</div>';
        });
        html += '</div>';
      });

      // ── BOODSCHAPPENLIJST ────────────────────────────────────────────────
      if (boodschappen) {
        html += '<h2>' + (isEN ? 'Shopping list' : 'Boodschappenlijst') + '</h2>';
        Object.entries(boodschappen).forEach(function(entry) {
          var cat = entry[0]; var items = entry[1];
          html += '<div class="shop"><h3>' + cat + '</h3><div class="shop-list">';
          items.forEach(function(item) {
            html += '<div>' + item.naam + ' <span style="color:#6b6b65">— ' + formatBoodschappenItem(item) + '</span></div>';
          });
          html += '</div></div>';
        });
      }

      // ── FOOTER ───────────────────────────────────────────────────────────
      html += '<div class="footer">Handbal Voedingstool v5 · IOC, ACSM, ISSN, EHF · ' + (isEN ? 'Educational purposes only.' : 'Educatief karakter, geen medisch advies.') + '</div>';
      html += '</body></html>';

      // ── DOWNLOAD ─────────────────────────────────────────────────────────
      var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'voedingsplan_' + new Date().toISOString().slice(0, 10) + '.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function() { URL.revokeObjectURL(url); }, 1000);

    } catch (err) {
      console.error('Export error:', err);
      alert((taal === 'en' ? 'Export failed: ' : 'Export mislukt: ') + err.message);
    }
    setPdfBezig(false);
  };

  // -------- RENDER --------
  return (
    <div style={{ fontFamily: '"Inter", -apple-system, sans-serif', backgroundColor: '#fafaf7', color: '#1a1a1a', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        .display-font { font-family: 'Fraunces', Georgia, serif; font-weight: 600; letter-spacing: -0.02em; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .input-style { width: 100%; padding: 10px 14px; border: 1.5px solid #e5e5e0; background: white; font-size: 15px; color: #1a1a1a; font-family: 'JetBrains Mono', monospace; transition: border-color 0.15s; border-radius: 0; }
        .input-style:focus { outline: none; border-color: #d94f30; }
        .label-style { display: block; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6b6b65; margin-bottom: 6px; }
        .pill-button { padding: 8px 16px; border: 1.5px solid #e5e5e0; background: white; cursor: pointer; font-size: 13px; font-weight: 500; transition: all 0.15s; font-family: inherit; border-radius: 0; }
        .pill-button.active { background: #1a1a1a; color: white; border-color: #1a1a1a; }
        .pill-button:hover:not(.active) { border-color: #1a1a1a; }
        .pill-button.small { padding: 6px 10px; font-size: 12px; }
        .checkbox-row { display: flex; align-items: center; gap: 10px; padding: 10px 0; cursor: pointer; }
        .checkbox-row input[type="checkbox"] { width: 18px; height: 18px; accent-color: #d94f30; cursor: pointer; }
        .stat-card { background: white; padding: 20px; border: 1px solid #e5e5e0; }
        .stat-card-accent { background: #1a1a1a; color: white; padding: 24px; }
        .stat-label { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.7; }
        .stat-value { font-family: 'Fraunces', serif; font-size: 36px; font-weight: 600; line-height: 1; margin-top: 8px; }
        .stat-unit { font-size: 14px; opacity: 0.6; margin-left: 4px; font-weight: 400; }
        .meal-card { background: white; padding: 20px; border-left: 3px solid #d94f30; margin-bottom: 12px; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s; }
        .meal-card:hover { transform: translateX(2px); box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
        .meal-time { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #6b6b65; letter-spacing: 0.05em; }
        .meal-name { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 600; margin: 4px 0 12px 0; }
        .recipe-name { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 500; color: #d94f30; margin: 8px 0; display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
        .recipe-name .click-hint { font-size: 10px; color: #999; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.05em; text-transform: uppercase; font-weight: 400; }
        .meal-macros { display: flex; gap: 16px; margin-bottom: 12px; font-family: 'JetBrains Mono', monospace; font-size: 13px; padding-bottom: 12px; border-bottom: 1px dashed #e5e5e0; flex-wrap: wrap; }
        .macro-pill { display: flex; flex-direction: column; }
        .macro-pill .label { font-size: 9px; color: #6b6b65; letter-spacing: 0.08em; text-transform: uppercase; }
        .macro-pill .value { font-weight: 600; }
        .ingr-list { padding: 0; margin: 0 0 12px 0; list-style: none; font-size: 13px; }
        .ingr-list li { padding: 4px 0; color: #2a2a2a; display: flex; justify-content: space-between; }
        .ingr-list li .name { color: #1a1a1a; }
        .ingr-list li .gram { color: #6b6b65; font-family: 'JetBrains Mono', monospace; }
        .instructie { font-size: 13px; color: #444; line-height: 1.55; padding: 10px 12px; background: #f5f5f0; margin-top: 8px; border-left: 2px solid #d94f30; }
        .warn-banner { padding: 14px 18px; margin-bottom: 12px; border-left: 4px solid; font-size: 14px; }
        .warn-rode { border-color: #cc1f1a; background: #fdf0ef; color: #841412; }
        .warn-let { border-color: #d97706; background: #fef7ed; color: #7c4a06; }
        .warn-info { border-color: #2563eb; background: #eff6ff; color: #1e3a8a; }
        .tab-nav { display: flex; border-bottom: 1px solid #e5e5e0; margin-bottom: 24px; flex-wrap: wrap; }
        .tab-button { padding: 12px 20px; background: none; border: none; border-bottom: 3px solid transparent; cursor: pointer; font-size: 15px; color: #6b6b65; font-family: inherit; }
        .tab-button.active { border-bottom-color: #d94f30; color: #1a1a1a; font-weight: 600; }
        .week-day-card { background: white; border: 1px solid #e5e5e0; padding: 14px 18px; margin-bottom: 12px; }
        .week-day-header { display: flex; justify-content: space-between; align-items: baseline; }
        .day-label { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 600; }
        .day-type-tag { font-size: 10px; padding: 2px 8px; letter-spacing: 0.08em; text-transform: uppercase; }
        .day-type-trainingsdag { background: #d94f30; color: white; }
        .day-type-rustdag { background: #94a3b8; color: white; }
        .day-type-matchdag { background: #1a1a1a; color: white; }
        .day-type-wedstrijddag { background: #1a1a1a; color: white; }
        .day-type-krachtdag { background: #7c3aed; color: white; }
        .day-type-cardiodag { background: #0891b2; color: white; }
        .day-type-handbaldag { background: #d94f30; color: white; }
        .day-type-kracht_handbal { background: #b45309; color: white; }
        .week-meals-list { padding: 12px 0 0 0; margin: 0; list-style: none; font-size: 13px; }
        .week-meals-list li { padding: 6px 0; display: flex; justify-content: space-between; gap: 12px; border-bottom: 1px dotted #e5e5e0; cursor: pointer; }
        .week-meals-list li:hover { background: #fafaf7; }
        .week-meals-list li:last-child { border: none; }
        .week-meals-list .recept-naam { color: #1a1a1a; flex: 1; }
        .week-meals-list .recept-kcal { color: #6b6b65; font-family: 'JetBrains Mono', monospace; font-size: 11px; flex-shrink: 0; }
        .shopping-cat { background: white; border: 1px solid #e5e5e0; padding: 16px 20px; margin-bottom: 12px; }
        .shopping-cat-title { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 600; margin: 0 0 10px 0; padding-bottom: 8px; border-bottom: 2px solid #d94f30; }
        .shopping-list { list-style: none; padding: 0; margin: 0; }
        .shopping-list li { padding: 6px 0; display: flex; justify-content: space-between; font-size: 14px; border-bottom: 1px dotted #f0f0eb; }
        .shopping-list li:last-child { border: none; }
        .shopping-list .item { color: #1a1a1a; }
        .shopping-list .gram { font-family: 'JetBrains Mono', monospace; color: #6b6b65; font-size: 13px; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal-content { background: white; max-width: 720px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 32px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
        .profile-button { padding: 10px 16px; font-size: 13px; cursor: pointer; border: 1.5px solid #1a1a1a; background: white; color: #1a1a1a; font-family: inherit; font-weight: 500; }
        .profile-button.primary { background: #d94f30; color: white; border-color: #d94f30; }
        .profile-button:disabled { opacity: 0.5; cursor: not-allowed; }
        @media (max-width: 900px) { .grid-2 { grid-template-columns: 1fr !important; } .stat-grid-3 { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .stat-grid-3 { grid-template-columns: 1fr !important; } .meal-macros { gap: 10px; } }
      `}</style>

      {/* HEADER */}
      <div style={{ borderBottom: '1px solid #e5e5e0', background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                <h1 className="display-font" style={{ fontSize: 42, margin: 0, lineHeight: 1 }}>{t('app_titel')}</h1>
                <span className="mono" style={{ fontSize: 12, letterSpacing: '0.1em', color: '#d94f30' }}>v2.1</span>
              </div>
              <p style={{ marginTop: 12, color: '#6b6b65', fontSize: 15, maxWidth: 760 }}>
                {t('app_subtitel')} — {RECIPES_DB.recepten.length} {taal === 'en' ? 'recipes across 7 cuisines' : 'recepten over 7 keukens'}.
                {actiefProfielNaam && <> · {taal === 'en' ? 'Active profile' : 'Actief profiel'}: <strong>{actiefProfielNaam}</strong></>}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Language selector */}
              <div style={{ display: 'flex', gap: 2, border: '1.5px solid #e5e5e0', padding: 2 }}>
                {['nl', 'en'].map(l => (
                  <button key={l} onClick={() => setTaal(l)}
                    style={{ padding: '5px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                      fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.05em',
                      background: taal === l ? '#1a1a1a' : 'transparent',
                      color: taal === l ? '#fafaf7' : '#6b6b65',
                      border: 'none' }}>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <button className="profile-button" onClick={() => { setWalkthroughStap(0); setWalkthroughOpen(true); }} style={{ background: '#d94f30', color: 'white', border: 'none', fontWeight: 700 }}>
                ▶ {taal === 'en' ? 'How it works' : 'Hoe werkt dit?'}
              </button>
              <button className="profile-button" onClick={() => setVoeding101Open(true)} title={t('btn_voeding101')}>
                {t('btn_voeding101')}
              </button>
              <button className="profile-button" onClick={() => setHelpOpen(true)} title={t('btn_hoewerkt')}>
                {t('btn_hoewerkt')}
              </button>
              <button className="profile-button" onClick={() => setProfielModalOpen(true)}>
                {t('btn_profielen')}
              </button>
              <button className="profile-button primary" onClick={exportPDF} disabled={pdfBezig}>
                {pdfBezig ? t('btn_bezig') : t('btn_exporteer')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        <div className="grid-2" style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>

          {/* LEFT — FORMULIER */}
          <div style={{ flexShrink: 0, width: 380, position: 'sticky', top: 20, alignSelf: 'flex-start', maxHeight: 'calc(100vh - 40px)', overflowY: 'auto' }}>
            <div>
              <h2 className="display-font" style={{ fontSize: 22, marginTop: 0, marginBottom: 20 }}>{t('sectie_profiel')}</h2>

              <div className="stat-card" style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b65', margin: '0 0 16px 0' }}>{t('sectie_01')}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div><label className="label-style">{t('label_gewicht')}</label><input className="input-style" type="number" value={input.gewicht} onChange={e => u('gewicht', parseFloat(e.target.value) || 0)} /></div>
                  <div><label className="label-style">{t('label_lengte')}</label><input className="input-style" type="number" value={input.lengte} onChange={e => u('lengte', parseFloat(e.target.value) || 0)} /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div><label className="label-style">{t('label_leeftijd')}</label><input className="input-style" type="number" value={input.leeftijd} onChange={e => u('leeftijd', parseInt(e.target.value) || 0)} /></div>
                  <div><label className="label-style">{taal === 'en' ? 'Body fat % (optional)' : 'Vet % (optioneel)'}</label><input className="input-style" type="number" value={input.vetpct} placeholder="laat leeg" onChange={e => u('vetpct', e.target.value)} /></div>
                </div>
                <label className="label-style">{t('label_geslacht')}</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['man', 'vrouw'].map(g => (
                    <button key={g} className={`pill-button ${input.geslacht === g ? 'active' : ''}`} style={{ flex: 1 }} onClick={() => u('geslacht', g)}>{g.charAt(0).toUpperCase() + g.slice(1)}</button>
                  ))}
                </div>
              </div>

              <div className="stat-card" style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b65', margin: '0 0 16px 0' }}>{t('sectie_02')}</h3>
                <div style={{ marginBottom: 14 }}>
                  <label className="label-style">{t('label_handbal_pw')}</label>
                  <input className="input-style" type="number" min="0" max="6" value={input.handbalPerWeek} onChange={e => u('handbalPerWeek', parseInt(e.target.value) || 0)} />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label className="label-style">{t('label_handbal_duur')}</label>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[1.0, 1.5, 2.0].map(v => (
                      <button key={v} className={`pill-button ${Math.abs(input.handbalDuur - v) < 0.01 ? 'active' : ''}`} style={{ flex: 1 }} onClick={() => u('handbalDuur', v)}>{v.toFixed(1)} u</button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label className="label-style">{t('label_kracht_pw')}</label>
                  <input className="input-style" type="number" min="0" max="5" value={input.krachtPerWeek} onChange={e => u('krachtPerWeek', parseInt(e.target.value) || 0)} />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label className="label-style">{t('label_kracht_duur')}</label>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[0.5, 1.0, 1.5].map(v => (
                      <button key={v} className={`pill-button ${Math.abs(input.krachtDuur - v) < 0.01 ? 'active' : ''}`} style={{ flex: 1 }} onClick={() => u('krachtDuur', v)}>{v.toFixed(1)} u</button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label className="label-style">{t('label_cardio_pw')}</label>
                  <input className="input-style" type="number" min="0" max="7" value={input.cardioPerWeek || 0} onChange={e => u('cardioPerWeek', parseInt(e.target.value) || 0)} />
                  <p style={{ fontSize: 11, color: '#6b6b65', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                    {t('label_cardio_toelichting')}
                  </p>
                </div>
                {(input.cardioPerWeek > 0) && (
                <div style={{ marginBottom: 14 }}>
                  <label className="label-style">{t('label_cardio_duur')}</label>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[0.5, 1.0, 1.5].map(v => (
                      <button key={v} className={`pill-button ${Math.abs((input.cardioDuur || 0.5) - v) < 0.01 ? 'active' : ''}`} style={{ flex: 1 }} onClick={() => u('cardioDuur', v)}>{v.toFixed(1)} u</button>
                    ))}
                  </div>
                </div>
                )}
                <div style={{ marginTop: 18, padding: '14px 16px', background: '#f0fdf4', borderLeft: '3px solid #16a34a' }}>
                  <h4 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#16a34a', margin: '0 0 12px 0' }}>
                    {taal === 'en' ? '⚡ MET-intensiteit per trainingstype' : '⚡ MET-intensiteit per trainingstype'}
                  </h4>
                  <p style={{ fontSize: 11, color: '#166534', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                    {taal === 'en'
                      ? 'Formula: (MET − 1.3) × weight × duration = net extra kcal. Correct values change your daily targets significantly.'
                      : 'Formule: (MET − 1.3) × gewicht × duur = netto extra kcal. Correcte waarden veranderen je dagdoelen significant.'}
                  </p>
                  {input.handbalPerWeek > 0 && (
                    <div style={{ marginBottom: 10 }}>
                      <label className="label-style">{taal === 'en' ? 'Handball intensity' : 'Handbal intensiteit'}</label>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {[
                          { v: 'licht',     label: taal === 'en' ? 'Light'   : 'Licht',    sub: 'MET 8',  tip: taal === 'en' ? 'Tactical/technical' : 'Tactisch/technisch' },
                          { v: 'gemiddeld', label: taal === 'en' ? 'Average' : 'Gemiddeld', sub: 'MET 10', tip: taal === 'en' ? 'Standard training'  : 'Standaard training' },
                          { v: 'zwaar',     label: taal === 'en' ? 'Heavy'   : 'Zwaar',    sub: 'MET 12', tip: taal === 'en' ? 'Match intensity'     : 'Wedstrijdintensiteit' },
                        ].map(opt => (
                          <button key={opt.v}
                            className={`pill-button ${(input.handbalIntensiteit || 'gemiddeld') === opt.v ? 'active' : ''}`}
                            style={{ flex: 1, padding: '8px 4px' }}
                            onClick={() => u('handbalIntensiteit', opt.v)}
                            title={opt.tip}>
                            <span style={{ display: 'block', fontWeight: 700 }}>{opt.label}</span>
                            <span style={{ display: 'block', fontSize: 10, opacity: 0.7 }}>{opt.sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {input.krachtPerWeek > 0 && (
                    <div style={{ marginBottom: 10 }}>
                      <label className="label-style">{taal === 'en' ? 'Strength intensity' : 'Kracht intensiteit'}</label>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {[
                          { v: 'licht',     label: taal === 'en' ? 'Light'   : 'Licht',    sub: 'MET 3.5' },
                          { v: 'gemiddeld', label: taal === 'en' ? 'Average' : 'Gemiddeld', sub: 'MET 4.5' },
                          { v: 'zwaar',     label: taal === 'en' ? 'Heavy'   : 'Zwaar',    sub: 'MET 5.0' },
                        ].map(opt => (
                          <button key={opt.v}
                            className={`pill-button ${(input.krachtIntensiteit || 'gemiddeld') === opt.v ? 'active' : ''}`}
                            style={{ flex: 1, padding: '8px 4px' }}
                            onClick={() => u('krachtIntensiteit', opt.v)}>
                            <span style={{ display: 'block', fontWeight: 700 }}>{opt.label}</span>
                            <span style={{ display: 'block', fontSize: 10, opacity: 0.7 }}>{opt.sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {input.cardioPerWeek > 0 && (
                    <div style={{ marginBottom: 10 }}>
                      <label className="label-style">{taal === 'en' ? 'Cardio intensity' : 'Cardio intensiteit'}</label>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {[
                          { v: 'onderhoud', label: taal === 'en' ? 'Maintenance' : 'Onderhoud', sub: 'MET 9 (~10km/u)' },
                          { v: 'zwaar',     label: taal === 'en' ? 'Hard'        : 'Zwaar',     sub: 'MET 12 (~13km/u)' },
                        ].map(opt => (
                          <button key={opt.v}
                            className={`pill-button ${(input.cardioIntensiteit || 'onderhoud') === opt.v ? 'active' : ''}`}
                            style={{ flex: 1, padding: '8px 4px' }}
                            onClick={() => u('cardioIntensiteit', opt.v)}>
                            <span style={{ display: 'block', fontWeight: 700 }}>{opt.label}</span>
                            <span style={{ display: 'block', fontSize: 10, opacity: 0.7 }}>{opt.sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Live MET preview */}
                  <div style={{ marginTop: 8, padding: '8px 10px', background: 'white', border: '1px solid #d1fae5', fontSize: 11, lineHeight: 1.8 }}>
                    <strong className="mono" style={{ color: '#d94f30' }}>
                      {taal === 'en' ? 'Example today (' : 'Voorbeeld vandaag ('}
                      {activeDay === 'handbaldag' ? (taal === 'en' ? 'Handball' : 'Handbal')
                        : activeDay === 'krachtdag' ? (taal === 'en' ? 'Strength' : 'Kracht')
                        : activeDay === 'cardiodag' ? 'Cardio'
                        : activeDay === 'kracht_handbal' ? (taal === 'en' ? 'Str+HB' : 'Kr+HB')
                        : activeDay === 'wedstrijddag' ? (taal === 'en' ? 'Match' : 'Wedstrijd')
                        : (taal === 'en' ? 'Rest' : 'Rust')}):
                    </strong>
                    {' '}
                    {(() => {
                      const ex = dagTrainingKcal(activeDay, { ...input, gewicht: input.gewicht || 80 });
                      return taal === 'en'
                        ? `+${Math.round(ex)} kcal net extra vs rest day`
                        : `+${Math.round(ex)} kcal netto extra t.o.v. rustdag`;
                    })()}
                  </div>
                </div>
                <div style={{ marginTop: 14 }}>
                  <label className="label-style"><Tip id="trainingsmoment">{t('label_trainingmoment')}</Tip></label>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[
                      { v: 'ochtend', label: t('label_ochtend'), sub: '06-10u' },
                      { v: 'middag', label: t('label_middag'), sub: '12-14u' },
                      { v: 'avond', label: t('label_avond'), sub: '17-21u' }
                    ].map(d => (
                      <button key={d.v} className={`pill-button ${(input.trainingMoment || 'avond') === d.v ? 'active' : ''}`} style={{ flex: 1, padding: '10px 6px' }} onClick={() => u('trainingMoment', d.v)}>
                        <div style={{ fontWeight: 600, fontSize: 12 }}>{d.label}</div>
                        <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>{d.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="stat-card" style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b65', margin: '0 0 16px 0' }}>{t('sectie_03')}</h3>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[{ v: 'cut', label: t('label_cut'), sub: t('label_cut_sub') }, { v: 'maintain', label: t('label_maintain'), sub: t('label_maintain_sub') }, { v: 'bulk', label: t('label_bulk'), sub: t('label_bulk_sub') }].map(d => (
                    <button key={d.v} className={`pill-button ${input.doel === d.v ? 'active' : ''}`} style={{ flex: 1, padding: '12px 8px' }} onClick={() => u('doel', d.v)}>
                      <div style={{ fontWeight: 600 }}>{d.label}</div>
                      <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>{d.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="stat-card" style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b65', margin: '0 0 12px 0' }}>{t('sectie_04')}</h3>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[
                    { v: 'off_season', label: t('label_off_season'), sub: t('label_off_sub') },
                    { v: 'pre_season', label: t('label_pre_season'), sub: t('label_pre_sub') },
                    { v: 'in_season', label: t('label_in_season'), sub: t('label_in_sub') }
                  ].map(d => (
                    <button key={d.v} className={`pill-button ${(input.fase || 'in_season') === d.v ? 'active' : ''}`} style={{ flex: 1, padding: '12px 6px' }} onClick={() => u('fase', d.v)}>
                      <div style={{ fontWeight: 600, fontSize: 12 }}>{d.label}</div>
                      <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>{d.sub}</div>
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: 11, color: '#6b6b65', marginTop: 10, lineHeight: 1.5 }}>
                  {input.fase === 'off_season' && 'Hypertrofie-focus: eiwit-target verhoogd naar 2.0 g/kg.'}
                  {input.fase === 'pre_season' && 'Volume-opbouw: calorie-doel +5% voor extra energie.'}
                  {(!input.fase || input.fase === 'in_season') && 'Prestatie-focus: match-day-protocol actief op matchdagen.'}
                </p>
              </div>

              {!verfijnZichtbaar && (
                <div className="stat-card" style={{ background: '#fafaf7', textAlign: 'center', padding: '16px', cursor: 'pointer', borderLeft: '3px solid #d94f30' }}
                     onClick={() => setVerfijnZichtbaar(true)}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 14, color: '#d94f30', fontFamily: 'Fraunces, serif', fontWeight: 600 }}>
                    + Verfijn instellingen (optioneel)
                  </h4>
                  <p style={{ fontSize: 11, color: '#6b6b65', margin: 0, lineHeight: 1.5 }}>
                    Allergieën · Dieet-quota · Niet-lekker · Voorkeursingrediënten · Flex-meal · Budgetmodus · Seizoensfilter · Praktische instellingen
                  </p>
                </div>
              )}

              {verfijnZichtbaar && (
                <>
              <div className="stat-card" style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b65', margin: 0 }}>{t('sectie_05')}</h3>
                  <button onClick={() => setVerfijnZichtbaar(false)}
                    style={{ background: 'none', border: 'none', color: '#6b6b65', cursor: 'pointer', fontSize: 11, textDecoration: 'underline', fontFamily: 'inherit' }}>
                    – inklappen
                  </button>
                </div>
                <label className="label-style">{t('label_eetmomenten')}</label>
                <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                  {[3, 4, 5].map(n => (
                    <button key={n} className={`pill-button ${input.eetmomenten === n ? 'active' : ''}`} style={{ flex: 1 }} onClick={() => u('eetmomenten', n)}>{n}</button>
                  ))}
                </div>
                <label className="label-style">{t('label_boodschappen')}</label>
                <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                  {[1, 2].map(n => (
                    <button key={n} className={`pill-button ${input.boodschappen === n ? 'active' : ''}`} style={{ flex: 1 }} onClick={() => u('boodschappen', n)}>{n}× {taal === 'en' ? 'per week' : 'per week'}</button>
                  ))}
                </div>
                <label className="label-style">{t('label_keuken')}</label>
                <select className="input-style" value={input.keuken} onChange={e => u('keuken', e.target.value)}>
                  {Object.entries(KEUKEN_LABELS).map(([k, label]) => (
                    <option key={k} value={k}>{label}</option>
                  ))}
                </select>
                <p style={{ fontSize: 11, color: '#6b6b65', marginTop: 6, lineHeight: 1.5 }}>
                  Recepten van je voorkeurskeuken krijgen sterke prioriteit. Bij krappe selectie vult de tool aan met andere keukens.
                </p>
              </div>

              <div className="stat-card" style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b65', margin: '0 0 12px 0' }}>{taal === 'en' ? '06 — Weekly diet quotas' : '06 — Dieet-quota per week'}</h3>
                <p style={{ fontSize: 12, color: '#6b6b65', margin: '0 0 14px 0', lineHeight: 1.5 }}>
                  <strong>Standaard 0 voor alles</strong> = puur vlees-, vis- en zuivelgerechten. Schuif omhoog om alternatieven in te plannen. Totaal {input.eetmomenten * 7} maaltijden/week.
                </p>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <label className="label-style" style={{ marginBottom: 0 }}>{taal === 'en' ? 'Vegetarian meals' : 'Vegetarische maaltijden'}</label>
                    <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: '#d94f30' }}>{input.quotaVegetarisch} / {taal === 'en' ? 'week' : 'week'}</span>
                  </div>
                  <input type="range" min="0" max={input.eetmomenten * 7} value={input.quotaVegetarisch}
                    onChange={e => u('quotaVegetarisch', parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: '#d94f30' }} />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <label className="label-style" style={{ marginBottom: 0 }}>{taal === 'en' ? 'Vegan meals' : 'Veganistische maaltijden'}</label>
                    <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: '#d94f30' }}>{input.quotaVegan} / week</span>
                  </div>
                  <input type="range" min="0" max={input.eetmomenten * 7} value={input.quotaVegan}
                    onChange={e => u('quotaVegan', parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: '#d94f30' }} />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <label className="label-style" style={{ marginBottom: 0 }}>{taal === 'en' ? 'Gluten-free meals' : 'Glutenvrije maaltijden'}</label>
                    <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: '#d94f30' }}>{input.quotaGlutenvrij} / week</span>
                  </div>
                  <input type="range" min="0" max={input.eetmomenten * 7} value={input.quotaGlutenvrij}
                    onChange={e => u('quotaGlutenvrij', parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: '#d94f30' }} />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <label className="label-style" style={{ marginBottom: 0 }}>{taal === 'en' ? 'Lactose-free meals' : 'Lactosevrije maaltijden'}</label>
                    <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: '#d94f30' }}>{input.quotaLactosevrij} / week</span>
                  </div>
                  <input type="range" min="0" max={input.eetmomenten * 7} value={input.quotaLactosevrij}
                    onChange={e => u('quotaLactosevrij', parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: '#d94f30' }} />
                </div>

                <p style={{ fontSize: 11, color: '#6b6b65', margin: '0 0 0 0', lineHeight: 1.5, fontStyle: 'italic' }}>
                  Voor strikte intolerantie/allergie: zet de slider op het maximum.
                </p>
              </div>

              <div className="stat-card" style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b65', margin: '0 0 12px 0' }}>{t('sectie_07')}</h3>
                <input className="input-style" type="text" value={input.nietLekker} placeholder="bv: broccoli, tonijn, kwark" onChange={e => u('nietLekker', e.target.value)} />
                <p style={{ fontSize: 11, color: '#6b6b65', marginTop: 6, lineHeight: 1.5 }}>
                  Komma-gescheiden. <strong>Recepten die dit ingrediënt bevatten worden volledig uitgesloten</strong> — het ingredient wordt niet uit het recept gehaald maar het recept zelf vervangen door een ander. Typ de hoofdnaam (bv. "kip" sluit alle kip-recepten uit, ook kip filet, kip soep, enz.).
                </p>
              </div>

              <div className="stat-card" style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b65', margin: '0 0 12px 0' }}>{t('sectie_08')}</h3>
                <input className="input-style" type="text" value={input.voorkeuren} placeholder="bv: kipfilet, rijst, broccoli" onChange={e => u('voorkeuren', e.target.value)} />
                <p style={{ fontSize: 11, color: '#6b6b65', marginTop: 6, marginBottom: 8, lineHeight: 1.5 }}>
                  <strong>Recepten met deze ingrediënten verschijnen significant vaker</strong> in je schema (sterke score-bonus). Combineer met ★ Favorieten voor maximaal effect. Meerdere voorkeursingrediënten versterken elkaar.
                </p>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {['kipfilet', 'rundsbiefstuk_mager', 'zalm_vers', 'tonijn_blik_water', 'havermout', 'rijst_basmati_droog', 'pasta_volkoren_droog', 'magere_kwark', 'griekse_yoghurt_0pct', 'aardappel', 'broccoli', 'avocado', 'pindakaas_100pct'].map(ing => {
                    const isActive = input.voorkeuren.toLowerCase().includes(ing.replace(/_/g, ' ').split(' ')[0]);
                    return (
                      <button key={ing} onClick={() => {
                        const huidig = parseVoorkeuren(input.voorkeuren);
                        const cleanIng = ing.replace(/_/g, ' ').split(' ')[0];
                        if (huidig.some(v => v.includes(cleanIng) || cleanIng.includes(v))) {
                          // remove
                          const nieuw = huidig.filter(v => !v.includes(cleanIng) && !cleanIng.includes(v));
                          u('voorkeuren', nieuw.join(', '));
                        } else {
                          // add
                          u('voorkeuren', huidig.length === 0 ? cleanIng : input.voorkeuren + ', ' + cleanIng);
                        }
                      }} style={{
                        padding: '4px 10px', fontSize: 11,
                        background: isActive ? '#d94f30' : 'white',
                        color: isActive ? 'white' : '#1a1a1a',
                        border: '1px solid ' + (isActive ? '#d94f30' : '#e5e5e0'),
                        cursor: 'pointer', fontFamily: 'inherit'
                      }}>{formatIngredientName(ing).split(' ')[0]}</button>
                    );
                  })}
                </div>
              </div>

              <div className="stat-card">
                <h3 style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b65', margin: '0 0 12px 0' }}>{t('sectie_09')}</h3>
                <p style={{ fontSize: 12, color: '#6b6b65', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                  🔴 <strong>Harde uitsluiting:</strong> elk recept dat een aangevinkt allergeen bevat wordt <strong>volledig verwijderd</strong> uit alle schema's, boodschappenlijsten en swaps — zonder uitzondering. Dit is een veiligheidsfilter, geen voorkeur.
                  Cross-contact-risico's (ingrediënten die mogelijk sporen bevatten) krijgen een aparte waarschuwing in het recept-detail maar worden niet automatisch uitgesloten.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 280, overflowY: 'auto' }}>
                  {Object.entries(ALLERGENEN_INFO).map(([key, info]) => {
                    const isActive = (input.allergieen || []).includes(key);
                    return (
                      <label key={key} className="checkbox-row" style={{ padding: '5px 0' }}>
                        <input type="checkbox" checked={isActive} onChange={e => {
                          const huidig = input.allergieen || [];
                          if (e.target.checked) {
                            u('allergieen', [...huidig, key]);
                          } else {
                            u('allergieen', huidig.filter(a => a !== key));
                          }
                        }} />
                        <span style={{ fontSize: 12 }}>{info.label}</span>
                      </label>
                    );
                  })}
                </div>
                {(input.allergieen || []).length > 0 && (
                  <div style={{ marginTop: 12, padding: '10px 12px', background: '#fdf0ef', borderLeft: '3px solid #cc1f1a', fontSize: 12, color: '#841412' }}>
                    <strong>{(input.allergieen || []).length} allergeen(en) actief.</strong> Recepten met deze allergenen zijn uitgesloten.
                  </div>
                )}
              </div>

              <div className="stat-card" style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b65', margin: '0 0 12px 0' }}>{t('sectie_10')}</h3>
                <p style={{ fontSize: 12, color: '#6b6b65', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                  Voeding is sociaal: pizza-avond, BBQ, restaurant met team. Zet één vrije maaltijd per week aan voor flexibiliteit zonder schuldgevoel.
                </p>
                <label className="checkbox-row">
                  <input type="checkbox" checked={input.flexMeal || false} onChange={e => u('flexMeal', e.target.checked)} />
                  <span style={{ fontSize: 13 }}>{t('label_flex_activeer')}</span>
                </label>
                {input.flexMeal && (
                  <div style={{ marginTop: 10 }}>
                    <div style={{ marginBottom: 10 }}>
                      <label className="label-style" style={{ fontSize: 11 }}>{t('label_flex_welke_dag')}</label>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {t('dag_namen').map((d, i) => (
                          <button key={i} onClick={() => u('flexMealDag', i)}
                            className={`pill-button ${(input.flexMealDag ?? 5) === i ? 'active' : ''}`}
                            style={{ minWidth: 36 }}>{d}</button>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginBottom: 10 }}>
                      <label className="label-style" style={{ fontSize: 11 }}>{t('label_flex_welke_maaltijd')}</label>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {[t('flex_lunch'), t('flex_diner'), t('flex_snack')].map(m => (
                          <button key={m} onClick={() => u('flexMealType', m.toLowerCase())}
                            className={`pill-button ${(input.flexMealType || 'diner') === m.toLowerCase() ? 'active' : ''}`}>
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <label className="label-style" style={{ fontSize: 11 }}>{t('label_flex_wat')}</label>
                      <input className="input-style" type="text"
                        value={input.flexMealBeschrijving || ''}
                        placeholder="bv: pizza met team, restaurant, BBQ..."
                        onChange={e => u('flexMealBeschrijving', e.target.value)} />
                    </div>
                    <div style={{ padding: '10px 12px', background: '#f0fdf4', borderLeft: '3px solid #16a34a', fontSize: 12, color: '#15803d', lineHeight: 1.5 }}>
                      ✓ Flex-meal actief op {['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'][input.flexMealDag ?? 5]} ({input.flexMealType || 'diner'}).
                      {input.flexMealBeschrijving && <> — <em>{input.flexMealBeschrijving}</em></>}
                      <br />Tip: compenseer de dag erna met iets meer eiwit + groenten, niet met extra beperking.
                    </div>
                  </div>
                )}
              </div>

              <div className="stat-card" style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b65', margin: '0 0 12px 0' }}>{t('sectie_11')}</h3>
                <p style={{ fontSize: 12, color: '#6b6b65', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                  Goedkope eiwitbronnen prioriteren (eieren, kip, tonijn-blik, peulvruchten) + batch-vriendelijke recepten. Budget-recepten krijgen een <strong>💰 budget</strong>-label in je dagschema. Batch-recepten krijgen een <strong>🍱 batch</strong>-label — klik op "Weekplanning" voor meal-prep tips hoe je ze efficiënt in bulk kookt.
                </p>
                <label className="checkbox-row">
                  <input type="checkbox" checked={input.budgetMode || false} onChange={e => u('budgetMode', e.target.checked)} />
                  <span style={{ fontSize: 13 }}>{t('label_budget_activeer')}</span>
                </label>
                {input.budgetMode && (
                  <div style={{ marginTop: 10, padding: '10px 12px', background: '#fef7ed', borderLeft: '3px solid #d97706', fontSize: 12, color: '#7c4a06', lineHeight: 1.5 }}>
                    💰 Budgetmodus actief. Recepten met goedkope eiwitbronnen krijgen voorrang. Budget-recepten zijn gemarkeerd in je dagschema.
                    Bij droge maaltijden zie je een sausvoorstel. Batch-recepten zijn ideaal om dubbele portie te maken — zie de meal-prep tips in de <strong>Weekplanning</strong>-tab.
                  </div>
                )}
              </div>

              <div className="stat-card" style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b65', margin: '0 0 12px 0' }}>{t('sectie_12')}</h3>
                <p style={{ fontSize: 12, color: '#6b6b65', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                  Tomaat in januari uit Spanje is duur en weinig voedzaam. Met seizoensfilter krijgen lokale groenten/fruit voorrang.
                </p>
                <label className="checkbox-row">
                  <input type="checkbox" checked={input.seizoenFilter !== false} onChange={e => u('seizoenFilter', e.target.checked)} />
                  <span style={{ fontSize: 13 }}>{t('label_seizoen_activeer')}</span>
                </label>
                {input.seizoenFilter !== false && (
                  <div style={{ marginTop: 10, padding: '10px 12px', background: '#f0fdf4', borderLeft: '3px solid #16a34a', fontSize: 12, color: '#15803d', lineHeight: 1.5 }}>
                    🌱 Seizoensfilter actief. Boodschappenlijst markeert niet-seizoensartikelen.
                  </div>
                )}
              </div>
                </>
              )}
            </div>
          </div>

          {/* RIGHT — RESULTATEN */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {dagSchema && (
              <>
                {dagSchema.waarschuwingen.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    {dagSchema.waarschuwingen.map((w, i) => (
                      <div key={i} className={`warn-banner ${w.niveau === 'rode_vlag' ? 'warn-rode' : w.niveau === 'let_op' ? 'warn-let' : 'warn-info'}`}>
                        <strong style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.1em' }}>{w.niveau.replace('_', ' ')}</strong>
                        <div style={{ marginTop: 4 }}>{w.bericht}</div>
                      </div>
                    ))}
                  </div>
                )}

                <h2 className="display-font" style={{ fontSize: 28, marginTop: 0, marginBottom: 16 }}>{t('dagdoelen_titel')}</h2>

                {/* MET breakdown banner */}
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '10px 14px', marginBottom: 14, fontSize: 12, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span className="mono" style={{ color: '#16a34a', fontWeight: 700 }}>⚡ MET</span>
                  <span style={{ color: '#166534' }}>
                    BMR {Math.round(dagSchema.profiel.bmr)} + {taal === 'en' ? 'base activity' : 'basisactiviteit'} {Math.round(dagSchema.profiel.bmr * 0.40)}
                    {' + '}{taal === 'en' ? 'training' : 'training'} <strong style={{ color: '#d94f30' }}>+{dagSchema.profiel.extraKcalDag} kcal</strong>
                    {dagSchema.profiel.trendCorrectie !== 0 && (
                      <span style={{ color: dagSchema.profiel.trendCorrectie > 0 ? '#16a34a' : '#cc1f1a', fontWeight: 700 }}>
                        {' '}{dagSchema.profiel.trendCorrectie > 0 ? '+' : ''}{dagSchema.profiel.trendCorrectie} {taal === 'en' ? '(trend corr.)' : '(trendcorrectie)'}
                      </span>
                    )}
                    {' = '}<strong>{Math.round(dagSchema.doelen.kcalDag)} kcal</strong>
                  </span>
                  <span style={{ marginLeft: 'auto', fontSize: 11, color: '#16a34a' }}>
                    {taal === 'en' ? 'Formula: (MET−1.3)×weight×duration' : 'Formule: (MET−1.3)×gewicht×duur'}
                  </span>
                </div>

                <div className="stat-grid-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
                  <div className="stat-card-accent">
                    <div className="stat-label">{t('label_kcal_dag')}</div>
                    <div className="stat-value">{Math.round(dagSchema.doelen.kcalDag)}<span className="stat-unit">kcal</span></div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label"><Tip id="bmr">BMR</Tip></div>
                    <div className="stat-value">{Math.round(dagSchema.profiel.bmr)}<span className="stat-unit">kcal</span></div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label"><Tip id="tdee">TDEE</Tip> · <Tip id="pal">PAL</Tip></div>
                    <div className="stat-value">{Math.round(dagSchema.profiel.tdee)}<span className="stat-unit">kcal</span></div>
                    <div className="mono" style={{ fontSize: 11, marginTop: 6, color: '#6b6b65' }}>PAL {dagSchema.profiel.pal.toFixed(2)}</div>
                  </div>
                </div>

                <div className="stat-grid-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 32 }}>
                  <div className="stat-card">
                    <div className="stat-label"><Tip id="eiwit_per_kg">{t('label_eiwit')}</Tip></div>
                    <div className="stat-value">{Math.round(dagSchema.doelen.eiwitG)}<span className="stat-unit">g</span></div>
                    <div className="mono" style={{ fontSize: 11, marginTop: 6, color: '#6b6b65' }}>{dagSchema.doelen.eiwitPerKg.toFixed(2)} g/kg</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label"><Tip id="ch_per_kg">{t('label_kh')}</Tip></div>
                    <div className="stat-value">{Math.round(dagSchema.doelen.chG)}<span className="stat-unit">g</span></div>
                    <div className="mono" style={{ fontSize: 11, marginTop: 6, color: '#6b6b65' }}>{dagSchema.doelen.chPerKg.toFixed(1)} g/kg</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label"><Tip id="vet_pct">{t('label_vet')}</Tip></div>
                    <div className="stat-value">{Math.round(dagSchema.doelen.vetG)}<span className="stat-unit">g</span></div>
                    <div className="mono" style={{ fontSize: 11, marginTop: 6, color: '#6b6b65' }}>{dagSchema.doelen.vetPctKcal.toFixed(0)}% kcal</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label"><Tip id="vezels">{t('label_vezels')}</Tip></div>
                    {(() => {
                      const totaalVezels = dagSchema.maaltijden.reduce((sum, m) =>
                        sum + (m.recept ? berekenVezels(m.recept.ingredienten) : 0), 0);
                      const target = dagSchema.doelen.vezelG;
                      const halen = totaalVezels >= target * 0.85;
                      return (
                        <>
                          <div className="stat-value" style={{ color: halen ? '#1a1a1a' : '#d97706' }}>
                            {Math.round(totaalVezels * 10) / 10}<span className="stat-unit">/{target}g</span>
                          </div>
                          <div className="mono" style={{ fontSize: 11, marginTop: 6, color: '#6b6b65' }}>
                            {halen ? '✓ doel gehaald' : `nog ${Math.round((target - totaalVezels) * 10) / 10}g te gaan`}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* MICRONUTRIËNTEN — ijzer, vitD, mg, ca */}
                {(() => {
                  const totaalMicros = dagSchema.maaltijden.reduce((acc, m) => {
                    if (!m.recept) return acc;
                    const mc = berekenMicros(m.recept.ingredienten);
                    return { fe: acc.fe + mc.fe, vitD: acc.vitD + mc.vitD, mg: acc.mg + mc.mg, ca: acc.ca + mc.ca };
                  }, { fe: 0, vitD: 0, mg: 0, ca: 0 });
                  const doelen = microDoelen(input);
                  const items = [
                    { naam: 'IJzer', val: totaalMicros.fe, doel: doelen.fe_doel, eenheid: 'mg', kleur: '#cc1f1a',
                      tip: input.geslacht === 'vrouw' ? 'Kritisch voor vrouwen' : 'Bronnen: rood vlees, mosselen, linzen' },
                    { naam: 'Vit D', val: totaalMicros.vitD, doel: doelen.vitD_doel, eenheid: 'µg', kleur: '#d97706',
                      tip: 'Voeding levert zelden 100% — supplement vaak nodig in winter' },
                    { naam: 'Magnesium', val: totaalMicros.mg, doel: doelen.mg_doel, eenheid: 'mg', kleur: '#7c3aed',
                      tip: 'Bronnen: noten, zaden, donkergroen, volkoren' },
                    { naam: 'Calcium', val: totaalMicros.ca, doel: doelen.ca_doel, eenheid: 'mg', kleur: '#0891b2',
                      tip: 'Bronnen: zuivel, sardientjes, sesamzaad, tofu' }
                  ];
                  return (
                    <div style={{ marginBottom: 24 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                        <h3 style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b65', margin: 0 }}>
                          <Tip id="micros">{t('micros_titel')}</Tip>
                        </h3>
                        <span className="mono" style={{ fontSize: 10, color: '#999' }}>
                          {input.geslacht === 'vrouw' ? '♀ vrouw' : '♂ man'}
                        </span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                        {items.map(it => {
                          const pct = it.doel > 0 ? Math.min(100, (it.val / it.doel) * 100) : 0;
                          const halen = pct >= 85;
                          const onder70 = pct < 70;
                          return (
                            <div key={it.naam} className="stat-card" style={{ padding: '10px 12px' }}>
                              <div style={{ fontSize: 10, color: '#6b6b65', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                                {it.naam}
                              </div>
                              <div className="display-font" style={{ fontSize: 17, fontWeight: 600, color: halen ? '#16a34a' : onder70 ? '#cc1f1a' : '#d97706' }}>
                                {it.val < 10 && it.eenheid !== 'mg' ? it.val.toFixed(1) : Math.round(it.val)}
                                <span style={{ fontSize: 10, color: '#999', fontWeight: 400 }}>/{it.doel}{it.eenheid}</span>
                              </div>
                              <div style={{ marginTop: 6, height: 4, background: '#e5e5e0', position: 'relative' }}>
                                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%',
                                              width: `${pct}%`, background: it.kleur, transition: 'width 0.3s' }} />
                              </div>
                              <div style={{ fontSize: 10, color: '#6b6b65', marginTop: 4, lineHeight: 1.4 }}>
                                {Math.round(pct)}%
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {input.geslacht === 'vrouw' && totaalMicros.fe < doelen.fe_doel * 0.7 && (
                        <div style={{ marginTop: 8, padding: '10px 12px', background: '#fdf0ef', borderLeft: '3px solid #cc1f1a', fontSize: 12, color: '#841412' }}>
                          ⚠️ <strong>IJzer-inname laag:</strong> {Math.round(totaalMicros.fe * 10) / 10} mg / {doelen.fe_doel} mg.
                          Vrouwelijke sporters lopen verhoogd risico op ijzertekort. Overweeg meer rood vlees, mosselen, sesamzaad, of bespreek supplementatie met sportarts.
                        </div>
                      )}
                      {totaalMicros.vitD < doelen.vitD_doel * 0.5 && (() => {
                        const winter = [10, 11, 0, 1, 2, 3].includes(new Date().getMonth());
                        return (
                          <div style={{ marginTop: 8, padding: '10px 12px', background: '#fef7ed', borderLeft: '3px solid #d97706', fontSize: 12, color: '#7c4a06' }}>
                            ☀️ <strong>Vit D-inname laag:</strong> {totaalMicros.vitD.toFixed(1)} µg / {doelen.vitD_doel} µg.
                            {winter ? ' In wintermaanden levert zonlicht weinig — supplementatie (10-25 µg/dag) vaak aanbevolen.' : ' Probeer 15-20 min zon/dag (handen, gezicht) en eet meer vette vis.'}
                          </div>
                        );
                      })()}
                    </div>
                  );
                })()}

                <div className="tab-nav">
                  {[
                    { v: 'dagschema', label: t('tab_dagschema') },
                    { v: 'weekschema', label: t('tab_weekplanning') },
                    { v: 'boodschappen', label: t('tab_boodschappen') },
                    { v: 'recepten', label: t('tab_recepten') },
                    { v: 'tracking', label: t('tab_tracking') },
                    { v: 'supplementen', label: t('tab_supplementen') },
                    { v: 'hydratatie', label: t('tab_hydratatie') }
                  ].map(t2 => (
                    <button key={t2.v} className={`tab-button ${activeTab === t2.v ? 'active' : ''}`} onClick={() => setActiveTab(t2.v)}>
                      {t2.label}
                    </button>
                  ))}
                </div>

                {activeTab === 'dagschema' && (
                  <>
                    <div style={{ display: 'flex', gap: 0, marginBottom: 20, borderBottom: '1px solid #e5e5e0' }}>
                      {[
                        { v: 'rustdag',       label: t('dag_rustdag') },
                        { v: 'krachtdag',     label: t('dag_krachtdag') },
                        { v: 'cardiodag',     label: t('dag_cardiodag') },
                        { v: 'handbaldag',    label: t('dag_handbaldag') },
                        { v: 'kracht_handbal',label: t('dag_kracht_handbal') },
                        { v: 'wedstrijddag',  label: t('dag_wedstrijddag') },
                      ].map(d => (
                        <button key={d.v} onClick={() => setActiveDay(d.v)} style={{
                          padding: '12px 20px', background: 'none', border: 'none',
                          borderBottom: activeDay === d.v ? '3px solid #d94f30' : '3px solid transparent',
                          cursor: 'pointer', fontSize: 15, fontWeight: activeDay === d.v ? 600 : 400,
                          color: activeDay === d.v ? '#1a1a1a' : '#6b6b65', fontFamily: 'inherit'
                        }}>{d.label}</button>
                      ))}
                    </div>

                    {dagSchema && dagSchema.doelen && dagSchema.doelen.dagtype !== 'trainingsdag' && (
                      <div style={{
                        padding: '12px 16px', marginBottom: 20,
                        background: activeDay === 'rustdag' ? '#f0f9ff' : '#fef7ed',
                        borderLeft: '3px solid ' + (activeDay === 'rustdag' ? '#0891b2' : '#d97706'),
                        fontSize: 13, lineHeight: 1.6
                      }}>
                        {activeDay === 'rustdag' && (
                          <>
                            <strong style={{ color: '#075985' }}>💤 {taal === 'en' ? 'Rest day — adjusted macros' : 'Rustdag — aangepaste macros'}</strong><br />
                            <span style={{ color: '#1a1a1a' }}>
                              {taal === 'en'
                                ? <>Rest days have lower energy needs. CH is reduced (~{Math.round((1 - (dagSchema.doelen.chFactor || 0.65)) * 100)}% less) to match lower glycogen demand. Protein stays at 1.8 g/kg for recovery. Fat slightly higher for satiety. <em>Source: ACSM 2016, ISSN 2017.</em></>
                                : <>Op rustdagen verbruik je minder energie. KH zijn verlaagd (~{Math.round((1 - (dagSchema.doelen.chFactor || 0.65)) * 100)}% minder) voor lagere glycogeen-vraag. Eiwit blijft 1.8 g/kg voor herstel. Vet iets hoger voor verzadiging. <em>Bron: ACSM 2016, ISSN 2017.</em></>}
                            </span>
                          </>
                        )}
                        {(activeDay === 'matchdag' || activeDay === 'wedstrijddag') && (
                          <>
                            <strong style={{ color: '#7c4a06' }}>🏐 {taal === 'en' ? 'Match day — extra fuel' : 'Matchdag — extra brandstof'}</strong><br />
                            <span style={{ color: '#1a1a1a' }}>
                              {taal === 'en'
                                ? <>Match days need extra glycogen. Extra training kcal today: <strong>+{dagSchema.doelen.extraKcalDag || 0} kcal</strong>. CH increased (target 7–10 g/kg). Fat lower pre-match for faster digestion.</>
                                : <>Matchdagen vragen extra glycogeen. Extra training-kcal vandaag: <strong>+{dagSchema.doelen.extraKcalDag || 0} kcal</strong>. KH verhoogd (doel 7–10 g/kg). Vet lager pre-match voor snellere vertering.</>}
                            </span>
                          </>
                        )}
                      </div>
                    )}

                    {activeDay === 'matchdag' && (() => {
                      const protocol = genereerMatchProtocol(input, input.gewicht, input.matchDuur || 60);
                      return (
                        <div style={{ marginBottom: 32 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                            <h3 className="display-font" style={{ margin: 0, fontSize: 22 }}>Match-day protocol</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
                              <label style={{ fontSize: 12, color: '#6b6b65' }}>Match-tijd:</label>
                              <input type="time" value={input.matchTijd} onChange={e => u('matchTijd', e.target.value)}
                                style={{ padding: '6px 10px', border: '1.5px solid #e5e5e0', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }} />
                              <label style={{ fontSize: 12, color: '#6b6b65' }}>Duur:</label>
                              <select value={input.matchDuur || 60} onChange={e => u('matchDuur', parseInt(e.target.value))}
                                style={{ padding: '6px 10px', border: '1.5px solid #e5e5e0', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>
                                <option value={60}>60 min</option>
                                <option value={70}>70 min</option>
                                <option value={80}>80 min</option>
                              </select>
                            </div>
                          </div>

                          <div style={{ background: '#fef7ed', borderLeft: '4px solid #d94f30', padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#7c4a06' }}>
                            <strong>📋 Wedstrijd om {protocol.matchTijd}, eindtijd ~{protocol.eindMatchTijd}.</strong> Volg dit protocol voor optimale prestatie en herstel.
                            Voor het reguliere maaltijdschema, scrol naar beneden.
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {protocol.fases.map(fase => (
                              <div key={fase.nummer} style={{ background: 'white', border: '1px solid #e5e5e0', borderLeft: `4px solid ${fase.kleur}`, padding: '16px 20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                                  <h4 style={{ margin: 0, fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600 }}>
                                    <span style={{ color: fase.kleur, marginRight: 6 }}>{fase.nummer}.</span> {fase.titel}
                                  </h4>
                                  <span className="mono" style={{ fontSize: 11, color: fase.kleur, fontWeight: 600, letterSpacing: '0.05em' }}>
                                    {fase.wanneer.toUpperCase()}
                                  </span>
                                </div>
                                <p style={{ margin: '0 0 8px 0', fontSize: 13, color: '#444' }}>{fase.doel}</p>
                                <div className="mono" style={{ fontSize: 12, color: '#1a1a1a', padding: '6px 10px', background: '#fafaf7', marginBottom: 10, display: 'inline-block' }}>
                                  {fase.macros}
                                </div>
                                <div style={{ marginBottom: 8 }}>
                                  <strong style={{ fontSize: 11, color: '#6b6b65', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Voorbeelden:</strong>
                                  <ul style={{ margin: '6px 0 0 0', paddingLeft: 20, fontSize: 13, color: '#1a1a1a' }}>
                                    {fase.voorbeelden.map((v, i) => <li key={i} style={{ marginBottom: 3 }}>{v}</li>)}
                                  </ul>
                                </div>
                                <div style={{ fontSize: 12, color: '#6b6b65', fontStyle: 'italic', marginTop: 8, lineHeight: 1.5 }}>
                                  {fase.tip}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div style={{ marginTop: 24, padding: '14px 18px', background: '#1a1a1a', color: 'white', fontSize: 13, lineHeight: 1.6 }}>
                            <strong style={{ letterSpacing: '0.05em' }}>📚 BRONNEN:</strong> ACSM/AND/DC 2016 (B1) · IOC 2018 (B3) · ISSN Nutrient Timing 2017 (B6) · ISSN Caffeine 2021 (B8). Aanbevelingen zijn algemeen — pas aan op individuele tolerantie. Test alles tijdens trainingen, nooit voor het eerst op matchdag.
                          </div>

                          <h3 className="display-font" style={{ fontSize: 22, marginTop: 32, marginBottom: 12 }}>Standaard maaltijdschema (matchdag)</h3>
                          <p style={{ fontSize: 13, color: '#6b6b65', marginBottom: 16 }}>
                            Vergelijking met het reguliere matchdag-schema (carb-load + extra CH).
                          </p>
                        </div>
                      );
                    })()}

                    <div style={{ marginBottom: 32 }}>
                      {dagSchema.maaltijden.map((m, i) => (
                        <div key={i} className="meal-card">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                            <div onClick={() => m.recept && setOpenRecept(m.recept)} style={{ cursor: 'pointer', flex: 1 }}>
                              <div className="meal-time">{m.tijd}</div>
                              <div className="meal-name">{m.naam}</div>
                            </div>
                            {m.recept && (
                              <div style={{ display: 'flex', gap: 6, flexShrink: 0, alignItems: 'center' }}>
                                {(() => {
                                  const vandaag = new Date().toISOString().slice(0, 10);
                                  const status = getAdherence(vandaag, i);
                                  return (
                                    <div style={{ display: 'flex', gap: 2 }}>
                                      <button onClick={(e) => { e.stopPropagation(); setAdherenceVoor(vandaag, i, status === 'gegeten' ? null : 'gegeten'); }}
                                        title="Gegeten zoals gepland"
                                        style={{ padding: '4px 8px', fontSize: 11, cursor: 'pointer',
                                                 background: status === 'gegeten' ? '#16a34a' : 'white',
                                                 color: status === 'gegeten' ? 'white' : '#16a34a',
                                                 border: '1.5px solid #16a34a', fontFamily: 'inherit' }}>
                                        ✓
                                      </button>
                                      <button onClick={(e) => { e.stopPropagation(); setAdherenceVoor(vandaag, i, status === 'afgeweken' ? null : 'afgeweken'); }}
                                        title="Afgeweken / overgeslagen"
                                        style={{ padding: '4px 8px', fontSize: 11, cursor: 'pointer',
                                                 background: status === 'afgeweken' ? '#d97706' : 'white',
                                                 color: status === 'afgeweken' ? 'white' : '#d97706',
                                                 border: '1.5px solid #d97706', fontFamily: 'inherit' }}>
                                        ✗
                                      </button>
                                    </div>
                                  );
                                })()}
                                {heeftOverride('dag', null, i) && (
                                  <button onClick={() => resetOverride('dag', null, i)} className="pill-button small" title="Reset naar origineel">↺</button>
                                )}
                                <button onClick={() => openSwap('dag', null, i, m)} className="pill-button small" title="Andere optie">
                                  {t('label_vervang')}
                                </button>
                              </div>
                            )}
                          </div>
                          {m.recept ? (
                            <div onClick={() => setOpenRecept(m.recept)} style={{ cursor: 'pointer' }}>
                              <div className="recipe-name">
                                <span>{m.recept.naam}</span>
                                <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexShrink: 0 }}>
                                  {input.budgetMode && (() => {
                                    const goedkoop = ['ei','kipfilet','kalkoenfilet','kalkoenspek','tonijn_blik_water','sardientjes_blik','magere_kwark','cottage_cheese','havermout','pasta_droog','rijst_basmati_droog','aardappel','zwarte_bonen_gekookt','kikkererwten_gekookt','rode_linzen_droog','tofu_naturel'];
                                    const heeftGoedkoop = m.recept.ingredienten.some(i => goedkoop.includes(i.item));
                                    const isBatch = m.recept.batch_geschikt;
                                    if (heeftGoedkoop || isBatch) return (
                                      <span style={{ fontSize: 10, padding: '2px 6px', background: '#fef3c7', color: '#854d0e', fontWeight: 600, border: '1px solid #fcd34d' }}
                                        title={isBatch ? 'Budget + batch-koken mogelijk — zie Weekplanning voor meal-prep tips' : 'Budget-vriendelijk recept'}>
                                        💰 {isBatch ? 'budget · batch' : 'budget'}
                                      </span>
                                    );
                                    return null;
                                  })()}
                                  {m.recept.batch_geschikt && !input.budgetMode && (
                                    <span style={{ fontSize: 10, padding: '2px 6px', background: '#fef7ed', color: '#854d0e' }} title="Geschikt voor batch-koken — zie Weekplanning voor meal-prep tips">🍱 batch</span>
                                  )}
                                  <span className="click-hint">details →</span>
                                </div>
                              </div>
                              <div className="meal-macros">
                                <div className="macro-pill"><span className="label">kcal</span><span className="value">{Math.round(m.recept.macros.kcal)}</span></div>
                                <div className="macro-pill"><span className="label">eiwit</span><span className="value">{Math.round(m.recept.macros.eiwit_g)}g</span></div>
                                <div className="macro-pill"><span className="label">CH</span><span className="value">{Math.round(m.recept.macros.ch_g)}g</span></div>
                                <div className="macro-pill"><span className="label">vet</span><span className="value">{Math.round(m.recept.macros.vet_g)}g</span></div>
                                <div className="macro-pill"><span className="label">vezels</span><span className="value">{berekenVezels(m.recept.ingredienten).toFixed(1)}g</span></div>
                                <div className="macro-pill"><span className="label">kooktijd</span><span className="value">{m.recept.kooktijd_min} min</span></div>
                                <div className="macro-pill"><span className="label">keuken</span><span className="value" style={{ fontSize: 11 }}>{KEUKEN_LABELS[m.recept.keuken]?.split(' ')[0] || m.recept.keuken}</span></div>
                              </div>
                              <ul className="ingr-list">
                                {m.recept.ingredienten.slice(0, 4).map((ing, j) => (
                                  <li key={j}>
                                    <span className="name">{formatIngredientName(ing.item)}</span>
                                    <span className="gram">{formatGram(ing.gram, ing.item)}</span>
                                  </li>
                                ))}
                                {m.recept.ingredienten.length > 4 && (
                                  <li style={{ color: '#999', fontSize: 12, fontStyle: 'italic' }}>
                                    + {m.recept.ingredienten.length - 4} ingrediënt(en)…
                                  </li>
                                )}
                              </ul>
                              {input.budgetMode && isDroogRecept(m.recept) && (() => {
                                const saus = suggesteerSaus(m.recept);
                                return (
                                  <div style={{ marginTop: 10, padding: '10px 12px', background: '#fef7ed', borderLeft: '3px solid #d97706', fontSize: 12, color: '#7c4a06' }}>
                                    <strong>💡 Saus-suggestie: {saus.naam}</strong>
                                    <span style={{ fontSize: 11, marginLeft: 6, color: '#a16207' }}>
                                      ({saus.tijd_min} min · {saus.macros.kcal} kcal extra)
                                    </span>
                                    <div style={{ marginTop: 4, fontSize: 11, color: '#a16207', fontStyle: 'italic' }}>
                                      Klik op het recept voor het volledige sauscecept.
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          ) : (
                            <div style={{ padding: 20, background: '#fef7ed', color: '#7c4a06', fontSize: 13 }}>
                              Geen recept gevonden voor deze combinatie. Probeer minder restricties of een andere keuken.
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activeTab === 'weekschema' && weekSchema && (
                  <>
                    <div className="stat-card" style={{ marginBottom: 20 }}>
                      <h3 style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b65', margin: '0 0 12px 0' }}>
                        {taal === 'en' ? 'Week pattern — adjust your training schedule' : 'Weekpatroon — pas je trainingsschema aan'}
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
                        {t('dag_namen').map((d, i) => (
                          <div key={i} style={{ textAlign: 'center' }}>
                            <div className="mono" style={{ fontSize: 10, color: '#6b6b65', marginBottom: 4 }}>{d}</div>
                            <select
                              value={trainingsdagen[i]}
                              onChange={e => {
                                const nieuw = [...trainingsdagen];
                                nieuw[i] = e.target.value;
                                setTrainingsdagen(nieuw);
                              }}
                              style={{ width: '100%', padding: '6px 2px', fontSize: 10, border: '1px solid #e5e5e0', borderRadius: 0 }}
                            >
                              <option value="rustdag">{taal === 'en' ? 'Rest' : 'Rust'}</option>
                              <option value="krachtdag">{taal === 'en' ? 'Strength' : 'Kracht'}</option>
                              <option value="cardiodag">Cardio</option>
                              <option value="handbaldag">{taal === 'en' ? 'Handball' : 'Handbal'}</option>
                              <option value="kracht_handbal">{taal === 'en' ? 'Str+HB' : 'Kr+HB'}</option>
                              <option value="wedstrijddag">{taal === 'en' ? 'Match' : 'Wedstrijd'}</option>
                            </select>
                          </div>
                        ))}
                      </div>
                      {/* MET legenda */}
                      <div style={{ marginTop: 10, padding: '8px 10px', background: '#f5f5f0', fontSize: 10, color: '#6b6b65', lineHeight: 1.7 }}>
                        <span className="mono" style={{ color: '#d94f30', fontWeight: 700 }}>MET</span>
                        {' · '}
                        {taal === 'en' ? 'Rest: 0 extra' : 'Rust: 0 extra'}
                        {' · Kracht: 4.5 · Cardio: 9.0 · Handbal: 10.0 · Kr+HB: 4.5+10.0 · Wedstrijd: 12.0'}
                        <br/>
                        {taal === 'en'
                          ? 'Formula: (MET − 1.3) × weight × duration = net extra kcal'
                          : 'Formule: (MET − 1.3) × gewicht × duur = netto extra kcal'}
                      </div>
                    </div>

                    {weekSchema.map((dag, i) => {
                      const dagKcal = dag.maaltijden.reduce((s, m) => s + (m.kcal || 0), 0);
                      const dagCh = dag.maaltijden.reduce((s, m) => s + (m.chG || 0), 0);
                      return (
                      <div key={i} className="week-day-card">
                        <div className="week-day-header">
                          <span className="day-label">{dag.dagNaam}</span>
                          <span className={`day-type-tag day-type-${dag.dagtype}`}>
                            {dag.dagtype === 'trainingsdag' ? t('training_label')
                              : dag.dagtype === 'matchdag'   ? t('match_label')
                              : dag.dagtype === 'wedstrijddag' ? t('match_label')
                              : dag.dagtype === 'krachtdag'  ? (taal === 'en' ? 'Strength' : 'Kracht')
                              : dag.dagtype === 'cardiodag'  ? 'Cardio'
                              : dag.dagtype === 'handbaldag' ? (taal === 'en' ? 'Handball' : 'Handbal')
                              : dag.dagtype === 'kracht_handbal' ? (taal === 'en' ? 'Kr+HB' : 'Kr+HB')
                              : t('rust_label')}
                          </span>
                        </div>
                        <div className="mono" style={{
                          fontSize: 10, color: '#6b6b65', marginBottom: 6,
                          padding: '4px 8px', background: '#fafaf7', borderLeft: '2px solid ' + (dag.dagtype === 'rustdag' ? '#0891b2' : dag.dagtype === 'matchdag' ? '#d97706' : '#d94f30')
                        }}>
                          ~{Math.round(dagKcal)} kcal · {Math.round(dagCh)}g CH ({(dagCh/input.gewicht).toFixed(1)} g/kg)
                        </div>
                        <ul className="week-meals-list">
                          {dag.maaltijden.map((m, j) => {
                            const flexDag = input.flexMealDag ?? 5;
                            const flexType = input.flexMealType || 'diner';
                            const isFlex = input.flexMeal && i === flexDag &&
                              dag.maaltijden[j] && dag.maaltijden[j].naam.toLowerCase().includes(flexType.slice(0, 4));
                            if (isFlex) {
                              return (
                                <li key={j} style={{ background: '#f0fdf4', borderLeft: '3px solid #16a34a', padding: '8px 12px' }}>
                                  <span style={{ flexShrink: 0, marginRight: 12, color: '#15803d', fontSize: 11, minWidth: 100 }} className="mono">{m.tijd}</span>
                                  <span style={{ color: '#15803d', flex: 1 }}>
                                    <strong>🎉 Flex-meal:</strong> vrije keuze (~{Math.round(m.kcal)} kcal · {Math.round(m.eiwitG)}g E)
                                    <div style={{ fontSize: 11, color: '#16a34a', marginTop: 2 }}>
                                      Pizza, BBQ, restaurant — geniet ervan, blijf in de buurt van de macros.
                                    </div>
                                  </span>
                                </li>
                              );
                            }
                            return (
                              <li key={j}>
                                <span style={{ flexShrink: 0, marginRight: 12, color: '#6b6b65', fontSize: 11, minWidth: 100 }} className="mono">{m.tijd}</span>
                                <span className="recept-naam" onClick={() => m.recept && setOpenRecept(m.recept)} style={{ cursor: 'pointer' }}>
                                  <strong>{m.naam}:</strong> {m.recept ? m.recept.naam : <em style={{ color: '#999' }}>geen recept</em>}
                                </span>
                                {m.recept && <span className="recept-kcal">{Math.round(m.recept.macros.kcal)} kcal</span>}
                                {m.recept && (
                                  <button onClick={(e) => { e.stopPropagation(); openSwap('week', i, j, m); }}
                                    className="pill-button small"
                                    style={{ marginLeft: 8, padding: '2px 8px', fontSize: 10 }}
                                    title="Vervang">↻</button>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      );
                    })}

                    {/* MEAL-PREP SUGGESTIES */}
                    {(() => {
                      const suggesties = genereerMealPrepSuggesties(weekSchema, input);
                      if (suggesties.length === 0) return null;
                      return (
                        <div style={{ marginTop: 32 }}>
                          <h3 className="display-font" style={{ fontSize: 22, marginTop: 0, marginBottom: 6 }}>{t('mealprep_titel')}</h3>
                          <p style={{ fontSize: 13, color: '#6b6b65', margin: '0 0 16px 0' }}>
                            Slimme tips om kooktijd te besparen op basis van je weekschema en boodschappen-frequentie.
                          </p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {suggesties.map((s, i) => {
                              const kleur = s.type === 'batch_dubbel' ? '#d94f30'
                                : s.type === 'algemeen' ? '#0891b2'
                                : s.type === 'training' ? '#16a34a'
                                : s.type === 'vries' ? '#7c3aed'
                                : '#6b6b65';
                              const bgKleur = s.type === 'batch_dubbel' ? '#fef7ed'
                                : s.type === 'algemeen' ? '#f0f9ff'
                                : s.type === 'training' ? '#f0fdf4'
                                : s.type === 'vries' ? '#faf5ff'
                                : '#fafaf7';
                              return (
                                <div key={i} style={{ background: bgKleur, borderLeft: `3px solid ${kleur}`, padding: '14px 18px' }}>
                                  <h4 style={{ margin: '0 0 6px 0', fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 600, color: kleur }}>
                                    {s.titel}
                                  </h4>
                                  <p style={{ fontSize: 13, color: '#1a1a1a', margin: '0 0 6px 0', lineHeight: 1.6 }}>
                                    {s.beschrijving}
                                  </p>
                                  {s.tijd_winst && (
                                    <div className="mono" style={{ fontSize: 11, color: kleur, fontWeight: 600 }}>
                                      ⏱ {s.tijd_winst}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </>
                )}

                {activeTab === 'boodschappen' && boodschappen && (
                  <>
                    <div style={{ background: '#f5f5f0', padding: '16px 20px', marginBottom: 20, fontSize: 13, color: '#444', lineHeight: 1.6 }}>
                      <strong>{t('boodschappen_titel')}</strong> — {taal === 'en' ? 'based on the weekly schedule above.' : 'gebaseerd op het weekschema hierboven.'}
                      {input.boodschappen === 1
                        ? ' ' + t('boodschappen_1pw')
                        : ' ' + t('boodschappen_2pw')}
                      <br /><em>{t('boodschappen_routing')}</em>
                    </div>
                    {(input.seizoenFilter !== false) && (() => {
                      // Verzamel alle items en check welke buiten seizoen vallen
                      const huidigeMaand = new Date().getMonth() + 1;
                      const buitenSeizoen = [];
                      Object.entries(boodschappen).forEach(([cat, items]) => {
                        items.forEach(item => {
                          const status = isInSeizoen(item.item_id || item.naam.toLowerCase().replace(/ /g, '_'), huidigeMaand);
                          if (status === false) buitenSeizoen.push(item.naam);
                        });
                      });
                      if (buitenSeizoen.length === 0) return null;
                      return (
                        <div style={{ background: '#fef7ed', borderLeft: '3px solid #d97706', padding: '12px 16px', marginBottom: 16, fontSize: 12, color: '#7c4a06', lineHeight: 1.6 }}>
                          🌱 <strong>Niet in seizoen ({['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'][huidigeMaand-1]}):</strong> {buitenSeizoen.slice(0, 8).join(', ')}{buitenSeizoen.length > 8 ? ` en ${buitenSeizoen.length - 8} meer` : ''}.
                          Overweeg seizoensalternatieven of diepvries-varianten — vaak goedkoper én voedzamer.
                        </div>
                      );
                    })()}
                    {Object.entries(boodschappen).map(([cat, items]) => (
                      <div key={cat} className="shopping-cat">
                        <h3 className="shopping-cat-title">{cat}</h3>
                        <ul className="shopping-list">
                          {items.map((item, j) => {
                            const itemId = item.item_id || item.naam.toLowerCase().replace(/ /g, '_');
                            const seizoenStatus = isInSeizoen(itemId);
                            const isNietSeizoen = seizoenStatus === false && (input.seizoenFilter !== false);
                            const vervangers = isNietSeizoen ? getSeizoensVervanger(itemId) : [];
                            return (
                              <li key={j}>
                                <span className="item">
                                  {item.naam}
                                  {isNietSeizoen && (
                                    <span style={{ marginLeft: 8, fontSize: 10, color: '#d97706', fontWeight: 600, background: '#fef7ed', padding: '2px 6px' }}>
                                      {t('buiten_seizoen')}
                                    </span>
                                  )}
                                  {isNietSeizoen && vervangers.length > 0 && (
                                    <span style={{ marginLeft: 6, fontSize: 10, color: '#16a34a', background: '#f0fdf4', padding: '2px 6px' }}>
                                      {t('vervang_door')} {vervangers.map(v => v.replace(/_/g, ' ')).join(taal === 'en' ? ' or ' : ' of ')}
                                    </span>
                                  )}
                                </span>
                                <span className="gram">{formatBoodschappenItem(item)}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </>
                )}

                {activeTab === 'recepten' && (() => {
                  // Filter alle recepten op basis van recipeFilter
                  let resultaat = RECIPES_DB.recepten;

                  // Tekstuele zoek
                  if (recipeFilter.zoek) {
                    const z = recipeFilter.zoek.toLowerCase();
                    resultaat = resultaat.filter(r =>
                      r.naam.toLowerCase().includes(z) ||
                      r.ingredienten.some(i => i.item.toLowerCase().replace(/_/g, ' ').includes(z))
                    );
                  }
                  if (recipeFilter.type !== 'alle') {
                    resultaat = resultaat.filter(r => r.type === recipeFilter.type);
                  }
                  if (recipeFilter.keuken !== 'alle') {
                    resultaat = resultaat.filter(r => r.keuken === recipeFilter.keuken);
                  }
                  if (recipeFilter.eiwitNiveau !== 'alle') {
                    resultaat = resultaat.filter(r => r.eiwit_niveau === recipeFilter.eiwitNiveau);
                  }
                  if (recipeFilter.maxKooktijd > 0) {
                    resultaat = resultaat.filter(r => r.kooktijd_min <= recipeFilter.maxKooktijd);
                  }
                  if (recipeFilter.glutenvrij) {
                    resultaat = resultaat.filter(r => r.tags.glutenvrij);
                  }
                  if (recipeFilter.lactosevrij) {
                    resultaat = resultaat.filter(r => r.tags.lactosevrij);
                  }
                  if (recipeFilter.alleenFavorieten) {
                    resultaat = resultaat.filter(r => favorieten.includes(r.id));
                  }
                  // Geblokkeerde tonen of niet
                  if (!recipeFilter.toonGeblokkeerd) {
                    resultaat = resultaat.filter(r => !isGeblokkeerd(r.id));
                  }
                  // Sorteer favorieten eerst, dan alfabetisch
                  resultaat.sort((a, b) => {
                    const aFav = favorieten.includes(a.id) ? 0 : 1;
                    const bFav = favorieten.includes(b.id) ? 0 : 1;
                    if (aFav !== bFav) return aFav - bFav;
                    return a.naam.localeCompare(b.naam);
                  });

                  return (
                    <>
                      <div style={{ background: '#f5f5f0', padding: '16px 20px', marginBottom: 20, fontSize: 13, color: '#444', lineHeight: 1.6 }}>
                        <strong>{RECIPES_DB.recepten.length} {t('recepten_totaal')}.</strong> {taal === 'en' ? 'Search or filter, mark favourites, block what you dislike.' : 'Doorzoek of filter de databank, markeer favorieten, blokkeer wat je niet lust.'}
                      </div>

                      {/* FILTER-BAR */}
                      <div className="stat-card" style={{ marginBottom: 16 }}>
                        <input type="text" placeholder={t('recepten_zoek')} value={recipeFilter.zoek}
                          onChange={e => setRecipeFilter({ ...recipeFilter, zoek: e.target.value })}
                          className="input-style" style={{ marginBottom: 12 }} />

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
                          <div>
                            <label className="label-style" style={{ fontSize: 10 }}>{taal === 'en' ? 'Type' : 'Type'}</label>
                            <select value={recipeFilter.type} onChange={e => setRecipeFilter({ ...recipeFilter, type: e.target.value })}
                              style={{ width: '100%', padding: '6px 8px', fontSize: 12, border: '1px solid #e5e5e0' }}>
                              <option value="alle">{t('recepten_filter_type')}</option>
                              <option value="ontbijt">{MLTYPES.ontbijt}</option>
                              <option value="lunch">{MLTYPES.lunch}</option>
                              <option value="diner">{MLTYPES.diner}</option>
                              <option value="snack">{MLTYPES.snack}</option>
                              <option value="pre_workout">{MLTYPES.pre_workout}</option>
                              <option value="post_workout">{MLTYPES.post_workout}</option>
                              <option value="pre_bed">{MLTYPES.pre_bed}</option>
                            </select>
                          </div>
                          <div>
                            <label className="label-style" style={{ fontSize: 10 }}>{taal === 'en' ? 'Cuisine' : 'Keuken'}</label>
                            <select value={recipeFilter.keuken} onChange={e => setRecipeFilter({ ...recipeFilter, keuken: e.target.value })}
                              style={{ width: '100%', padding: '6px 8px', fontSize: 12, border: '1px solid #e5e5e0' }}>
                              <option value="alle">{t('recepten_filter_keuken')}</option>
                              {Object.entries(KL).filter(([k]) => k !== 'geen').map(([k, l]) => (
                                <option key={k} value={k}>{l}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="label-style" style={{ fontSize: 10 }}>{taal === 'en' ? 'Protein level' : 'Eiwit-niveau'}</label>
                            <select value={recipeFilter.eiwitNiveau} onChange={e => setRecipeFilter({ ...recipeFilter, eiwitNiveau: e.target.value })}
                              style={{ width: '100%', padding: '6px 8px', fontSize: 12, border: '1px solid #e5e5e0' }}>
                              <option value="alle">{t('recepten_filter_eiwit')}</option>
                              <option value="vlees_vis">{taal === 'en' ? 'Meat / fish' : 'Vlees / vis'}</option>
                              <option value="zuivel_ei">{taal === 'en' ? 'Dairy / egg' : 'Zuivel / ei'}</option>
                              <option value="vegetarisch">{taal === 'en' ? 'Vegetarian' : 'Vegetarisch'}</option>
                              <option value="veganistisch">Vegan</option>
                            </select>
                          </div>
                        </div>

                        <div style={{ marginBottom: 8 }}>
                          <label className="label-style" style={{ fontSize: 10, display: 'flex', justifyContent: 'space-between' }}>
                            <span>{t('recepten_max_kooktijd')}</span>
                            <span className="mono" style={{ color: '#d94f30' }}>{recipeFilter.maxKooktijd === 0 ? t('recepten_geen_limiet') : `${recipeFilter.maxKooktijd} min`}</span>
                          </label>
                          <input type="range" min="0" max="60" step="5" value={recipeFilter.maxKooktijd}
                            onChange={e => setRecipeFilter({ ...recipeFilter, maxKooktijd: parseInt(e.target.value) })}
                            style={{ width: '100%', accentColor: '#d94f30' }} />
                        </div>

                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, cursor: 'pointer' }}>
                            <input type="checkbox" checked={recipeFilter.glutenvrij}
                              onChange={e => setRecipeFilter({ ...recipeFilter, glutenvrij: e.target.checked })} />
                            {t('recepten_glutenvrij')}
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, cursor: 'pointer' }}>
                            <input type="checkbox" checked={recipeFilter.lactosevrij}
                              onChange={e => setRecipeFilter({ ...recipeFilter, lactosevrij: e.target.checked })} />
                            {t('recepten_lactosevrij')}
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, cursor: 'pointer', color: favorieten.length > 0 ? '#d97706' : '#999' }}>
                            <input type="checkbox" checked={recipeFilter.alleenFavorieten}
                              onChange={e => setRecipeFilter({ ...recipeFilter, alleenFavorieten: e.target.checked })} />
                            ★ {t('recepten_alleen_fav')} ({favorieten.length})
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, cursor: 'pointer' }}>
                            <input type="checkbox" checked={recipeFilter.toonGeblokkeerd}
                              onChange={e => setRecipeFilter({ ...recipeFilter, toonGeblokkeerd: e.target.checked })} />
                            {t('recepten_toon_blok')} ({aantalGeblokkeerd})
                          </label>
                          <button onClick={() => setRecipeFilter({ zoek: '', type: 'alle', keuken: 'alle', eiwitNiveau: 'alle', maxKooktijd: 0, glutenvrij: false, lactosevrij: false, alleenFavorieten: false, toonGeblokkeerd: false })}
                            className="pill-button small" style={{ marginLeft: 'auto' }}>
                            {t('recepten_reset')}
                          </button>
                        </div>
                      </div>

                      <div style={{ marginBottom: 12, fontSize: 12, color: '#6b6b65' }}>
                        <strong>{resultaat.length}</strong> {t('recepten_gevonden')}
                        {resultaat.length === 0 && (taal === 'en' ? ' — adjust filters to see more results.' : ' — pas filters aan om meer resultaten te zien.')}
                      </div>

                      {/* RESULTATEN — grid van compact recipe cards */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
                        {resultaat.slice(0, 50).map(r => {
                          const fav = favorieten.includes(r.id);
                          const blok = isGeblokkeerd(r.id);
                          return (
                            <div key={r.id} className="stat-card" onClick={() => setOpenRecept(r)}
                              style={{ cursor: 'pointer', padding: '12px 14px', position: 'relative',
                                       borderLeft: '3px solid ' + (fav ? '#d97706' : blok ? '#cc1f1a' : '#d94f30'),
                                       opacity: blok ? 0.5 : 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                                <div className="mono" style={{ fontSize: 9, color: '#6b6b65', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                  {r.type.replace('_', '-')} · {KL[r.keuken]?.split(' ')[0] || r.keuken}
                                </div>
                                <div style={{ fontSize: 14 }}>
                                  {fav && <span title="Favoriet" style={{ color: '#d97706', marginRight: 4 }}>★</span>}
                                  {blok && <span title={`Geblokkeerd tot ${geblokkeerd[r.id]}`} style={{ color: '#cc1f1a' }}>⏸</span>}
                                </div>
                              </div>
                              <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: 15, fontWeight: 600, margin: '0 0 6px 0', lineHeight: 1.3 }}>{r.naam}</h4>
                              <div className="mono" style={{ fontSize: 10, color: '#6b6b65', marginBottom: 4 }}>
                                {Math.round(r.macros.kcal)} kcal · {Math.round(r.macros.eiwit_g)}g E · {Math.round(r.macros.ch_g)}g CH · {r.kooktijd_min} min
                              </div>
                              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
                                {r.tags.glutenvrij && <span style={{ fontSize: 9, padding: '1px 5px', background: '#dcfce7', color: '#166534' }}>GV</span>}
                                {r.tags.lactosevrij && <span style={{ fontSize: 9, padding: '1px 5px', background: '#e0f2fe', color: '#075985' }}>LV</span>}
                                {r.tags.veganistisch && <span style={{ fontSize: 9, padding: '1px 5px', background: '#dcfce7', color: '#166534' }}>vegan</span>}
                                {r.batch_geschikt && <span style={{ fontSize: 9, padding: '1px 5px', background: '#fef3c7', color: '#854d0e' }}>batch</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {resultaat.length > 50 && (
                        <div style={{ marginTop: 16, padding: 12, textAlign: 'center', color: '#6b6b65', fontSize: 12 }}>
                          Toon eerste 50 van {resultaat.length} resultaten — verfijn filters voor specifiekere lijst.
                        </div>
                      )}
                    </>
                  );
                })()}

                {activeTab === 'tracking' && (
                  <>
                    {!input.mentaalOptIn ? (
                      <div className="stat-card" style={{ borderLeft: '4px solid #d97706', background: '#fef7ed', padding: '20px 24px' }}>
                        <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 20, margin: '0 0 12px 0', color: '#7c4a06' }}>
                          ⚠️ Even stilstaan voor je begint met tracking
                        </h3>
                        <p style={{ fontSize: 14, color: '#7c4a06', lineHeight: 1.6, margin: '0 0 12px 0' }}>
                          Wekelijks gewicht en herstel registreren is een krachtige tool — maar het is <strong>niet voor iedereen geschikt</strong>.
                        </p>
                        <p style={{ fontSize: 13, color: '#444', lineHeight: 1.6, margin: '0 0 12px 0' }}>
                          Tracking-tools kunnen schadelijk zijn als je:
                        </p>
                        <ul style={{ fontSize: 13, color: '#444', lineHeight: 1.7, margin: '0 0 16px 18px', padding: 0 }}>
                          <li>Een <strong>geschiedenis hebt van eetstoornissen</strong> (anorexia, boulimia, orthorexia, ARFID)</li>
                          <li><strong>Obsessief over getallen</strong> denkt of compulsief gedrag rond gewicht/voeding hebt</li>
                          <li>Last hebt van <strong>body dysmorphia</strong> of een sterk negatief lichaamsbeeld</li>
                          <li>In een periode zit van <strong>hoge stress, angst of depressie</strong></li>
                          <li>Onder <strong>15 jaar</strong> bent zonder begeleiding van een sportdiëtist</li>
                        </ul>
                        <p style={{ fontSize: 13, color: '#444', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                          Twijfel je? Praat met je huisarts of een sportdiëtist <strong>vóór</strong> je begint met dagelijks tracken.
                          Voor steun bij eetstoornissen: <a href="https://anbn.be" target="_blank" rel="noopener" style={{ color: '#d94f30' }}>anbn.be</a> (BE) of National Alliance for Eating disorder helpline (NL).
                        </p>
                        <div style={{ background: 'white', padding: '12px 14px', marginBottom: 16, fontSize: 12, color: '#6b6b65' }}>
                          Het gewicht-getal op de weegschaal zegt <em>niets</em> over je waarde als persoon of speler.
                          Trends over weken zijn nuttig; één meting niet.
                        </div>
                        <button onClick={() => u('mentaalOptIn', true)} className="profile-button primary" style={{ width: '100%', padding: '12px' }}>
                          Ik begrijp dit en wil tracking gebruiken
                        </button>
                      </div>
                    ) : (
                      <>
                    <div style={{ background: '#f5f5f0', padding: '16px 20px', marginBottom: 20, fontSize: 13, color: '#444', lineHeight: 1.6 }}>
                      <strong>Volg je vooruitgang.</strong> Log je gewicht en herstel-score om trends te zien en automatische voedings-aanpassingen te krijgen.
                      {!actiefProfielNaam && <><br /><em>⚠️ Geen actief profiel — open "Profielen" en bewaar er één om logs blijvend op te slaan.</em></>}
                      <div style={{ marginTop: 8, fontSize: 11, color: '#6b6b65' }}>
                        <button onClick={() => u('mentaalOptIn', false)} style={{ background: 'none', border: 'none', color: '#d94f30', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: 11 }}>
                          Tracking uitschakelen
                        </button>
                      </div>
                    </div>

                    {/* ADHERENCE — laatste 7 dagen */}
                    {/* ── GEWICHTSTRENDKAART ─────────────────────────────── */}
                    {gewichtsTrend && (
                      <div className="stat-card" style={{ marginBottom: 16, borderLeft: '4px solid ' + (
                        gewichtsTrend.status === 'ok' ? '#16a34a' :
                        gewichtsTrend.status === 'te_snel' ? '#cc1f1a' : '#d97706'
                      )}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                          <h3 style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b65', margin: 0 }}>
                            {taal === 'en' ? '⚖️ Weight trend → kcal adjustment' : '⚖️ Gewichtstrendkoppeling → kcal-correctie'}
                          </h3>
                          <div className="display-font" style={{ fontSize: 22, fontWeight: 600, color: gewichtsTrend.status === 'ok' ? '#16a34a' : gewichtsTrend.status === 'te_snel' ? '#cc1f1a' : '#d97706' }}>
                            {gewichtsTrend.deltaKgPerMaand > 0 ? '+' : ''}{gewichtsTrend.deltaKgPerMaand}
                            <span style={{ fontSize: 12, color: '#999', marginLeft: 2 }}>kg/mnd</span>
                          </div>
                        </div>

                        {/* Sweet spot bar */}
                        <div style={{ marginBottom: 12 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#6b6b65', marginBottom: 3 }}>
                            <span>{taal === 'en' ? 'Sweet spot: ' : 'Sweet spot: '}+{gewichtsTrend.minKgPerMaand}–{gewichtsTrend.maxKgPerMaand} kg/{taal === 'en' ? 'month' : 'mnd'} (0.5–1%)</span>
                            <span className="mono" style={{ color: '#d94f30' }}>{gewichtsTrend.deltaPctPerMaand > 0 ? '+' : ''}{gewichtsTrend.deltaPctPerMaand}%/{taal === 'en' ? 'month' : 'mnd'}</span>
                          </div>
                          <div style={{ height: 8, background: '#e5e5e0', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '20%', right: '50%', height: '100%', background: '#dcfce7', opacity: 0.7 }} />
                            <div style={{
                              position: 'absolute', top: 0, bottom: 0, width: 3, background: '#d94f30',
                              left: Math.max(0, Math.min(100, 50 + gewichtsTrend.deltaPctPerMaand * 25)) + '%',
                              transform: 'translateX(-50%)'
                            }} />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#aaa', marginTop: 2 }}>
                            <span>−2%</span><span>0</span><span style={{ color: '#16a34a' }}>sweet spot</span><span>+2%</span>
                          </div>
                        </div>

                        {/* Advies + correctie */}
                        <div style={{ padding: '8px 10px', background: gewichtsTrend.status === 'ok' ? '#f0fdf4' : '#fef7ed', fontSize: 12, lineHeight: 1.6 }}>
                          {gewichtsTrend.advies}
                        </div>
                        {gewichtsTrend.kcalCorrectie !== 0 && (
                          <div style={{ marginTop: 8, padding: '8px 10px', background: '#fafaf7', border: '1px solid #e5e5e0', fontSize: 12 }}>
                            <strong>{taal === 'en' ? '✓ Applied to your plan: ' : '✓ Toegepast in je plan: '}</strong>
                            <span className="mono" style={{ color: gewichtsTrend.kcalCorrectie > 0 ? '#16a34a' : '#cc1f1a', fontWeight: 700 }}>
                              {gewichtsTrend.kcalCorrectie > 0 ? '+' : ''}{gewichtsTrend.kcalCorrectie} kcal/dag
                            </span>
                            <span style={{ color: '#6b6b65' }}>
                              {taal === 'en' ? ' automatically added to all daily targets.' : ' automatisch verrekend in alle dagdoelen.'}
                            </span>
                          </div>
                        )}
                        <div style={{ marginTop: 6, fontSize: 10, color: '#aaa' }}>
                          {taal === 'en'
                            ? `Based on ${gewichtsTrend.aantalMetingen} measurements over ${gewichtsTrend.dagenGevolgd} days. Source: Helms et al. 2014, NSCA.`
                            : `Gebaseerd op ${gewichtsTrend.aantalMetingen} metingen over ${gewichtsTrend.dagenGevolgd} dagen. Bron: Helms et al. 2014, NSCA.`}
                        </div>
                      </div>
                    )}
                    {!gewichtsTrend && trackingLogs.filter(l => l.gewicht).length > 0 && trackingLogs.filter(l => l.gewicht).length < 2 && (
                      <div style={{ padding: '10px 14px', background: '#f5f5f0', marginBottom: 12, fontSize: 12, color: '#6b6b65' }}>
                        {taal === 'en'
                          ? '⏳ Log weight for at least 2 weeks to activate automatic kcal adjustment based on trend.'
                          : '⏳ Log gewicht gedurende minstens 2 weken om automatische kcal-correctie op basis van trend te activeren.'}
                      </div>
                    )}

                    {adherence7d && (
                      <div className="stat-card" style={{ marginBottom: 16, borderLeft: '3px solid ' + (adherence7d.score >= 80 ? '#16a34a' : adherence7d.score >= 60 ? '#d97706' : '#cc1f1a') }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                          <h3 style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b65', margin: 0 }}>
                            Plan-adherence — laatste 7 dagen
                          </h3>
                          <div className="display-font" style={{ fontSize: 26, fontWeight: 600, color: adherence7d.score >= 80 ? '#16a34a' : adherence7d.score >= 60 ? '#d97706' : '#cc1f1a' }}>
                            {adherence7d.score}<span style={{ fontSize: 14, color: '#999' }}>%</span>
                          </div>
                        </div>
                        <div style={{ fontSize: 12, color: '#444', lineHeight: 1.6 }}>
                          {adherence7d.gegeten} gegeten zoals gepland · {adherence7d.afgeweken} afgeweken · totaal getrackt: {adherence7d.totaal} maaltijden
                          <br />
                          {adherence7d.score >= 85 && <span style={{ color: '#15803d' }}>✓ Excellente adherence — je trends in gewicht/herstel zijn betrouwbaar.</span>}
                          {adherence7d.score >= 60 && adherence7d.score < 85 && <span style={{ color: '#a16207' }}>⚠ Gemiddelde adherence — overweeg of het plan haalbaar is, of pas porties/recepten aan.</span>}
                          {adherence7d.score < 60 && <span style={{ color: '#841412' }}>⚠ Lage adherence — gewichts/herstel-trends kunnen misleidend zijn. Overweeg of het plan past bij je leefstijl.</span>}
                        </div>
                      </div>
                    )}
                    {!adherence7d && (
                      <div style={{ marginBottom: 16, padding: '12px 14px', background: '#f5f5f0', fontSize: 12, color: '#6b6b65', lineHeight: 1.5 }}>
                        💡 <strong>Tip:</strong> Tik op ✓ of ✗ bij elke maaltijd in dagschema om adherence te tracken — dat maakt deze suggesties beduidend preciezer.
                      </div>
                    )}

                    {/* INVOER-FORMULIER */}
                    <div className="stat-card" style={{ marginBottom: 24 }}>
                      <h3 style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b65', margin: '0 0 12px 0' }}>Nieuwe meting</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                        <div>
                          <label className="label-style">Datum</label>
                          <input className="input-style" type="date" value={trackingNieuw.datum}
                            onChange={e => setTrackingNieuw({ ...trackingNieuw, datum: e.target.value })} />
                        </div>
                        <div>
                          <label className="label-style">{t('tracking_gewicht')}</label>
                          <input className="input-style" type="number" step="0.1" placeholder={input.gewicht.toString()}
                            value={trackingNieuw.gewicht}
                            onChange={e => setTrackingNieuw({ ...trackingNieuw, gewicht: e.target.value })} />
                        </div>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                          <label className="label-style" style={{ marginBottom: 0 }}>{t('tracking_herstel')} (1-10)</label>
                          <span className="mono" style={{ fontSize: 14, fontWeight: 600, color: '#d94f30' }}>{trackingNieuw.herstel}/10</span>
                        </div>
                        <input type="range" min="1" max="10" value={trackingNieuw.herstel}
                          onChange={e => setTrackingNieuw({ ...trackingNieuw, herstel: parseInt(e.target.value) })}
                          style={{ width: '100%', accentColor: '#d94f30' }} />
                        <div className="mono" style={{ fontSize: 10, color: '#6b6b65', display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                          <span>{taal === 'en' ? '1 = exhausted' : '1 = uitgeput'}</span><span>{taal === 'en' ? '5 = moderate' : '5 = matig'}</span><span>10 = top</span>
                        </div>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <label className="label-style">{t('tracking_notitie')}</label>
                        <input className="input-style" type="text" value={trackingNieuw.notitie}
                          placeholder="bv: zware training, weinig slaap"
                          onChange={e => setTrackingNieuw({ ...trackingNieuw, notitie: e.target.value })} />
                      </div>
                      <button onClick={voegTrackingToeIn} className="profile-button primary" style={{ width: '100%' }}>
                        {t('tracking_log')}
                      </button>
                    </div>

                    {/* SUGGESTIES */}
                    {trackingSuggesties.length > 0 && (
                      <div style={{ marginBottom: 24 }}>
                        <h3 className="display-font" style={{ fontSize: 18, marginTop: 0, marginBottom: 12 }}>{taal === 'en' ? 'Auto-suggestions' : 'Auto-suggesties'}</h3>
                        {trackingSuggesties.map((s, i) => (
                          <div key={i} className={`warn-banner ${s.niveau === 'rode_vlag' ? 'warn-rode' : s.niveau === 'let_op' ? 'warn-let' : 'warn-info'}`}
                            style={{ borderColor: s.niveau === 'goed' ? '#16a34a' : undefined, background: s.niveau === 'goed' ? '#f0fdf4' : undefined, color: s.niveau === 'goed' ? '#15803d' : undefined }}>
                            <strong style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.1em' }}>
                              {s.type === 'gewicht' ? 'Gewichtstrend' : 'Herstel'}
                            </strong>
                            <div style={{ marginTop: 4 }}>{s.tekst}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* GRAFIEK */}
                    {trackingLogs.length > 0 ? (
                      <>
                        <h3 className="display-font" style={{ fontSize: 18, marginTop: 0, marginBottom: 12 }}>Trends — laatste {Math.min(trackingLogs.length, 12)} weken</h3>

                        {/* Gewicht-grafiek */}
                        <div className="stat-card" style={{ marginBottom: 16 }}>
                          <h4 style={{ fontSize: 13, fontWeight: 600, margin: '0 0 12px 0' }}>Gewicht (kg)</h4>
                          {(() => {
                            const data = trackingLogs.slice(-84); // max 12 weken (84 dagen)
                            if (data.length < 2) return <p style={{ fontSize: 13, color: '#6b6b65', fontStyle: 'italic' }}>Voer minstens 2 metingen in om een trend te zien.</p>;
                            const gewichten = data.map(l => l.gewicht);
                            const min = Math.floor(Math.min(...gewichten) - 1);
                            const max = Math.ceil(Math.max(...gewichten) + 1);
                            const W = 700, H = 200, padL = 50, padR = 20, padT = 20, padB = 40;
                            const innerW = W - padL - padR;
                            const innerH = H - padT - padB;
                            const xStep = innerW / (data.length - 1 || 1);
                            const yScale = (v) => padT + innerH - ((v - min) / (max - min)) * innerH;
                            const points = data.map((l, i) => `${padL + i * xStep},${yScale(l.gewicht)}`).join(' ');
                            return (
                              <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', maxHeight: 240 }}>
                                {/* Y-axis labels */}
                                {[min, min + Math.round((max - min) / 2), max].map(v => (
                                  <g key={v}>
                                    <line x1={padL} y1={yScale(v)} x2={W - padR} y2={yScale(v)} stroke="#e5e5e0" strokeDasharray="2,2" />
                                    <text x={padL - 8} y={yScale(v) + 4} fontSize="10" fill="#6b6b65" textAnchor="end" fontFamily="JetBrains Mono, monospace">{v}</text>
                                  </g>
                                ))}
                                {/* X-axis */}
                                <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="#1a1a1a" strokeWidth="1" />
                                {/* Line */}
                                <polyline points={points} fill="none" stroke="#d94f30" strokeWidth="2" />
                                {/* Points */}
                                {data.map((l, i) => (
                                  <g key={i}>
                                    <circle cx={padL + i * xStep} cy={yScale(l.gewicht)} r="3" fill="#d94f30" />
                                    {(i === 0 || i === data.length - 1 || i === Math.floor(data.length / 2)) && (
                                      <text x={padL + i * xStep} y={H - padB + 16} fontSize="9" fill="#6b6b65" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                                        {l.datum.slice(5)}
                                      </text>
                                    )}
                                  </g>
                                ))}
                              </svg>
                            );
                          })()}
                        </div>

                        {/* Herstel-grafiek */}
                        <div className="stat-card" style={{ marginBottom: 24 }}>
                          <h4 style={{ fontSize: 13, fontWeight: 600, margin: '0 0 12px 0' }}>Herstel-score (1-10)</h4>
                          {(() => {
                            const data = trackingLogs.slice(-84);
                            if (data.length < 2) return null;
                            const W = 700, H = 180, padL = 50, padR = 20, padT = 20, padB = 40;
                            const innerW = W - padL - padR;
                            const innerH = H - padT - padB;
                            const xStep = innerW / (data.length - 1 || 1);
                            const yScale = (v) => padT + innerH - ((v - 0) / 10) * innerH;
                            const points = data.map((l, i) => `${padL + i * xStep},${yScale(l.herstel)}`).join(' ');
                            return (
                              <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', maxHeight: 220 }}>
                                {[0, 5, 10].map(v => (
                                  <g key={v}>
                                    <line x1={padL} y1={yScale(v)} x2={W - padR} y2={yScale(v)} stroke="#e5e5e0" strokeDasharray="2,2" />
                                    <text x={padL - 8} y={yScale(v) + 4} fontSize="10" fill="#6b6b65" textAnchor="end" fontFamily="JetBrains Mono, monospace">{v}</text>
                                  </g>
                                ))}
                                <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="#1a1a1a" strokeWidth="1" />
                                <polyline points={points} fill="none" stroke="#0891b2" strokeWidth="2" />
                                {data.map((l, i) => (
                                  <circle key={i} cx={padL + i * xStep} cy={yScale(l.herstel)} r="3" fill="#0891b2" />
                                ))}
                              </svg>
                            );
                          })()}
                        </div>

                        {/* LIJST METINGEN */}
                        <h3 className="display-font" style={{ fontSize: 16, marginTop: 0, marginBottom: 12 }}>Alle metingen ({trackingLogs.length})</h3>
                        <div className="stat-card">
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {trackingLogs.slice().reverse().slice(0, 30).map((l, i) => (
                              <li key={l.datum} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #e5e5e0' }}>
                                <div>
                                  <span className="mono" style={{ fontSize: 12, color: '#6b6b65', marginRight: 12 }}>{l.datum}</span>
                                  <span style={{ fontWeight: 600 }}>{l.gewicht} kg</span>
                                  <span style={{ marginLeft: 12, fontSize: 13, color: '#6b6b65' }}>· herstel {l.herstel}/10</span>
                                  {l.notitie && <span style={{ marginLeft: 12, fontSize: 12, color: '#6b6b65', fontStyle: 'italic' }}>{l.notitie}</span>}
                                </div>
                                <button onClick={() => verwijderTracking(l.datum)} className="pill-button small" style={{ color: '#cc1f1a', padding: '2px 8px' }}>×</button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <div style={{ padding: '40px 20px', textAlign: 'center', color: '#6b6b65', fontSize: 14 }}>
                        Nog geen metingen. Voeg er hierboven één toe om te beginnen.
                      </div>
                    )}
                      </>
                    )}
                  </>
                )}

                {activeTab === 'supplementen' && (
                  <>
                    <div style={{ marginBottom: 32 }}>
                      {supplementen.map((s, i) => (
                        <div key={i} className="stat-card" style={{ marginBottom: 8, borderLeft: `3px solid ${s.prioriteit === 1 ? '#d94f30' : '#9ca3af'}` }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                            <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
                              {s.tooltip ? <Tip id={s.tooltip}>{s.naam}</Tip> : s.naam}
                            </h4>
                            <span className="mono" style={{ fontSize: 10, padding: '2px 8px', background: s.prioriteit === 1 ? '#d94f30' : '#9ca3af', color: 'white', letterSpacing: '0.05em' }}>
                              {s.prioriteit === 1 ? 'TIER 1' : 'TIER 2'}
                            </span>
                          </div>
                          <div className="mono" style={{ fontSize: 13, color: '#1a1a1a', marginBottom: 4 }}>{s.dosering}</div>
                          <div style={{ fontSize: 13, color: '#6b6b65', marginBottom: 6 }}><strong>Wanneer:</strong> {s.timing}</div>
                          <div style={{ fontSize: 13, color: '#444' }}>{s.reden}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: '#f5f5f0', padding: '16px 20px', fontSize: 13, color: '#444', lineHeight: 1.6 }}>
                      <strong>Veiligheidsprincipes:</strong>
                      <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
                        <li>Voeding eerst — supplementen zijn aanvulling, geen vervanging.</li>
                        <li>Kies certified supplementen (Informed Sport, NSF Certified for Sport).</li>
                        <li>Geen ijzersuppletie zonder bloedtest.</li>
                        <li>Bij medicatie: overleg met arts.</li>
                      </ul>
                    </div>
                  </>
                )}

                {activeTab === 'hydratatie' && (
                  <>
                    <div style={{ background: '#f5f5f0', padding: '16px 20px', marginBottom: 20, fontSize: 13, color: '#444', lineHeight: 1.6 }}>
                      <strong>Persoonlijke hydratatie.</strong> Iedereen zweet anders — tot 3-4× verschillend tussen spelers. Door je sweat-rate te meten, kan deze tool een veel persoonlijker aanbeveling geven dan de generieke "5-7 ml/kg".
                    </div>

                    {/* PEE-CHART — visuele leidraad */}
                    <div className="stat-card" style={{ marginBottom: 16 }}>
                      <h3 className="display-font" style={{ fontSize: 18, margin: '0 0 6px 0' }}>
                        <Tip id="pee_chart">Urine-kleur als hydratatie-indicator</Tip>
                      </h3>
                      <p style={{ fontSize: 12, color: '#6b6b65', margin: '0 0 12px 0' }}>
                        De makkelijkste check tijdens de dag — geen tools nodig. Streef naar 1-3.
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 4, marginBottom: 8 }}>
                        {[
                          { lvl: 1, kleur: '#fffde0', label: 'Helder', status: 'overhydratatie' },
                          { lvl: 2, kleur: '#fef9c3', label: 'Goed', status: 'optimaal' },
                          { lvl: 3, kleur: '#fef08a', label: 'Goed', status: 'optimaal' },
                          { lvl: 4, kleur: '#facc15', label: 'OK', status: 'licht tekort' },
                          { lvl: 5, kleur: '#eab308', label: 'Drink', status: 'onvoldoende' },
                          { lvl: 6, kleur: '#ca8a04', label: 'Drink!', status: 'duidelijk uitgedroogd' },
                          { lvl: 7, kleur: '#a16207', label: 'Drink!!', status: 'sterk uitgedroogd' },
                          { lvl: 8, kleur: '#854d0e', label: 'Arts', status: 'gevaarlijk' }
                        ].map(p => (
                          <div key={p.lvl} style={{ textAlign: 'center' }}>
                            <div style={{
                              background: p.kleur, height: 50, marginBottom: 4,
                              border: p.lvl <= 3 ? '2px solid #16a34a' : p.lvl >= 6 ? '2px solid #cc1f1a' : '1px solid #d4d4d0',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 14, fontWeight: 700, color: p.lvl <= 4 ? '#1a1a1a' : '#fef9c3'
                            }}>{p.lvl}</div>
                            <div style={{ fontSize: 9, color: '#6b6b65' }}>{p.label}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ fontSize: 11, color: '#6b6b65', lineHeight: 1.5, marginTop: 8 }}>
                        <strong style={{ color: '#15803d' }}>1-3:</strong> goed gehydrateerd ·{' '}
                        <strong style={{ color: '#a16207' }}>4-5:</strong> drink wat extra ·{' '}
                        <strong style={{ color: '#841412' }}>6+:</strong> uitgedroogd, drink direct
                        <br /><em>Eerste plas in de ochtend is meestal donkerder — gebruik tweede meting.</em>
                      </div>
                    </div>

                    {/* SWEAT-RATE METING + INVOER */}
                    <div className="stat-card" style={{ marginBottom: 16 }}>
                      <h3 className="display-font" style={{ fontSize: 18, margin: '0 0 6px 0' }}>
                        <Tip id="sweat_rate">Sweat-rate meten</Tip>
                      </h3>
                      <p style={{ fontSize: 12, color: '#6b6b65', margin: '0 0 14px 0' }}>
                        Hoe meer metingen, hoe persoonlijker je advies. 3-5 metingen geven betrouwbaar gemiddelde.
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
                        <div>
                          <label className="label-style" style={{ fontSize: 10 }}>Gewicht vóór (kg)</label>
                          <input className="input-style" type="number" step="0.1" placeholder="80.5"
                            value={sweatNieuw.gewichtVoor}
                            onChange={e => setSweatNieuw({ ...sweatNieuw, gewichtVoor: e.target.value })} />
                        </div>
                        <div>
                          <label className="label-style" style={{ fontSize: 10 }}>Gewicht na (kg)</label>
                          <input className="input-style" type="number" step="0.1" placeholder="79.2"
                            value={sweatNieuw.gewichtNa}
                            onChange={e => setSweatNieuw({ ...sweatNieuw, gewichtNa: e.target.value })} />
                        </div>
                        <div>
                          <label className="label-style" style={{ fontSize: 10 }}>Vocht gedronken (ml)</label>
                          <input className="input-style" type="number" step="50" placeholder="500"
                            value={sweatNieuw.dronken}
                            onChange={e => setSweatNieuw({ ...sweatNieuw, dronken: e.target.value })} />
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 10, marginBottom: 12 }}>
                        <div>
                          <label className="label-style" style={{ fontSize: 10 }}>Duur (min)</label>
                          <input className="input-style" type="number" step="5" min="10" max="240"
                            value={sweatNieuw.duurMin}
                            onChange={e => setSweatNieuw({ ...sweatNieuw, duurMin: e.target.value })} />
                        </div>
                        <div>
                          <label className="label-style" style={{ fontSize: 10 }}>Type sessie</label>
                          <select className="input-style" value={sweatNieuw.type}
                            onChange={e => setSweatNieuw({ ...sweatNieuw, type: e.target.value })}>
                            <option value="training_licht">Lichte/technische training</option>
                            <option value="training_normaal">Normale training</option>
                            <option value="training_zwaar">Zware conditie / fysiek</option>
                            <option value="match">Wedstrijd</option>
                            <option value="kracht">Krachttraining</option>
                          </select>
                        </div>
                      </div>
                      <button onClick={voegSweatMetingToe} className="profile-button primary" style={{ width: '100%', padding: '10px' }}>
                        Meting opslaan
                      </button>

                      {/* OVERZICHT METINGEN */}
                      {sweatMetingen.length > 0 && (
                        <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #e5e5e0' }}>
                          <h4 style={{ fontSize: 11, color: '#6b6b65', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 0' }}>
                            Recente metingen ({sweatMetingen.length})
                          </h4>
                          <div style={{ maxHeight: 180, overflowY: 'auto' }}>
                            {sweatMetingen.slice().reverse().map((m, i) => {
                              const realIdx = sweatMetingen.length - 1 - i;
                              const sr = berekenSweatRate(m);
                              return (
                                <div key={realIdx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #fafaf7', fontSize: 12, alignItems: 'center' }}>
                                  <span className="mono" style={{ fontSize: 11, color: '#6b6b65' }}>{m.datum}</span>
                                  <span>{m.type.replace('_', ' ')} · {m.duurMin} min</span>
                                  <strong style={{ color: '#d94f30' }}>{sr ? sr.toFixed(2) : '—'} L/u</strong>
                                  <button onClick={() => verwijderSweatMeting(realIdx)}
                                    style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: 16, padding: '0 4px' }}
                                    title="Verwijder">×</button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* PERSOONLIJK ADVIES */}
                    {persoonlijkAdvies ? (
                      <div className="stat-card" style={{ marginBottom: 16, borderLeft: '3px solid #16a34a' }}>
                        <h3 className="display-font" style={{ fontSize: 18, margin: '0 0 6px 0', color: '#15803d' }}>
                          ✓ Jouw persoonlijke vochtbehoefte
                        </h3>
                        <p style={{ fontSize: 12, color: '#6b6b65', margin: '0 0 14px 0' }}>
                          Op basis van {sweatMetingen.length} meting{sweatMetingen.length === 1 ? '' : 'en'}.
                          Gemiddelde sweat-rate: <strong>{persoonlijkeSweatRate.toFixed(2)} L/u</strong>{' '}
                          ({persoonlijkeSweatRate < 0.8 ? 'lage zweter' : persoonlijkeSweatRate < 1.2 ? 'normaal' : persoonlijkeSweatRate < 1.6 ? 'hoge zweter' : 'zeer hoge zweter'})
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                          {[
                            { type: 'training_normaal', label: 'Normale training' },
                            { type: 'training_zwaar', label: 'Zware training' },
                            { type: 'match', label: 'Wedstrijd' }
                          ].map(t => {
                            const a = persoonlijkAdvies[t.type];
                            return (
                              <div key={t.type} style={{ background: '#fafaf7', padding: '12px 14px', borderLeft: '2px solid #d94f30' }}>
                                <div style={{ fontSize: 11, color: '#6b6b65', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                                  {t.label}
                                </div>
                                <div style={{ fontSize: 11, marginBottom: 4 }}>
                                  <strong>Tijdens:</strong> <span className="mono" style={{ color: '#d94f30' }}>{a.tijdens} ml</span>
                                </div>
                                <div style={{ fontSize: 11, marginBottom: 4 }}>
                                  <strong>Na:</strong> <span className="mono" style={{ color: '#d94f30' }}>{a.na} ml</span>
                                </div>
                                <div style={{ fontSize: 9, color: '#6b6b65', marginTop: 6, lineHeight: 1.4 }}>
                                  Verwacht verlies: {a.verwachtVerlies.toFixed(2)} L
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <p style={{ fontSize: 11, color: '#6b6b65', marginTop: 12, lineHeight: 1.5 }}>
                          <strong>Tip:</strong> Tijdens-aanbeveling is 75% compenseren (rest komt na). Na-aanbeveling is 125% replenish (overschot voor herstel).
                          {persoonlijkeSweatRate > 1.5 && ' Je bent een hoge zweter — overweeg sportdrank met 500-700 mg natrium/L.'}
                        </p>

                        {/* DAGTOTAAL — combineert basis + training-load + eetpatroon */}
                        {(() => {
                          // Basisbehoefte: 35 ml/kg (volwassenen, IOM 2005)
                          const basis = input.gewicht * 0.035;
                          // Training-bijdrage: gemiddeld over de week
                          const trainingDgn = trainingsdagen.filter(d => d === 'trainingsdag').length;
                          const matchDgn = trainingsdagen.filter(d => d === 'matchdag').length;
                          const trainingBijdrage = (
                            trainingDgn * persoonlijkAdvies.training_normaal.verwachtVerlies +
                            matchDgn * persoonlijkAdvies.match.verwachtVerlies
                          ) / 7;
                          // Eetpatroon-correctie: hoog-zout/eiwit verhoogt vochtbehoefte
                          // Hoog eiwit: ureum-uitscheiding vraagt extra water (~+150ml per 50g eiwit boven basis)
                          const eiwitBoven60 = Math.max(0, (dagSchema?.doelen?.eiwitG || 0) - 60);
                          const eiwitBijdrage = (eiwitBoven60 / 50) * 0.15;
                          // Hoog-vezel/groente eetpatroon: ~10-15% vocht uit voeding
                          const totaalDoelL = basis + trainingBijdrage + eiwitBijdrage;
                          const drinkenDoelL = totaalDoelL * 0.85;   // 15% komt uit voeding
                          const klimaatLabel = new Date().getMonth() >= 5 && new Date().getMonth() <= 8 ? '🌞 zomer (+10-15% bij hitte)' : '❄️ winter';
                          return (
                            <div style={{ marginTop: 14, padding: '14px 16px', background: '#f0f9ff', borderLeft: '3px solid #0891b2' }}>
                              <h4 style={{ margin: '0 0 8px 0', fontSize: 14, color: '#075985', fontFamily: 'Fraunces, serif' }}>
                                💧 Jouw dagelijks vochtdoel
                              </h4>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, fontSize: 12 }}>
                                <div>
                                  <div className="mono" style={{ fontSize: 10, color: '#6b6b65', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Drinken</div>
                                  <div className="display-font" style={{ fontSize: 22, fontWeight: 600, color: '#0891b2' }}>{drinkenDoelL.toFixed(1)} L</div>
                                  <div style={{ fontSize: 10, color: '#075985' }}>≈ {Math.round(drinkenDoelL * 4)} glazen</div>
                                </div>
                                <div>
                                  <div className="mono" style={{ fontSize: 10, color: '#6b6b65', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Uit voeding</div>
                                  <div className="display-font" style={{ fontSize: 22, fontWeight: 600, color: '#7c3aed' }}>{(totaalDoelL - drinkenDoelL).toFixed(1)} L</div>
                                  <div style={{ fontSize: 10, color: '#075985' }}>fruit, soep, groente</div>
                                </div>
                                <div>
                                  <div className="mono" style={{ fontSize: 10, color: '#6b6b65', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Totaal</div>
                                  <div className="display-font" style={{ fontSize: 22, fontWeight: 600, color: '#1a1a1a' }}>{totaalDoelL.toFixed(1)} L</div>
                                  <div style={{ fontSize: 10, color: '#075985' }}>{klimaatLabel}</div>
                                </div>
                              </div>
                              <details style={{ marginTop: 10, fontSize: 11, color: '#075985' }}>
                                <summary style={{ cursor: 'pointer', fontWeight: 600 }}>🔍 Hoe is dit berekend?</summary>
                                <div style={{ marginTop: 6, lineHeight: 1.6 }}>
                                  <strong>Basis:</strong> {basis.toFixed(2)} L ({input.gewicht}kg × 35ml/kg, IOM 2005)<br />
                                  <strong>Training-bijdrage:</strong> {trainingBijdrage.toFixed(2)} L (gemiddelde over week: {trainingDgn} trainingsdagen + {matchDgn} matchdagen)<br />
                                  <strong>Eiwit-bijdrage:</strong> {eiwitBijdrage.toFixed(2)} L (extra water nodig voor ureum-uitscheiding bij {dagSchema?.doelen?.eiwitG}g eiwit/dag)<br />
                                  <em>Gepersonaliseerd op basis van jouw sweat-rate ({persoonlijkeSweatRate.toFixed(2)} L/u), gewicht en weekschema.</em>
                                </div>
                              </details>
                            </div>
                          );
                        })()}
                      </div>
                    ) : (
                      <div className="stat-card" style={{ marginBottom: 16, padding: '14px 18px', background: '#fef7ed', borderLeft: '3px solid #d97706' }}>
                        <h4 style={{ fontSize: 14, margin: '0 0 6px 0', color: '#7c4a06' }}>📊 Generiek advies (nog geen metingen)</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginTop: 10 }}>
                          <div>
                            <div className="stat-label">{taal === 'en' ? 'Before (4h prior)' : 'Voor (4u vooraf)'}</div>
                            <div className="display-font" style={{ fontSize: 18, marginTop: 4 }}>{Math.round(input.gewicht * 6)} ml</div>
                            <div className="mono" style={{ fontSize: 10, color: '#6b6b65' }}>5-7 ml/kg</div>
                          </div>
                          <div>
                            <div className="stat-label">{taal === 'en' ? 'During (per hour)' : 'Tijdens (per uur)'}</div>
                            <div className="display-font" style={{ fontSize: 18, marginTop: 4 }}>500-800 ml</div>
                            <div className="mono" style={{ fontSize: 10, color: '#6b6b65' }}>schat&shy;ting</div>
                          </div>
                          <div>
                            <div className="stat-label">{taal === 'en' ? 'After (per kg lost)' : 'Na (per kg verloren)'}</div>
                            <div className="display-font" style={{ fontSize: 18, marginTop: 4 }}>1.25-1.5 L</div>
                            <div className="mono" style={{ fontSize: 10, color: '#6b6b65' }}>weeg jezelf</div>
                          </div>
                          <div>
                            <div className="stat-label">{taal === 'en' ? 'Base / day' : 'Basis / dag'}</div>
                            <div className="display-font" style={{ fontSize: 18, marginTop: 4 }}>{(Math.max(2.0, input.gewicht * 0.035)).toFixed(1)} L</div>
                            <div className="mono" style={{ fontSize: 10, color: '#6b6b65' }}>buiten training</div>
                          </div>
                        </div>
                        <p style={{ fontSize: 12, color: '#7c4a06', margin: '12px 0 0 0' }}>
                          ⚠️ Doe minimaal 2-3 sweat-rate metingen voor persoonlijk advies. Generiek advies kan tot 3-4× afwijken van werkelijke behoefte.
                        </p>
                      </div>
                    )}

                    <div className="stat-card" style={{ marginBottom: 16 }}>
                      <h3 className="display-font" style={{ fontSize: 18, margin: '0 0 12px 0' }}>DIY sportdrank</h3>
                      <p style={{ fontSize: 14, lineHeight: 1.6, color: '#1a1a1a', margin: 0 }}>
                        <strong>Voor 500ml:</strong> 500 ml water + 30g suiker (of 30g maltodextrine) + ¼ tl zout + ½ citroensap. Geeft ~6% CH-concentratie en ~500mg natrium/L (ACSM-richtlijn).
                        {persoonlijkeSweatRate && persoonlijkeSweatRate > 1.5 && (
                          <><br /><strong style={{ color: '#cc1f1a' }}>Voor jou (hoge zweter):</strong> verhoog naar ½ tl zout (~700 mg/L natrium) — meer natriumverlies via zweet.</>
                        )}
                      </p>
                    </div>

                    <div className="stat-card">
                      <h3 className="display-font" style={{ fontSize: 18, margin: '0 0 12px 0' }}>Hoe een goede meting doen?</h3>
                      <ol style={{ fontSize: 13, lineHeight: 1.8, color: '#444', paddingLeft: 20, margin: 0 }}>
                        <li>Plas net voor de training (lege blaas).</li>
                        <li>Weeg jezelf in droge sportkledij vlak voor de training.</li>
                        <li>Meet wat je drinkt tijdens (in ml).</li>
                        <li>Weeg opnieuw na de training (zelfde droge kledij — droog je af).</li>
                        <li>Voer alles in hierboven. Tool berekent dan: (vóór − na + dronken) ÷ duur = je sweat-rate.</li>
                        <li>Streef naar max 2% gewichtsverlies tijdens training. Boven 2% = prestatieverlies.</li>
                      </ol>
                    </div>
                  </>
                )}

                <div style={{ borderTop: '1px solid #e5e5e0', paddingTop: 24, marginTop: 32 }}>
                  <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: 16, margin: '0 0 12px 0' }}>Belangrijke disclaimer</h4>

                  <div style={{ background: '#fef7ed', borderLeft: '3px solid #d97706', padding: '12px 16px', marginBottom: 14, fontSize: 12, color: '#7c4a06', lineHeight: 1.6 }}>
                    <strong>⚠️ Wanneer professionele hulp inschakelen?</strong>
                    <ul style={{ margin: '6px 0 0 0', paddingLeft: 18 }}>
                      <li>Caloriedoel onder 1700 kcal (man) of 1500 kcal (vrouw)</li>
                      <li>Aanhoudende vermoeidheid, slaaptekort of slechte herstel-scores (meerdere weken &lt; 5/10)</li>
                      <li>Verstoorde menstruatiecyclus (vrouwen) of libidoverlies / chronisch lage testosteron-symptomen (mannen)</li>
                      <li>Onverklaarbaar gewichtsverlies, frequente blessures, terugkerende infecties</li>
                      <li>Obsessieve gedachten over voeding, gewicht of training</li>
                      <li>Kinderen, jongeren onder 15, zwangerschap, of medische condities (diabetes, schildklier-, nier- of leverproblematiek)</li>
                    </ul>
                  </div>

                  <div style={{ background: '#fdf0ef', borderLeft: '3px solid #cc1f1a', padding: '12px 16px', marginBottom: 14, fontSize: 12, color: '#841412', lineHeight: 1.6 }}>
                    <strong>🧠 Mentaal welzijn & eetgedrag</strong>
                    <p style={{ margin: '6px 0 0 0' }}>
                      Tracking-tools en strikte voedingsplannen kunnen schadelijk zijn bij:
                    </p>
                    <ul style={{ margin: '4px 0 0 0', paddingLeft: 18 }}>
                      <li>(Voorgeschiedenis van) eetstoornissen — anorexia, boulimia, orthorexia, ARFID, BED</li>
                      <li>OCD-tendensen rond eten, getallen of controle</li>
                      <li>Body dysmorphia of negatief lichaamsbeeld</li>
                      <li>Periodes van hoge stress, depressie of angststoornissen</li>
                    </ul>
                    <p style={{ margin: '6px 0 0 0' }}>
                      <strong>Hulp nodig?</strong> Praat met je huisarts, een (sport)psycholoog of bel:<br />
                      • <strong>België:</strong> Tele-Onthaal 106 (24/7, gratis) — <a href="https://anbn.be" target="_blank" rel="noopener">anbn.be</a> voor eetstoornissen<br />
                      • <strong>Nederland:</strong> 113 Zelfmoordpreventie 113 of 0800-0113 — <a href="https://wearealliance.org" target="_blank" rel="noopener">National Alliance for Eating disorder helpline</a>
                    </p>
                  </div>

                  <div style={{ fontSize: 12, color: '#6b6b65', lineHeight: 1.6 }}>
                    <strong>Algemene voorwaarden:</strong> Deze tool is een <strong>educatieve leidraad</strong>, géén medisch advies en geen vervanging voor een erkend sportdiëtist of arts. Cijfers zijn schattingen op basis van algemene formules en bandbreedtes uit IOC (B3), ACSM (B1), ISSN (B4-B8) en EHF-richtlijnen. Individuele variatie kan groot zijn. De tool gebruikt voorspellingen van basaal metabolisme (Mifflin-St Jeor), die ±10% kunnen afwijken van werkelijke waarden.
                    <br /><br />
                    <strong>Privacy:</strong> profielen en tracking-data worden lokaal in je browser opgeslagen. Geen data wordt naar servers verzonden. Bij twijfel over je gezondheidssituatie: raadpleeg een arts of <a href="https://www.bvd-abd.be" target="_blank" rel="noopener">erkend Belgisch sportdiëtist (BVD-ABD)</a> of <a href="https://www.nvdietist.nl" target="_blank" rel="noopener">Nederlandse diëtist (NVD)</a>.
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* RECEPT-DETAIL MODAL */}
      {openRecept && (
        <div className="modal-overlay" onClick={() => setOpenRecept(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <div className="mono" style={{ fontSize: 11, color: '#d94f30', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                  {openRecept.type.replace('_', '-')} · {KEUKEN_LABELS[openRecept.keuken]}
                </div>
                <h2 className="display-font" style={{ margin: 0, fontSize: 28 }}>{openRecept.naam}</h2>
                <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                  <button onClick={() => toggleFavoriet(openRecept.id)}
                    style={{
                      padding: '6px 12px', fontSize: 13, cursor: 'pointer',
                      background: isFavoriet(openRecept.id) ? '#fef3c7' : 'white',
                      border: '1.5px solid ' + (isFavoriet(openRecept.id) ? '#d97706' : '#e5e5e0'),
                      color: isFavoriet(openRecept.id) ? '#92400e' : '#6b6b65',
                      fontFamily: 'inherit', fontWeight: 600
                    }}
                    title={isFavoriet(openRecept.id) ? 'Verwijder uit favorieten' : 'Markeer als favoriet — krijgt voorrang in toekomstige plannen'}>
                    {isFavoriet(openRecept.id) ? '★ Favoriet' : '☆ Maak favoriet'}
                  </button>
                  {isGeblokkeerd(openRecept.id) ? (
                    <button onClick={() => deBlokkeerRecept(openRecept.id)}
                      style={{
                        padding: '6px 12px', fontSize: 13, cursor: 'pointer',
                        background: '#fdf0ef', border: '1.5px solid #cc1f1a',
                        color: '#841412', fontFamily: 'inherit', fontWeight: 600
                      }}
                      title={`Geblokkeerd tot ${geblokkeerd[openRecept.id]}`}>
                      ✕ Deblokkeer (tot {geblokkeerd[openRecept.id]})
                    </button>
                  ) : (
                    <button onClick={() => blokkeerRecept(openRecept.id, 4)}
                      style={{
                        padding: '6px 12px', fontSize: 13, cursor: 'pointer',
                        background: 'white', border: '1.5px solid #e5e5e0',
                        color: '#6b6b65', fontFamily: 'inherit'
                      }}
                      title="Blokkeer dit recept voor 4 weken in toekomstige plannen">
                      ⏸ Blokkeer 4 weken
                    </button>
                  )}
                </div>
              </div>
              <button onClick={() => setOpenRecept(null)} style={{ background: 'none', border: 'none', fontSize: 28, cursor: 'pointer', color: '#999', padding: 0, lineHeight: 1 }}>×</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 20, padding: '14px 0', borderTop: '1px solid #e5e5e0', borderBottom: '1px solid #e5e5e0' }}>
              <div><div style={{ fontSize: 9, color: '#6b6b65', letterSpacing: '0.1em', textTransform: 'uppercase' }}>kcal</div><div className="display-font" style={{ fontSize: 22 }}>{Math.round(openRecept.macros.kcal)}</div></div>
              <div><div style={{ fontSize: 9, color: '#6b6b65', letterSpacing: '0.1em', textTransform: 'uppercase' }}>eiwit</div><div className="display-font" style={{ fontSize: 22 }}>{Math.round(openRecept.macros.eiwit_g)}<span style={{ fontSize: 12, color: '#999' }}>g</span></div></div>
              <div><div style={{ fontSize: 9, color: '#6b6b65', letterSpacing: '0.1em', textTransform: 'uppercase' }}>CH</div><div className="display-font" style={{ fontSize: 22 }}>{Math.round(openRecept.macros.ch_g)}<span style={{ fontSize: 12, color: '#999' }}>g</span></div></div>
              <div><div style={{ fontSize: 9, color: '#6b6b65', letterSpacing: '0.1em', textTransform: 'uppercase' }}>vet</div><div className="display-font" style={{ fontSize: 22 }}>{Math.round(openRecept.macros.vet_g)}<span style={{ fontSize: 12, color: '#999' }}>g</span></div></div>
              <div><div style={{ fontSize: 9, color: '#6b6b65', letterSpacing: '0.1em', textTransform: 'uppercase' }}>vezels</div><div className="display-font" style={{ fontSize: 22 }}>{berekenVezels(openRecept.ingredienten).toFixed(1)}<span style={{ fontSize: 12, color: '#999' }}>g</span></div></div>
            </div>

            <div style={{ display: 'flex', gap: 16, fontSize: 12, marginBottom: 20, color: '#444', flexWrap: 'wrap' }}>
              <span><strong>Kooktijd:</strong> {openRecept.kooktijd_min} min</span>
              {openRecept.batch_geschikt && <span style={{ color: '#d94f30' }}>· batch-vriendelijk</span>}
              {openRecept.portie_factor && openRecept.portie_factor !== 1 && (
                <span><strong>Portie geschaald:</strong> ×{openRecept.portie_factor}</span>
              )}
              {openRecept.tags.lactosevrij && <span style={{ background: '#e0f2fe', padding: '2px 8px', fontSize: 11 }}>lactosevrij</span>}
              {openRecept.tags.glutenvrij && <span style={{ background: '#dcfce7', padding: '2px 8px', fontSize: 11 }}>glutenvrij</span>}
              {openRecept.tags.vegetarisch && <span style={{ background: '#fef3c7', padding: '2px 8px', fontSize: 11 }}>vegetarisch</span>}
              {openRecept.tags.veganistisch && <span style={{ background: '#dcfce7', padding: '2px 8px', fontSize: 11 }}>vegan</span>}
            </div>

            {(input.allergieen || []).length > 0 && (() => {
              const check = checkAllergenen(openRecept, input.allergieen);
              if (check.waarschuwingen.length > 0) {
                return (
                  <div style={{ padding: '12px 14px', background: '#fef7ed', borderLeft: '3px solid #d97706', fontSize: 13, marginBottom: 16, color: '#7c4a06' }}>
                    ⚠️ <strong>Cross-contact-risico:</strong> dit recept bevat ingrediënten die in productie of keuken kruisbesmetting kunnen geven met: {check.waarschuwingen.map(a => ALLERGENEN_INFO[a]?.label || a).join(', ')}. Controleer etiketten zorgvuldig.
                  </div>
                );
              }
              return null;
            })()}

            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 16, margin: '0 0 8px 0' }}>Ingrediënten</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', borderLeft: '2px solid #f0f0eb' }}>
              {openRecept.ingredienten.map((ing, j) => (
                <li key={j} style={{ padding: '6px 12px', display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span>{formatIngredientName(ing.item)}</span>
                  <span className="mono" style={{ color: '#6b6b65' }}>{formatGram(ing.gram, ing.item)}</span>
                </li>
              ))}
            </ul>

            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 16, margin: '0 0 8px 0' }}>Bereiding</h3>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#1a1a1a', margin: 0, padding: '12px 16px', background: '#fafaf7', borderLeft: '3px solid #d94f30' }}>
              {openRecept.instructies}
            </p>

            {(() => {
              const tips = getKookTips(openRecept);
              if (tips.length === 0) return null;
              return (
                <div style={{ marginTop: 14 }}>
                  <details style={{ background: '#f0f9ff', borderLeft: '3px solid #0891b2', padding: '10px 14px' }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: 13, color: '#075985' }}>
                      🧑‍🍳 Stap-voor-stap voor beginners ({tips.length} tip{tips.length > 1 ? 's' : ''})
                    </summary>
                    <div style={{ marginTop: 10 }}>
                      {tips.map((t, i) => (
                        <div key={i} style={{ marginBottom: 12, fontSize: 13, lineHeight: 1.6 }}>
                          <strong style={{ color: '#0891b2', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {formatIngredientName(t.ingredient)} (~{t.tijd} min)
                          </strong>
                          <div style={{ marginTop: 3, color: '#1a1a1a' }}>{t.tip}</div>
                        </div>
                      ))}
                      <div style={{ marginTop: 14, paddingTop: 10, borderTop: '1px dashed #bae6fd' }}>
                        <strong style={{ fontSize: 12, color: '#075985', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Algemene tips:</strong>
                        <ul style={{ margin: '6px 0 0 0', paddingLeft: 18, fontSize: 12, color: '#1a1a1a', lineHeight: 1.6 }}>
                          {ALGEMENE_TIPS.map((t, i) => <li key={i} style={{ marginBottom: 4 }}>{t}</li>)}
                        </ul>
                      </div>
                    </div>
                  </details>
                </div>
              );
            })()}

            {openRecept.notitie && (
              <p style={{ fontSize: 13, color: '#6b6b65', marginTop: 14, fontStyle: 'italic' }}>
                💡 {openRecept.notitie}
              </p>
            )}

            {input.budgetMode && isDroogRecept(openRecept) && (() => {
              const saus = suggesteerSaus(openRecept);
              return (
                <div style={{ marginTop: 20, padding: '16px 18px', background: '#fef7ed', borderLeft: '4px solid #d97706' }}>
                  <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 16, margin: '0 0 6px 0', color: '#7c4a06' }}>
                    💡 Saus-suggestie: {saus.naam}
                  </h3>
                  <div className="mono" style={{ fontSize: 11, color: '#a16207', marginBottom: 10 }}>
                    {saus.tijd_min} min · {saus.macros.kcal} kcal · {saus.macros.eiwit}g eiwit · {saus.macros.ch}g CH · {saus.macros.vet}g vet
                  </div>
                  <div style={{ fontSize: 12, color: '#7c4a06', marginBottom: 10, fontWeight: 600 }}>Ingrediënten:</div>
                  <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#1a1a1a' }}>
                    {saus.ingredienten.map((ing, idx) => <li key={idx} style={{ marginBottom: 2 }}>{ing}</li>)}
                  </ul>
                  <div style={{ fontSize: 12, color: '#7c4a06', marginTop: 10, marginBottom: 6, fontWeight: 600 }}>Bereiding:</div>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: '#1a1a1a', margin: 0 }}>{saus.bereiding}</p>
                </div>
              );
            })()}

            <button onClick={() => setOpenRecept(null)} style={{ marginTop: 24, padding: '10px 20px', background: '#1a1a1a', color: 'white', border: 'none', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit' }}>
              Sluiten
            </button>
          </div>
        </div>
      )}


      {/* WALKTHROUGH MODAL */}
      {walkthroughOpen && (() => {
        const isEN = taal === 'en';
        const p = walkthroughPersoon;

        // Persoon-selectiescherm (voor stap 0)
        if (!p) {
          return (
            <div className="modal-overlay" onClick={() => setWalkthroughOpen(false)} style={{ background: 'rgba(0,0,0,0.75)', zIndex: 1100 }}>
              <div onClick={e => e.stopPropagation()} style={{ background: 'white', maxWidth: 480, width: '95%', padding: '32px 28px', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>
                <button onClick={() => setWalkthroughOpen(false)} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#999' }}>×</button>
                <div className="mono" style={{ fontSize: 11, color: '#d94f30', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 10 }}>RONDLEIDING · 2 MIN</div>
                <h2 className="display-font" style={{ fontSize: 22, margin: '0 0 8px' }}>{isEN ? 'Choose your example' : 'Kies je voorbeeld'}</h2>
                <p style={{ fontSize: 13, color: '#6b6b65', margin: '0 0 24px', lineHeight: 1.6 }}>
                  {isEN ? 'Follow a realistic player through the tool — from filling in a profile to a ready-made match-day plan.' : 'Volg een speler door de tool — van profiel invullen tot een kant-en-klaar wedstrijddag-plan.'}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { key: 'tim', emoji: '🧑', naam: 'Tim', leeftijd: isEN ? '19 years' : '19 jaar', gewicht: '81 kg', rol: isEN ? 'Playmaker (M)' : 'Middenopbouwer (M)', doel: isEN ? 'Build muscle' : 'Spieren bijbouwen' },
                    { key: 'sarah', emoji: '👩', naam: 'Sarah', leeftijd: isEN ? '22 years' : '22 jaar', gewicht: '65 kg', rol: isEN ? 'Playmaker (F)' : 'Middenopbouwer (V)', doel: isEN ? 'Maintain weight' : 'Gewicht behouden' },
                  ].map(persoon => (
                    <button key={persoon.key} onClick={() => { setWalkthroughPersoon(persoon.key); setWalkthroughStap(0); }}
                      style={{ padding: '20px 16px', border: '2px solid #e5e5e0', background: 'white', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', transition: 'border-color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#d94f30'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = '#e5e5e0'}>
                      <div style={{ fontSize: 36, marginBottom: 8 }}>{persoon.emoji}</div>
                      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{persoon.naam}</div>
                      <div style={{ fontSize: 12, color: '#6b6b65', lineHeight: 1.7 }}>
                        {persoon.leeftijd} · {persoon.gewicht}<br/>
                        {persoon.rol}<br/>
                        <span style={{ color: '#d94f30', fontWeight: 600 }}>{isEN ? 'Goal:' : 'Doel:'} {persoon.doel}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        // Persoon-data
        const isTim = p === 'tim';
        const naam = isTim ? 'Tim' : 'Sarah';
        const emoji = isTim ? '🧑' : '👩';
        const gewicht = isTim ? 81 : 65;
        const leeftijd = isTim ? 19 : 22;
        const doel = isTim ? (isEN ? 'Bulk' : 'Bulk') : (isEN ? 'Maintain' : 'Maintain');
        const geslacht = isTim ? (isEN ? 'Male' : 'Man') : (isEN ? 'Female' : 'Vrouw');
        const rustKcal = isTim ? '2 740' : '2 190';
        const handbalKcal = isTim ? '3 800' : '3 040';
        const matchKcal = isTim ? '4 050' : '3 240';
        const rustCh = isTim ? '245g' : '196g';
        const handbalCh = isTim ? '380g' : '304g';
        const matchCh = isTim ? '430g' : '344g';
        const rolLabel = isEN ? 'Playmaker' : 'Middenopbouwer';

        const stappen = [
          {
            titel: isEN ? `Welcome — follow ${naam} 👋` : `Welkom — volg ${naam} 👋`,
            sub: isEN ? `A 2-minute tour with a real example: ${naam}, ${leeftijd} years old, playmaker at Don Bosco Gent.` : `Een rondleiding van 2 minuten met een echt voorbeeld: ${naam}, ${leeftijd} jaar, middenopbouwer bij Don Bosco Gent.`,
            inhoud: (
              <div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 20, padding: '16px 20px', background: '#fafaf7', border: '2px solid #d94f30' }}>
                  <div style={{ fontSize: 48, lineHeight: 1 }}>{emoji}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{naam} — {leeftijd} {isEN ? 'jaar' : 'jaar'} — {rolLabel}</div>
                    <div style={{ fontSize: 13, color: '#6b6b65', lineHeight: 1.6 }}>
                      {gewicht} kg · {isTim ? 184 : 172} cm · {isEN ? '3× handball/week · 2× strength' : '3× handbal/week · 2× kracht'}<br/>
                      {isEN ? 'Goal:' : 'Doel:'} <strong>{isTim ? (isEN ? 'build muscle while staying match fit' : 'spieren bijbouwen en wedstrijdfit blijven') : (isEN ? 'maintain weight and optimise recovery' : 'gewicht behouden en herstel optimaliseren')}</strong>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: '#444' }}>
                  {isEN
                    ? `${naam} wants to know exactly what to eat each day — on a training day, a rest day, and on match day. Until now, it was mostly guesswork. With this tool, ${isTim ? 'he' : 'she'} gets a concrete plan in under 2 minutes.`
                    : `${naam} wil weten wat ${isTim ? 'hij' : 'ze'} elke dag moet eten — op een trainingsdag, op een rustdag, en op wedstrijddag. Tot nu toe giste ${isTim ? 'hij' : 'ze'} maar wat. Met deze tool krijgt ${isTim ? 'hij' : 'ze'} een concreet plan in minder dan 2 minuten.`}
                </p>
                <button onClick={() => { setWalkthroughPersoon(null); }} style={{ fontSize: 12, color: '#6b6b65', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>
                  {isEN ? '← Switch example' : '← Ander voorbeeld kiezen'}
                </button>
              </div>
            )
          },
          {
            titel: isEN ? 'Step 1 — Fill in your profile' : 'Stap 1 — Vul je profiel in',
            sub: isEN ? 'The tool needs 4 things to get started. Everything else is optional.' : 'De tool heeft 4 dingen nodig om te starten. Al de rest is optioneel.',
            inhoud: (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                  {[
                    { label: isEN ? 'Weight' : 'Gewicht', value: `${gewicht} kg`, icon: '⚖️', uitleg: isEN ? 'Used to calculate your calorie and protein needs' : 'Bepaalt je calorie- en eiwitbehoefte' },
                    { label: isEN ? 'Age' : 'Leeftijd', value: `${leeftijd} ${isEN ? 'yr' : 'jaar'}`, icon: '🎂', uitleg: isEN ? 'Affects your base metabolism (BMR)' : 'Beïnvloedt je basismetabolisme (BMR)' },
                    { label: isEN ? 'Sex' : 'Geslacht', value: geslacht, icon: '👤', uitleg: isEN ? 'Different muscle mass & fat distribution' : 'Andere spiermassa & vetopbouw' },
                    { label: isEN ? 'Goal' : 'Doel', value: doel, icon: '🎯', uitleg: isEN ? 'Determines calorie surplus or deficit' : 'Bepaalt calorie-surplus of -tekort' },
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '12px 14px', background: '#fafaf7', border: '1px solid #e5e5e0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 20 }}>{item.icon}</span>
                        <div>
                          <div style={{ fontSize: 10, color: '#6b6b65', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</div>
                          <div style={{ fontWeight: 700, fontSize: 15 }}>{item.value}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 11, color: '#888', lineHeight: 1.4, borderTop: '1px solid #e5e5e0', paddingTop: 6, marginTop: 2 }}>{item.uitleg}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '12px 16px', background: '#f0fdf4', border: '1px solid #bbf7d0', fontSize: 13, lineHeight: 1.6 }}>
                  <strong>💡 {isEN ? 'Tip:' : 'Tip:'}</strong> {isEN
                    ? `${naam} also fills in training sessions: handball 3× a week (1.5h each) and strength 2× (1h). The tool uses this to calculate the exact extra kcal per training type via scientific MET values.`
                    : `${naam} vult ook trainingen in: handbal 3× per week (1.5u per sessie) en kracht 2× (1u). De tool gebruikt dit om de exacte extra kcal per trainingstype te berekenen via wetenschappelijke MET-waarden.`}
                </div>
              </div>
            )
          },
          {
            titel: isEN ? 'Step 2 — The tool calculates your targets' : 'Stap 2 — De tool berekent je doelen',
            sub: isEN ? 'Each day type gets its own targets. Not every day is the same.' : 'Elk dagtype krijgt zijn eigen doelen. Want niet elke dag is hetzelfde.',
            inhoud: (
              <div>
                <div style={{ marginBottom: 16, fontSize: 13, color: '#444' }}>
                  {isEN ? `For ${naam}, this gives the following daily targets:` : `Voor ${naam} geeft dit de volgende dagdoelen:`}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
                  {[
                    { dag: isEN ? 'Rest day' : 'Rustdag', kcal: rustKcal, ch: rustCh, kleur: '#94a3b8', emoji: '😴', uitleg: isEN ? 'No training → lower energy need' : 'Geen training → lagere energievraag' },
                    { dag: isEN ? 'Handball' : 'Handbaldag', kcal: handbalKcal, ch: handbalCh, kleur: '#d94f30', emoji: '🏐', uitleg: isEN ? 'MET 10 × weight × 1.5h extra' : 'MET 10 × gewicht × 1.5u extra' },
                    { dag: isEN ? 'Match day' : 'Wedstrijddag', kcal: matchKcal, ch: matchCh, kleur: '#1a1a1a', emoji: '🏆', uitleg: isEN ? 'MET 12 × weight × 1.5h extra' : 'MET 12 × gewicht × 1.5u extra' },
                  ].map((d, i) => (
                    <div key={i} style={{ borderTop: `4px solid ${d.kleur}`, background: '#fafaf7', textAlign: 'center', padding: '12px 8px' }}>
                      <div style={{ fontSize: 22, marginBottom: 4 }}>{d.emoji}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: d.kleur, marginBottom: 6 }}>{d.dag}</div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 17, marginBottom: 2 }}>{d.kcal}</div>
                      <div style={{ fontSize: 10, color: '#6b6b65' }}>kcal/dag</div>
                      <div style={{ fontSize: 11, color: '#444', marginTop: 4, fontWeight: 600 }}>{d.ch} KH</div>
                      <div style={{ fontSize: 10, color: '#888', marginTop: 4, lineHeight: 1.3, borderTop: '1px dotted #ddd', paddingTop: 6 }}>{d.uitleg}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '10px 14px', background: '#fef7ed', fontSize: 12, color: '#854d0e', lineHeight: 1.6 }}>
                  {isEN
                    ? `⚡ The gap between a rest day and a match day is over ${isTim ? '1 300' : '1 050'} kcal. That's not a detail — that's the difference between recovery and peak performance.`
                    : `⚡ Het verschil tussen een rustdag en een wedstrijddag is meer dan ${isTim ? '1 300' : '1 050'} kcal. Dat is geen detail — dat is het verschil tussen herstel en topprestatie.`}
                </div>
              </div>
            )
          },
          {
            titel: isEN ? 'Step 3 — Concrete recipes per meal' : 'Stap 3 — Concrete recepten per maaltijd',
            sub: isEN ? 'No vague advice. The tool suggests specific recipes that match your targets.' : 'Geen vaag advies. De tool stelt concrete recepten voor die passen bij je doelen.',
            inhoud: (
              <div>
                <div style={{ marginBottom: 12, fontSize: 13, color: '#444' }}>
                  {isEN ? `${naam}'s handball training day (4 meals, Belgian cuisine):` : `De handbaltrainingsdag van ${naam} (4 maaltijden, Belgische keuken):`}
                </div>
                {[
                  { tijd: '07:30', naam: isEN ? 'Breakfast' : 'Ontbijt', recept: isEN ? 'Oats with banana and peanut butter' : 'Havermout met banaan en pindakaas', kcal: isTim ? '618 kcal' : '495 kcal' },
                  { tijd: '12:30', naam: isEN ? 'Lunch' : 'Lunch', recept: isEN ? 'Pasta with chicken sauce' : 'Pasta met kipsaus', kcal: isTim ? '805 kcal' : '645 kcal' },
                  { tijd: '17:00', naam: isEN ? 'Pre-training snack' : 'Pre-training snack', recept: isEN ? 'Rice cakes with quark and banana' : 'Rijstwafels met kwark en banaan', kcal: isTim ? '382 kcal' : '306 kcal' },
                  { tijd: '20:30', naam: isEN ? 'Dinner (post-training)' : 'Avondmaal (post-training)', recept: isEN ? 'Recovery: chicken with potato and vegetables' : 'Recovery: kip met aardappel en groenten', kcal: isTim ? '450 kcal' : '360 kcal' },
                ].map((m, i) => (
                  <div key={i} style={{ padding: '10px 14px', borderLeft: '3px solid #d94f30', marginBottom: 8, background: '#fafaf7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
                    <div>
                      <div style={{ fontSize: 10, color: '#6b6b65', fontFamily: 'JetBrains Mono, monospace' }}>{m.tijd} · {m.naam}</div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{m.recept}</div>
                    </div>
                    <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: '#d94f30', fontWeight: 700 }}>{m.kcal}</div>
                  </div>
                ))}
                <div style={{ fontSize: 12, color: '#6b6b65', marginTop: 8 }}>
                  {isEN ? '↻ Not a fan of a recipe? Swap it with one click. 400 alternatives ready.' : '↻ Een recept niet lekker? Vervang het met één klik. 400 alternatieven staan klaar.'}
                </div>
              </div>
            )
          },
          {
            titel: isEN ? 'Step 4 — Weekly plan + shopping list' : 'Stap 4 — Weekplan + boodschappenlijst',
            sub: isEN ? 'The tool plans your entire week and generates a ready-to-use shopping list.' : 'De tool plant je volledige week en genereert een kant-en-klare boodschappenlijst.',
            inhoud: (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 16 }}>
                  {[
                    { dag: 'Ma', type: 'HB', kleur: '#d94f30' },
                    { dag: 'Di', type: isEN ? 'Str' : 'Kr', kleur: '#7c3aed' },
                    { dag: 'Wo', type: 'HB', kleur: '#d94f30' },
                    { dag: 'Do', type: isEN ? 'Rest' : 'Rust', kleur: '#94a3b8' },
                    { dag: 'Vr', type: 'Kr+HB', kleur: '#b45309' },
                    { dag: 'Za', type: isEN ? 'Match' : 'Wedstrijd', kleur: '#1a1a1a' },
                    { dag: 'Zo', type: isEN ? 'Rest' : 'Rust', kleur: '#94a3b8' },
                  ].map((d, i) => (
                    <div key={i} style={{ textAlign: 'center', padding: '8px 4px', borderTop: `3px solid ${d.kleur}`, background: '#fafaf7' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#6b6b65' }}>{d.dag}</div>
                      <div style={{ fontSize: 9, fontWeight: 700, color: d.kleur, marginTop: 2 }}>{d.type}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '14px 16px', background: '#fafaf7', border: '1px solid #e5e5e0', marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>🛒 {isEN ? 'Shopping list (excerpt)' : 'Boodschappenlijst (fragment)'}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, fontSize: 12, color: '#444' }}>
                    {(isTim
                      ? ['Kipfilet — 1.4 kg', 'Havermout — 490 g', 'Pasta volkoren — 700 g', 'Bananen — 7 stuks', 'Magere kwark — 1.2 kg', 'Rijst basmati — 630 g']
                      : ['Kipfilet — 1.1 kg', 'Havermout — 390 g', 'Pasta volkoren — 560 g', 'Bananen — 7 stuks', 'Magere kwark — 950 g', 'Rijst basmati — 500 g']
                    ).map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ color: '#d94f30', fontSize: 10 }}>▸</span> {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: '#6b6b65' }}>
                  {isEN ? '📦 Categories sorted in supermarket order. 1× or 2× per week shopping — your choice.' : '📦 Categorieën gesorteerd in supermarkt-volgorde. 1× of 2× per week boodschappen — jij kiest.'}
                </div>
              </div>
            )
          },
          {
            titel: isEN ? 'Step 5 — Match day: timing matters' : 'Stap 5 — Wedstrijddag: timing is alles',
            sub: isEN ? 'When you eat is as important as what you eat. Especially on match day.' : 'Wanneer je eet is minstens zo belangrijk als wat je eet. Zeker op wedstrijddag.',
            inhoud: (
              <div>
                <div style={{ fontSize: 13, color: '#444', marginBottom: 12 }}>
                  {isEN ? `${naam} has a match at 15:00. The tool calculates exact meal times:` : `${naam} speelt om 15:00. De tool berekent exacte eettijden:`}
                </div>
                {[
                  { tijd: '11:30', label: isEN ? 'Pre-match meal (3.5h before)' : 'Pre-match maaltijd (3.5u voor)', tekst: isEN ? 'Pasta + chicken · ~800 kcal · 80g carbs · low fat' : 'Pasta + kip · ~800 kcal · 80g KH · weinig vet', kleur: '#d94f30' },
                  { tijd: '13:30', label: isEN ? 'Pre-match snack (1.5h before)' : 'Pre-match snack (1.5u voor)', tekst: isEN ? 'Banana + rice cakes · 30–60g fast carbs' : 'Banaan + rijstwafels · 30–60g snelle KH', kleur: '#d97706' },
                  { tijd: '15:00', label: isEN ? '⚽ KICK-OFF' : '⚽ AFTRAP', tekst: isEN ? '150–250 ml fluid every 15 min during match' : '150–250 ml vocht per 15 min tijdens match', kleur: '#1a1a1a' },
                  { tijd: '15:30', label: isEN ? 'Recovery window (within 30 min!)' : 'Herstelvenster (binnen 30 min!)', tekst: isEN ? 'Banana + quark · 1–1.2g/kg carbs + protein · critical' : 'Banaan + kwark · 1–1.2g/kg KH + eiwit · kritisch', kleur: '#16a34a' },
                  { tijd: '17:00', label: isEN ? 'Post-match meal (2h after)' : 'Post-match maaltijd (2u na)', tekst: isEN ? 'Full meal: carbs + protein + vegetables' : 'Volledige maaltijd: KH + eiwit + groenten', kleur: '#0891b2' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '8px 0', borderBottom: '1px dotted #e5e5e0' }}>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: r.kleur, fontSize: 13, minWidth: 48, flexShrink: 0 }}>{r.tijd}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 12 }}>{r.label}</div>
                      <div style={{ fontSize: 11, color: '#6b6b65' }}>{r.tekst}</div>
                    </div>
                  </div>
                ))}
              </div>
            )
          },
          {
            titel: isEN ? "You're ready to start 🎯" : 'Je bent klaar om te starten 🎯',
            sub: isEN ? "That's all there is to it. Fill in your profile and your personal plan is ready in seconds." : 'Zo simpel is het. Vul je profiel in en je persoonlijk plan staat er binnen enkele seconden.',
            inhoud: (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                  {[
                    { emoji: '⚡', tekst: isEN ? 'Correct MET calculation per training type' : 'Correcte MET-berekening per trainingstype' },
                    { emoji: '🍽️', tekst: isEN ? '400 recipes across 7 cuisines' : '400 recepten over 7 keukens' },
                    { emoji: '🏐', tekst: isEN ? '6 day types — rest to match day' : '6 dagtypes — van rust tot wedstrijd' },
                    { emoji: '🛒', tekst: isEN ? 'Shopping list in supermarket order' : 'Boodschappenlijst in supermarkt-volgorde' },
                    { emoji: '⚖️', tekst: isEN ? 'Weight trend → automatic kcal correction' : 'Gewichtstrend → automatische kcal-correctie' },
                    { emoji: '💧', tekst: isEN ? 'Personal hydration advice' : 'Persoonlijk hydratatie-advies' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#fafaf7', border: '1px solid #e5e5e0' }}>
                      <span style={{ fontSize: 20 }}>{item.emoji}</span>
                      <span style={{ fontSize: 12, color: '#444' }}>{item.tekst}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '14px 16px', background: '#f0fdf4', border: '1px solid #bbf7d0', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                  <strong>🏐 Don Bosco Gent</strong> — {isEN ? 'this tool is built with your team in mind. Scientific basis, checked by our dietitian, and still evolving based on your feedback.' : 'deze tool is gebouwd met jullie team in gedachten. Wetenschappelijke basis, nagekeken door onze diëtist, en evolueert verder op basis van jullie feedback.'}
                </div>
                <button
                  onClick={() => setWalkthroughOpen(false)}
                  style={{ width: '100%', padding: '14px', background: '#d94f30', color: 'white', border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {isEN ? "Let's go — start my plan →" : 'Aan de slag — start mijn plan →'}
                </button>
              </div>
            )
          }
        ];

        const stap = stappen[walkthroughStap];
        const isLaatste = walkthroughStap === stappen.length - 1;
        const isEerste = walkthroughStap === 0;

        return (
          <div className="modal-overlay" onClick={() => setWalkthroughOpen(false)} style={{ background: 'rgba(0,0,0,0.75)', zIndex: 1100 }}>
            <div onClick={e => e.stopPropagation()} style={{
              background: 'white', maxWidth: 560, width: '95%', maxHeight: '90vh',
              overflowY: 'auto', padding: 0, boxShadow: '0 24px 80px rgba(0,0,0,0.3)', position: 'relative'
            }}>
              {/* Progress bar */}
              <div style={{ height: 4, background: '#e5e5e0' }}>
                <div style={{ height: '100%', background: '#d94f30', width: `${((walkthroughStap + 1) / stappen.length) * 100}%`, transition: 'width 0.3s ease' }} />
              </div>

              {/* Header */}
              <div style={{ padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="mono" style={{ fontSize: 11, color: '#d94f30', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 6 }}>
                    {emoji} {naam.toUpperCase()} · {isEN ? `STEP ${walkthroughStap + 1} OF ${stappen.length}` : `STAP ${walkthroughStap + 1} VAN ${stappen.length}`}
                  </div>
                  <h2 className="display-font" style={{ fontSize: 20, margin: '0 0 6px', lineHeight: 1.2 }}>{stap.titel}</h2>
                  <p style={{ fontSize: 13, color: '#6b6b65', margin: 0, lineHeight: 1.5 }}>{stap.sub}</p>
                </div>
                <button onClick={() => setWalkthroughOpen(false)}
                  style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#999', padding: '0 0 0 12px', lineHeight: 1, flexShrink: 0 }}>×</button>
              </div>

              {/* Content */}
              <div style={{ padding: '20px 24px' }}>{stap.inhoud}</div>

              {/* Navigation */}
              {!isLaatste && (
                <div style={{ padding: '0 24px 24px', display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                  <button
                    onClick={() => isEerste ? setWalkthroughPersoon(null) : setWalkthroughStap(s => s - 1)}
                    style={{ padding: '10px 20px', background: 'white', color: '#444', border: '1px solid #ccc', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>
                    ← {isEerste ? (isEN ? 'Switch' : 'Wissel') : (isEN ? 'Back' : 'Terug')}
                  </button>
                  <button
                    onClick={() => setWalkthroughStap(s => s + 1)}
                    style={{ padding: '10px 24px', background: '#1a1a1a', color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, flex: 1 }}>
                    {isEN ? 'Next →' : 'Volgende →'}
                  </button>
                </div>
              )}

              {/* Dot indicators */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '0 0 20px' }}>
                {stappen.map((_, i) => (
                  <button key={i} onClick={() => setWalkthroughStap(i)}
                    style={{ width: i === walkthroughStap ? 20 : 8, height: 8, borderRadius: 4, background: i === walkthroughStap ? '#d94f30' : '#e5e5e0', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.2s ease' }} />
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* VOEDING 101 MODAL */}
      {voeding101Open && (
        <div className="modal-overlay" onClick={() => setVoeding101Open(false)} style={{ background: 'rgba(0,0,0,0.65)' }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 760, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div className="mono" style={{ fontSize: 11, color: '#d94f30', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Basisprincipes</div>
                <h2 className="display-font" style={{ margin: 0, fontSize: 28 }}>Voeding 101</h2>
                <p style={{ margin: '6px 0 0 0', fontSize: 13, color: '#6b6b65' }}>Alles wat je moet weten om zelf aan de slag te gaan — simpel uitgelegd, wetenschappelijk onderbouwd.</p>
              </div>
              <button onClick={() => setVoeding101Open(false)} style={{ background: 'none', border: 'none', fontSize: 28, cursor: 'pointer', color: '#999', padding: 0, lineHeight: 1 }}>×</button>
            </div>

            {[
              {
                nr: '01', titel: 'Calorieën — de basis van alles',
                kleur: '#d94f30',
                inhoud: (
                  <>
                    <p>Een calorie is een eenheid van energie. Je lichaam verbrandt energie bij alles: slapen, denken, bewegen, sporten. Het getal dat je nodig hebt heet je <strong>TDEE</strong> (Total Daily Energy Expenditure).</p>
                    <div style={{ background: '#fafaf7', padding: '10px 14px', borderLeft: '3px solid #d94f30', margin: '10px 0', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>
                      TDEE = BMR × PAL<br />
                      BMR (man) = 10 × gewicht + 6.25 × lengte − 5 × leeftijd + 5<br />
                      BMR (vrouw) = 10 × gewicht + 6.25 × lengte − 5 × leeftijd − 161<br />
                      PAL = activiteitsfactor (1.4 zittend → 2.0 topsporter)
                    </div>
                    <p><strong>Voorbeeld:</strong> man, 80 kg, 180 cm, 22 jaar, 5 trainingsuren/week → BMR ≈ 1820 kcal, PAL ≈ 1.8 → TDEE ≈ 3276 kcal.</p>
                    <p><strong>Snuisteregel:</strong> wil je afvallen → eet 300-500 kcal minder/dag. Wil je aankomen → eet 200-400 kcal meer. Meer dan 500 kcal deficit leidt tot spierverlies bij sporters.</p>
                  </>
                )
              },
              {
                nr: '02', titel: 'De drie macronutriënten',
                kleur: '#0891b2',
                inhoud: (
                  <>
                    <p>Alle calorieën komen uit 3 bronnen:</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, margin: '10px 0' }}>
                      {[
                        { naam: 'Eiwit', kcal: '4 kcal/g', rol: 'Spieropbouw, herstel, hormonen', doel: '1.6–2.2 g/kg', bronnen: 'Kip, vis, ei, kwark, peulvruchten', kleur: '#d94f30' },
                        { naam: 'Koolhydraten', kcal: '4 kcal/g', rol: 'Brandstof voor training (glycogeen)', doel: '3–7 g/kg*', bronnen: 'Rijst, pasta, havermout, aardappel, fruit', kleur: '#16a34a' },
                        { naam: 'Vet', kcal: '9 kcal/g', rol: 'Hormonen, vetoplosbare vitamines, verzadiging', doel: '0.8–1.2 g/kg', bronnen: 'Avocado, noten, olijfolie, zalm', kleur: '#d97706' }
                      ].map(m => (
                        <div key={m.naam} style={{ padding: '10px 12px', background: '#fafaf7', borderTop: `3px solid ${m.kleur}` }}>
                          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{m.naam}</div>
                          <div className="mono" style={{ fontSize: 10, color: '#6b6b65', marginBottom: 6 }}>{m.kcal}</div>
                          <div style={{ fontSize: 12, marginBottom: 4 }}><strong>Rol:</strong> {m.rol}</div>
                          <div style={{ fontSize: 12, marginBottom: 4 }}><strong>Doel:</strong> {m.doel}</div>
                          <div style={{ fontSize: 11, color: '#6b6b65' }}>Bronnen: {m.bronnen}</div>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: 12, color: '#6b6b65', margin: '6px 0 0 0' }}>* CH-doel varieert: rustdag 3–4 g/kg · trainingsdag 5–7 g/kg · matchdag 7–10 g/kg (ACSM 2016)</p>
                  </>
                )
              },
              {
                nr: '03', titel: 'Eiwit — het belangrijkste macro voor sporters',
                kleur: '#d94f30',
                inhoud: (
                  <>
                    <p>Eiwit is het meest kritische macro voor handbalspelers. Onderzoek toont dat <strong>1.6–2.2 g/kg/dag</strong> optimaal is voor spierbehoud en -opbouw (Morton et al. 2018, ISSN 2017).</p>
                    <p><strong>Maar timing telt ook:</strong> verdeel eiwit over 4–5 maaltijden van elk ~0.4 g/kg. Dit stimuleert eiwitsynthese beter dan alles op 2 momenten.</p>
                    <div style={{ background: '#fafaf7', padding: '10px 14px', borderLeft: '3px solid #d94f30', margin: '10px 0', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>
                      Voorbeeld 80 kg: 80 × 1.8 = 144 g eiwit/dag<br />
                      Verdeeld over 5 maaltijden: 144 ÷ 5 = ~29 g per maaltijd<br />
                      = 150g kipfilet of 200g kwark of 5 eieren
                    </div>
                    <p><strong>Compleet vs incompleet eiwit:</strong> dierlijk eiwit (vlees, vis, ei, zuivel) bevat alle 9 essentiële aminozuren. Plantaardig eiwit combineer je: rijst + peulvruchten = compleet profiel.</p>
                  </>
                )
              },
              {
                nr: '04', titel: 'Koolhydraten — brandstof voor de wedstrijd',
                kleur: '#16a34a',
                inhoud: (
                  <>
                    <p>Koolhydraten worden opgeslagen als <strong>glycogeen</strong> in spieren en lever (totaal ~400–600g = 1600–2400 kcal reserve). Handbal verbruikt 60–80% van die glycogeenreserve per match.</p>
                    <p><strong>Voor de match:</strong> eet 2–4 uur vooraf een koolhydraatrijke maaltijd (70–140g CH). Vermijd veel vet of vezel dan (vertragen maagontlediging).</p>
                    <div style={{ background: '#fafaf7', padding: '10px 14px', borderLeft: '3px solid #16a34a', margin: '10px 0', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>
                      Pre-match (3u vooraf): 1–2 g CH/kg = 80–160g voor 80 kg<br />
                      = bord pasta (80g droog) + 2 sneden brood<br />
                      Post-match (binnen 30 min): 1–1.2 g CH/kg + 0.4 g eiwit/kg<br />
                      = rijst met kip of banaan + kwark
                    </div>
                    <p><strong>Snelle vs trage CH:</strong> na sport → snelle CH (wit brood, banaan, rijst) voor snelle glycogeen-aanvulling. Overige maaltijden → trage CH (volkoren, havermout) voor stabiele energie.</p>
                  </>
                )
              },
              {
                nr: '05', titel: 'Hydratatie — onderschat maar cruciaal',
                kleur: '#0891b2',
                inhoud: (
                  <>
                    <p>Slechts <strong>2% dehydratie</strong> verlaagt aerobe prestatie met 10–20% en reactietijd met 5–8% (Sawka et al. 2007). Handballers zweten 0.8–2.0 L/uur afhankelijk van intensiteit en klimaat.</p>
                    <div style={{ background: '#fafaf7', padding: '10px 14px', borderLeft: '3px solid #0891b2', margin: '10px 0', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>
                      Basis: 35 ml/kg/dag = 80 kg × 35 = 2.8 L<br />
                      + Training (1 uur): zweet-verlies × 1.5 (herstel inclusief)<br />
                      Urine-kleur = beste praktische indicator:<br />
                      Strogeel of lichter = goed gehydreerd ✓<br />
                      Donkergeel of amber = te weinig gedronken ✗
                    </div>
                    <p><strong>Tijdens match:</strong> drink 150–250 ml elke 15–20 min. Meer dan 1 L/uur is niet nodig (risico op hyponatriëmie bij overmatig water). Bij intensieve sessies &gt;60 min: sportdrank met 30–60g CH/L + 500–700 mg natrium/L.</p>
                  </>
                )
              },
              {
                nr: '06', titel: 'Maaltijdtiming — wanneer eet je wat?',
                kleur: '#7c3aed',
                inhoud: (
                  <>
                    <p>Timing versterkt het effect van macronutriënten. Dit is het basisschema voor een handbalspeler:</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '10px 0' }}>
                      {[
                        { moment: 'Ontbijt', timing: '07:00', advies: 'CH-rijk + matig eiwit. Glycogeen bijvullen na de nacht.', vb: 'Havermout + melk + banaan + ei' },
                        { moment: 'Pre-training snack', timing: '1–2u voor', advies: 'Licht, koolhydraatrijk, weinig vet/vezel.', vb: 'Rijstwafels + pindakaas of banaan + yoghurt' },
                        { moment: 'Post-training (30 min!)', timing: 'Binnen 30 min', advies: 'Eiwit + CH samen — spiereiwitsynthese is 48u verhoogd.', vb: '200g kwark + banaan of shake + rijst' },
                        { moment: 'Avondmaaltijd', timing: '18:00–20:00', advies: 'Volledig: eiwit + CH + groenten + vet.', vb: 'Kip + rijst + broccoli + olijfolie' },
                        { moment: 'Pre-bed snack', timing: '21:00–22:00', advies: 'Traag eiwit (caseïne) voor nachtelijk herstel.', vb: 'Kwark + walnoten of warme melk' }
                      ].map(m => (
                        <div key={m.moment} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 8, padding: '8px 10px', background: '#fafaf7', borderLeft: '3px solid #7c3aed', fontSize: 12 }}>
                          <div>
                            <div style={{ fontWeight: 700 }}>{m.moment}</div>
                            <div className="mono" style={{ fontSize: 10, color: '#6b6b65' }}>{m.timing}</div>
                          </div>
                          <div>
                            <div style={{ marginBottom: 3 }}>{m.advies}</div>
                            <div style={{ color: '#6b6b65', fontStyle: 'italic' }}>Bijv: {m.vb}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )
              },
              {
                nr: '07', titel: 'Micronutriënten — de details die het verschil maken',
                kleur: '#d97706',
                inhoud: (
                  <>
                    <p>Als macro's kloppen maar je presteert toch slecht, liggen micro's vaak aan de basis. De 4 meest kritische voor handbalspelers:</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, margin: '10px 0' }}>
                      {[
                        { naam: 'IJzer (Fe)', doel: '8 mg (man) / 18 mg (vrouw)', rol: 'Zuurstoftransport, energie. Tekort = chronische vermoeidheid.', bronnen: 'Rood vlees, mosselen, spinazie, linzen, sesamzaad. TIP: eet met vit C voor betere opname.' },
                        { naam: 'Vitamine D', doel: '15 µg/dag', rol: 'Spierkracht, immuunsysteem, botdichtheid. 40% BE/NL heeft tekort in winter.', bronnen: 'Vette vis, eidooier, fortified melk. In winter: supplement 10–25 µg.' },
                        { naam: 'Magnesium (Mg)', doel: '350–420 mg/dag', rol: 'Spiercontractie, energiestofwisseling, kramp-preventie.', bronnen: 'Noten, zaden, volkoren granen, donkergroene groenten, donkere chocolade.' },
                        { naam: 'Calcium (Ca)', doel: '1000 mg/dag', rol: 'Botsterkte, spiercontractie, bloedstolling.', bronnen: '200 ml melk = 240 mg. Sardientjes, halloumi, tofu, sesamzaad ook rijk.' }
                      ].map(m => (
                        <div key={m.naam} style={{ padding: '10px 12px', background: '#fafaf7', borderLeft: '3px solid #d97706', fontSize: 12 }}>
                          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{m.naam}</div>
                          <div style={{ marginBottom: 4 }}><strong>Doel:</strong> {m.doel}</div>
                          <div style={{ marginBottom: 4 }}>{m.rol}</div>
                          <div style={{ color: '#6b6b65' }}>Bronnen: {m.bronnen}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )
              },
              {
                nr: '08', titel: 'Praktische startregel voor sporters',
                kleur: '#1a1a1a',
                inhoud: (
                  <>
                    <p>Als je één regel onthoudt, maak het deze:</p>
                    <div style={{ background: '#1a1a1a', color: 'white', padding: '14px 18px', margin: '10px 0', fontFamily: 'Fraunces, serif', fontSize: 16, lineHeight: 1.6 }}>
                      "Eet gevarieerd, kleurrijk bord, voldoende eiwit bij elke maaltijd, koolhydraten rond training, en drink voor je dorst hebt."
                    </div>
                    <p>In cijfers voor een 80 kg handbalspeler op trainingsdag:</p>
                    <div style={{ background: '#fafaf7', padding: '10px 14px', borderLeft: '3px solid #1a1a1a', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>
                      Calorieën: ~3000–3400 kcal<br />
                      Eiwit: ~144 g (1.8 g/kg) → ~30 g per maaltijd bij 5 maaltijden<br />
                      Koolhydraten: ~370 g (4.6 g/kg) → meer rond training, minder 's avonds<br />
                      Vet: ~90 g (1.1 g/kg) → onverzadigd vetliefst (olijfolie, noten, vis)<br />
                      Vocht: ~3 L drinken + 0.5 L uit voeding
                    </div>
                    <p style={{ marginTop: 10, fontSize: 12, color: '#6b6b65' }}>
                      <strong>Bronnen:</strong> IOC Consensus 2011 · ACSM Position Stand 2016 · ISSN Position Stand 2017 · Mifflin-St Jeor (1990) · Morton et al. (2018)
                    </p>
                  </>
                )
              }
            ].map(sectie => (
              <div key={sectie.nr} style={{ marginBottom: 20, borderTop: `1px solid #e5e5e0`, paddingTop: 18 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ flexShrink: 0, width: 28, height: 28, background: sectie.kleur, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 700 }}>{sectie.nr}</div>
                  <h3 style={{ margin: 0, fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.3 }}>{sectie.titel}</h3>
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.65, color: '#1a1a1a', marginLeft: 40 }}>
                  {sectie.inhoud}
                </div>
              </div>
            ))}

            <div style={{ borderTop: '2px solid #1a1a1a', paddingTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setVoeding101Open(false)} className="profile-button primary" style={{ padding: '10px 24px' }}>
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HELP MODAL — "Hoe werkt deze tool?" */}
      {helpOpen && (
        <div className="modal-overlay" onClick={() => setHelpOpen(false)} style={{ background: 'rgba(0,0,0,0.65)' }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 720 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div className="mono" style={{ fontSize: 11, color: '#d94f30', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                  Snelstartgids
                </div>
                <h2 className="display-font" style={{ margin: 0, fontSize: 28 }}>Hoe werkt deze tool?</h2>
              </div>
              <button onClick={() => setHelpOpen(false)} style={{ background: 'none', border: 'none', fontSize: 28, cursor: 'pointer', color: '#999', padding: 0, lineHeight: 1 }}>×</button>
            </div>

            <p style={{ fontSize: 14, color: '#444', lineHeight: 1.6, marginBottom: 20 }}>
              Deze tool berekent een persoonlijk voedingsplan voor handbalspelers gebaseerd op wetenschappelijke richtlijnen (IOC, ACSM, ISSN). In 6 stappen:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: '50%', background: '#d94f30', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: 16 }}>1</div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 15, fontFamily: 'Fraunces, serif' }}>Vul je profiel in</h4>
                  <p style={{ margin: 0, fontSize: 13, color: '#444', lineHeight: 1.5 }}>
                    Bij eerste gebruik krijg je een wizard van 3 stappen (geslacht, gewicht, training, doel). Daarna kun je via "+ Verfijn instellingen" optioneel allergieën, dieet-quota, budgetmodus, voorkeursingrediënten en seizoensfilter activeren.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: '50%', background: '#d94f30', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: 16 }}>2</div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 15, fontFamily: 'Fraunces, serif' }}>Bekijk je dagschema</h4>
                  <p style={{ margin: 0, fontSize: 13, color: '#444', lineHeight: 1.5 }}>
                    De tool berekent BMR + PAL + TDEE op basis van Mifflin-St Jeor, schaalt CH naar dagtype (rustdag −35% CH, matchdag +30% CH), en kiest 4-6 maaltijden per dag uit 400 recepten over 7 keukens. Klik op een recept voor details, swap met "Vervang ↻" of markeer als ★ favoriet.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: '50%', background: '#d94f30', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: 16 }}>3</div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 15, fontFamily: 'Fraunces, serif' }}>Plan je trainingsweek</h4>
                  <p style={{ margin: 0, fontSize: 13, color: '#444', lineHeight: 1.5 }}>
                    In het tabblad "Weekplanning" kun je per dag aangeven of het een trainings-, rust- of matchdag is. De macros schalen automatisch. Onderaan vind je meal-prep suggesties voor batch-koken.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: '50%', background: '#d94f30', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: 16 }}>4</div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 15, fontFamily: 'Fraunces, serif' }}>Boodschappen + recepten doorzoeken</h4>
                  <p style={{ margin: 0, fontSize: 13, color: '#444', lineHeight: 1.5 }}>
                    De boodschappenlijst is gesorteerd in supermarkt-routing-volgorde (groente/fruit → koeling → bakkerij → droogwaar → diepvries → kassa). In het tab "Recepten" kun je alle 400 recepten doorbladeren met filters op type, keuken, kooktijd, GV/LV, favorieten.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: '50%', background: '#d94f30', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: 16 }}>5</div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 15, fontFamily: 'Fraunces, serif' }}>Track je voortgang</h4>
                  <p style={{ margin: 0, fontSize: 13, color: '#444', lineHeight: 1.5 }}>
                    Tracking is opt-in (privacy + welzijn). Log gewicht, herstel-score en plan-adherence (✓/✗ per maaltijd). Na 4+ logs krijg je auto-suggesties voor kcal-aanpassingen. In het tabblad "Hydratatie" kun je je sweat-rate meten voor persoonlijk vochtadvies.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: '50%', background: '#d94f30', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: 16 }}>6</div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 15, fontFamily: 'Fraunces, serif' }}>Personaliseer over tijd</h4>
                  <p style={{ margin: 0, fontSize: 13, color: '#444', lineHeight: 1.5 }}>
                    ★ Favorieten krijgen voorrang in toekomstige plannen. ⏸ Geblokkeerde recepten verdwijnen 4 weken uit selectie. Bewaar je profiel via "Profielen" — alle data (input, tracking, favorieten, adherence) wordt persistent opgeslagen.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ background: '#f0f9ff', borderLeft: '3px solid #0891b2', padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#075985', lineHeight: 1.6 }}>
              <strong>💡 Tip:</strong> Klik op het <span style={{ display: 'inline-block', border: '1.5px solid #b8b8b0', borderRadius: '50%', width: 16, height: 16, lineHeight: '13px', textAlign: 'center', fontSize: 10, fontWeight: 700, color: '#6b6b65' }}>?</span>-icoontje naast termen zoals BMR, PAL, REDs of Sweat-rate voor wetenschappelijke uitleg met bronvermelding.
            </div>

            <div style={{ background: '#fef7ed', borderLeft: '3px solid #d97706', padding: '12px 16px', marginBottom: 16, fontSize: 12, color: '#7c4a06', lineHeight: 1.6 }}>
              <strong>⚠️ Belangrijk:</strong> Deze tool is een educatief hulpmiddel, geen medisch advies. Bij specifieke voedings-, gewichts- of gezondheidsvragen — en zeker bij signalen van eetstoornissen of REDs — raadpleeg een sportdiëtist (BVD-ABD/NVD) of arts. Hulp nodig? <strong>anbn.be</strong> (eetstoornissen) of <strong>113</strong> (mentale gezondheid).
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div className="mono" style={{ fontSize: 10, color: '#999', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Bronnen: IOC · ACSM · ISSN · EHF · NEVO
              </div>
              <button onClick={() => setHelpOpen(false)} className="profile-button primary" style={{ padding: '10px 20px' }}>
                {t('modal_begrepen')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ONBOARDING WIZARD */}
      {wizardStap !== null && (
        <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.65)' }}>
          <div className="modal-content" style={{ maxWidth: 520 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <div className="mono" style={{ fontSize: 11, color: '#d94f30', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {t('wizard_welkom')} {wizardStap} {t('wizard_van')} 3
              </div>
              <button onClick={sluitWizard}
                style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: 12, textDecoration: 'underline', fontFamily: 'inherit' }}>
                {t('wizard_sla_over')}
              </button>
            </div>

            {/* progress bar */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 22 }}>
              {[1, 2, 3].map(s => (
                <div key={s} style={{ flex: 1, height: 4, background: s <= wizardStap ? '#d94f30' : '#e5e5e0' }} />
              ))}
            </div>

            {wizardStap === 1 && (
              <>
                <h2 className="display-font" style={{ fontSize: 24, margin: '0 0 6px 0' }}>{t('wizard_stap1_titel')}</h2>
                <p style={{ fontSize: 13, color: '#6b6b65', margin: '0 0 20px 0', lineHeight: 1.5 }}>
                  We vragen het minimum nodig om je een goed startplan te geven. Verfijnen kan altijd later.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                  <div>
                    <label className="label-style">Geslacht</label>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button onClick={() => u('geslacht', 'man')} className={`pill-button ${input.geslacht === 'man' ? 'active' : ''}`} style={{ flex: 1 }}>{t('label_man')}</button>
                      <button onClick={() => u('geslacht', 'vrouw')} className={`pill-button ${input.geslacht === 'vrouw' ? 'active' : ''}`} style={{ flex: 1 }}>{t('label_vrouw')}</button>
                    </div>
                  </div>
                  <div>
                    <label className="label-style">Leeftijd</label>
                    <input className="input-style" type="number" min="15" max="40" value={input.leeftijd} onChange={e => u('leeftijd', parseInt(e.target.value) || 22)} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 22 }}>
                  <div>
                    <label className="label-style">{t('label_gewicht')}</label>
                    <input className="input-style" type="number" step="0.1" value={input.gewicht} onChange={e => u('gewicht', parseFloat(e.target.value) || 80)} />
                  </div>
                  <div>
                    <label className="label-style">Lengte (cm)</label>
                    <input className="input-style" type="number" value={input.lengte} onChange={e => u('lengte', parseInt(e.target.value) || 180)} />
                  </div>
                </div>

                <button onClick={() => setWizardStap(2)} className="profile-button primary" style={{ width: '100%', padding: '12px' }}>
                  {t('wizard_volgende')}
                </button>
              </>
            )}

            {wizardStap === 2 && (
              <>
                <h2 className="display-font" style={{ fontSize: 24, margin: '0 0 6px 0' }}>{t('wizard_stap2_titel')}</h2>
                <p style={{ fontSize: 13, color: '#6b6b65', margin: '0 0 20px 0', lineHeight: 1.5 }}>
                  We rekenen je verbruik op basis van handbal- en krachtsessies.
                </p>

                <div style={{ marginBottom: 14 }}>
                  <label className="label-style">Handbal-sessies per week</label>
                  <input className="input-style" type="number" min="0" max="6" value={input.handbalPerWeek} onChange={e => u('handbalPerWeek', parseInt(e.target.value) || 3)} />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label className="label-style">Krachttraining per week</label>
                  <input className="input-style" type="number" min="0" max="5" value={input.krachtPerWeek} onChange={e => u('krachtPerWeek', parseInt(e.target.value) || 2)} />
                </div>
                <div style={{ marginBottom: 22 }}>
                  <label className="label-style">{taal === 'en' ? 'When do you usually train?' : 'Wanneer train je meestal?'}</label>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[
                      { v: 'ochtend', label: 'Ochtend' },
                      { v: 'middag', label: 'Middag' },
                      { v: 'avond', label: 'Avond' }
                    ].map(d => (
                      <button key={d.v} className={`pill-button ${(input.trainingMoment || 'avond') === d.v ? 'active' : ''}`}
                        style={{ flex: 1, padding: '8px 6px' }}
                        onClick={() => u('trainingMoment', d.v)}>
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setWizardStap(1)} className="profile-button" style={{ flex: 1, padding: '12px' }}>
                    {t('wizard_terug')}
                  </button>
                  <button onClick={() => setWizardStap(3)} className="profile-button primary" style={{ flex: 2, padding: '12px' }}>
                    {t('wizard_volgende')}
                  </button>
                </div>
              </>
            )}

            {wizardStap === 3 && (
              <>
                <h2 className="display-font" style={{ fontSize: 24, margin: '0 0 6px 0' }}>{t('wizard_stap3_titel')}</h2>
                <p style={{ fontSize: 13, color: '#6b6b65', margin: '0 0 20px 0', lineHeight: 1.5 }}>
                  Laatste vraag — daarna krijg je je startplan.
                </p>

                <div style={{ marginBottom: 14 }}>
                  <label className="label-style">Doel</label>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[
                      { v: 'cut', label: 'Cut', sub: 'Vetverlies' },
                      { v: 'maintain', label: 'Maintain', sub: 'Behoud' },
                      { v: 'bulk', label: 'Bulk', sub: 'Spier ↑' }
                    ].map(d => (
                      <button key={d.v} className={`pill-button ${input.doel === d.v ? 'active' : ''}`}
                        style={{ flex: 1, padding: '12px 6px' }}
                        onClick={() => u('doel', d.v)}>
                        <div style={{ fontWeight: 600 }}>{d.label}</div>
                        <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>{d.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label className="label-style">Seizoensfase</label>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[
                      { v: 'off_season', label: 'Off-season', sub: 'mei-jul' },
                      { v: 'pre_season', label: 'Pre-season', sub: 'aug-sep' },
                      { v: 'in_season', label: 'In-season', sub: 'okt-apr' }
                    ].map(d => (
                      <button key={d.v} className={`pill-button ${(input.fase || 'in_season') === d.v ? 'active' : ''}`}
                        style={{ flex: 1, padding: '8px 6px' }}
                        onClick={() => u('fase', d.v)}>
                        <div style={{ fontWeight: 600, fontSize: 11 }}>{d.label}</div>
                        <div style={{ fontSize: 9, opacity: 0.7, marginTop: 2 }}>{d.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 22 }}>
                  <label className="label-style">Voorkeurskeuken</label>
                  <select className="input-style" value={input.keuken} onChange={e => u('keuken', e.target.value)}>
                    {Object.entries(KEUKEN_LABELS).map(([k, l]) => (
                      <option key={k} value={k}>{l}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setWizardStap(2)} className="profile-button" style={{ flex: 1, padding: '12px' }}>
                    {t('wizard_terug')}
                  </button>
                  <button onClick={sluitWizard} className="profile-button primary" style={{ flex: 2, padding: '12px' }}>
                    {t('wizard_klaar')}
                  </button>
                </div>
                <p style={{ fontSize: 11, color: '#6b6b65', marginTop: 14, textAlign: 'center', lineHeight: 1.5 }}>
                  Je kan later allergieën, dieet-quota, budgetmodus en meer instellen via "Verfijn instellingen".
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* SWAP / VERVANG MODAL */}
      {swapModal && (
        <div className="modal-overlay" onClick={() => setSwapModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 640 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div className="mono" style={{ fontSize: 11, color: '#d94f30', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                  Kies een alternatief
                </div>
                <h2 className="display-font" style={{ margin: 0, fontSize: 22 }}>3 alternatieven</h2>
                <p style={{ margin: '6px 0 0 0', fontSize: 13, color: '#6b6b65' }}>
                  Voor: <strong>{swapModal.huidig?.naam}</strong>
                </p>
              </div>
              <button onClick={() => setSwapModal(null)} style={{ background: 'none', border: 'none', fontSize: 28, cursor: 'pointer', color: '#999', padding: 0 }}>×</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {swapModal.alternatieven.map((alt, idx) => {
                const geschaald = schaalRecept(alt, swapModal.target);
                return (
                  <div key={alt.id} className="stat-card" style={{ cursor: 'pointer', borderLeft: '3px solid #d94f30' }}
                       onClick={() => kiesAlternatief(alt)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                      <h4 style={{ margin: 0, fontFamily: 'Fraunces, serif', fontSize: 17, fontWeight: 600 }}>{alt.naam}</h4>
                      <span className="mono" style={{ fontSize: 10, color: '#6b6b65' }}>
                        {KEUKEN_LABELS[alt.keuken]?.split(' ')[0]} · {alt.kooktijd_min} min
                      </span>
                    </div>
                    <div className="meal-macros" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}>
                      <div className="macro-pill"><span className="label">kcal</span><span className="value">{Math.round(geschaald.macros.kcal)}</span></div>
                      <div className="macro-pill"><span className="label">eiwit</span><span className="value">{Math.round(geschaald.macros.eiwit_g)}g</span></div>
                      <div className="macro-pill"><span className="label">CH</span><span className="value">{Math.round(geschaald.macros.ch_g)}g</span></div>
                      <div className="macro-pill"><span className="label">vet</span><span className="value">{Math.round(geschaald.macros.vet_g)}g</span></div>
                    </div>
                    <p style={{ fontSize: 12, color: '#6b6b65', marginTop: 8, marginBottom: 0 }}>
                      {geschaald.ingredienten.slice(0, 4).map(i => formatIngredientName(i.item)).join(' · ')}
                      {geschaald.ingredienten.length > 4 && ` · +${geschaald.ingredienten.length - 4} meer`}
                    </p>
                  </div>
                );
              })}
            </div>

            <p style={{ marginTop: 16, fontSize: 12, color: '#6b6b65', fontStyle: 'italic' }}>
              Klik op een alternatief om dit recept te gebruiken in plaats van het origineel.
            </p>
          </div>
        </div>
      )}

      {/* PROFIELEN MODAL */}
      {profielModalOpen && (
        <div className="modal-overlay" onClick={() => setProfielModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <h2 className="display-font" style={{ margin: 0, fontSize: 24 }}>Profielen</h2>
              <button onClick={() => setProfielModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: 28, cursor: 'pointer', color: '#999', padding: 0 }}>×</button>
            </div>

            <div style={{ marginBottom: 24, padding: '14px 16px', background: '#fafaf7', border: '1px solid #e5e5e0' }}>
              <div className="label-style">Huidig profiel opslaan</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  className="input-style"
                  type="text"
                  placeholder="bv: Tom_seizoen2026"
                  value={nieuweProfielNaam}
                  onChange={e => setNieuweProfielNaam(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button
                  onClick={() => opslaanProfiel(nieuweProfielNaam)}
                  disabled={!nieuweProfielNaam.trim()}
                  className="profile-button primary"
                >Opslaan</button>
              </div>
              <p style={{ fontSize: 11, color: '#6b6b65', margin: '6px 0 0 0' }}>
                Letters, cijfers, _ en - toegestaan. Andere tekens worden vervangen.
              </p>
            </div>

            <div className="label-style">Opgeslagen profielen</div>
            {profielenLaden ? (
              <p style={{ fontSize: 13, color: '#6b6b65' }}>Laden...</p>
            ) : profielenLijst.length === 0 ? (
              <p style={{ fontSize: 13, color: '#6b6b65', fontStyle: 'italic' }}>Nog geen opgeslagen profielen.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {profielenLijst.map(naam => (
                  <li key={naam} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderBottom: '1px solid #e5e5e0', background: actiefProfielNaam === naam ? '#fef7ed' : 'transparent' }}>
                    <span style={{ fontSize: 14, fontWeight: actiefProfielNaam === naam ? 600 : 400 }}>
                      {naam}{actiefProfielNaam === naam && <span style={{ marginLeft: 8, fontSize: 10, color: '#d94f30', textTransform: 'uppercase', letterSpacing: '0.1em' }}>actief</span>}
                    </span>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => laadProfiel(naam)} className="pill-button small">Laden</button>
                      <button onClick={() => verwijderProfiel(naam)} className="pill-button small" style={{ color: '#cc1f1a' }}>Verwijder</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {!window.storage && (
              <div className="warn-banner warn-info" style={{ marginTop: 16 }}>
                <strong>Storage niet beschikbaar.</strong>
                <div style={{ marginTop: 4, fontSize: 12 }}>Profielen worden lokaal opgeslagen in de Claude artifact-omgeving.</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
