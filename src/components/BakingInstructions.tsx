import { Flame, Clock, Layers, Info } from 'lucide-react';

interface BakingInstructionsProps {
  cakeTypeId: string;
  totalWeight: number;
  servings: number;
  measurementMode: 'metric' | 'imperial' | 'volumetric';
  icingTypeId?: string | null;
  icingName?: string | null;
  hasIcing?: boolean;
}

interface BakingData {
  tempF: number;
  tempC: number;
  timeMin: number;
  timeMax: number;
  pan: string;
  steps: string[];
  doneness: string;
  tips: string[];
  coolingNote?: string;
  nutritionNote?: string;
}

interface IcingData {
  emoji: string;
  method: string;
  prepTime: string;
  difficulty: string;
  steps: string[];
  tips: string[];
  application: string;
}

const BAKING_DATA: Record<string, BakingData> = {
  butter: {
    tempF: 350, tempC: 175, timeMin: 25, timeMax: 35,
    pan: '9-inch round or 8×8 square pan, greased and lined with parchment',
    steps: [
      'Take butter, eggs, and any dairy out of the fridge at least 30–60 minutes before starting. Room-temperature ingredients cream and emulsify far better than cold ones.',
      'Preheat your oven. Grease your pan(s) thoroughly, then line the bottom with a circle of parchment paper. Grease the parchment too.',
      'Whisk together all dry ingredients (flour, leavening, salt, spices) in a bowl and set aside.',
      'Beat butter and sugar in a stand mixer or with a hand mixer on medium-high speed for 3–5 full minutes until the mixture is pale, nearly white, and very fluffy. Do not rush this step — it builds the structure of your cake.',
      'Add eggs one at a time, beating for 30 seconds after each. Scrape down the sides of the bowl between additions. If the mixture looks curdled, keep beating — it will come back together.',
      'Add any extracts or flavorings now.',
      'With the mixer on low, add the dry ingredients and wet ingredients (milk, buttermilk, etc.) in alternating additions — begin and end with the dry ingredients. Do 3 additions of dry and 2 of wet. Mix only until just combined after each addition.',
      'Stop the mixer and fold the batter a few times by hand with a spatula to catch any unmixed flour at the bottom. Do not overmix — overworking the gluten makes a tough cake.',
      'Pour batter into prepared pan(s) and spread evenly. Tap the pan gently on the counter 2–3 times to pop any large air bubbles.',
      'Bake in the center of the oven. Do not open the oven door for the first 20 minutes — the cake is still setting and temperature drops can cause sinking.',
      'Start testing for doneness at the low end of the time range. Insert a toothpick into the center — it should come out clean or with a few moist crumbs. Wet batter means more time needed.',
      'Cool in the pan on a wire rack for 10–15 minutes, then run a knife around the edge and invert onto the rack. Peel off the parchment and let cool completely before frosting — at least 1 hour.',
    ],
    doneness: 'Toothpick comes out clean or with a few moist crumbs; edges pull slightly from the pan; center springs back when gently pressed',
    coolingNote: 'Cool completely before frosting — frosting a warm cake melts the frosting and creates a soggy layer. For layer cakes, wrap cooled layers in plastic wrap and refrigerate or freeze for 30 minutes before assembling.',
    tips: [
      'Room-temperature butter is non-negotiable — cold butter will not cream properly and your cake will be dense',
      'Do not overmix after adding flour — gluten development happens fast and makes a tough, rubbery cake',
      'Scrape the bowl and paddle attachment down frequently while creaming — unmixed butter at the edges ruins the whole batch',
      'If your oven runs hot, use an oven thermometer — most ovens are 25°F off from what the dial says',
      'For extra-flat layers, use baking strips (wet fabric strips wrapped around the pan) to slow the outer edge and even out the rise',
    ],
  },
  oil: {
    tempF: 350, tempC: 175, timeMin: 30, timeMax: 40,
    pan: '9×13 pan, or two 9-inch round pans, greased and floured',
    steps: [
      'Preheat oven. Grease and flour your pan(s), or use baking spray with flour.',
      'Whisk all dry ingredients (flour, sugar, leavening, salt, spices) together in a large bowl. Make a well in the center.',
      'In a separate bowl or large measuring cup, whisk together all wet ingredients: oil, eggs, buttermilk/milk, vanilla, and any extracts.',
      'If using any vegetables (carrots, zucchini, banana, pumpkin), mix them in now with the wet ingredients.',
      'Pour the wet ingredients into the well in the dry ingredients. Stir with a spatula or whisk until just combined — a few lumps are totally fine. Overmixing is the enemy of a tender crumb.',
      'If batter seems very thick, let it rest for 5 minutes — oil-based batters often loosen slightly as they sit.',
      'Pour into prepared pan(s). If using two round pans, use a kitchen scale to make sure each has exactly the same amount of batter.',
      'Bake in the center rack. Oil-based cakes are more forgiving than butter cakes but still do not open the oven door early.',
      'Test with a toothpick starting at the low end of the time range. Oil cakes often stay moist-looking even when done — trust the toothpick.',
      'Cool in the pan for 10–15 minutes, then turn out onto a wire rack and cool completely.',
    ],
    doneness: 'Toothpick comes out clean; top domes slightly and springs back when pressed; edges begin pulling from the pan sides',
    coolingNote: 'Oil-based cakes are more moist and forgiving at room temperature — they store well for 3–4 days. Wrap tightly in plastic if storing more than a day.',
    tips: [
      'Oil keeps this cake moist for days longer than butter — it stays soft even after refrigerating',
      'Do not substitute butter for oil without adjusting — butter has water content that changes the texture',
      'Shred vegetables finely so they disappear into the crumb; coarsely shredded veg creates pockets of moisture',
      'Add a cup of hot coffee to chocolate oil-based cakes — it deepens the chocolate flavor without making it taste like coffee',
    ],
  },
  foam: {
    tempF: 325, tempC: 165, timeMin: 35, timeMax: 45,
    pan: 'Ungreased 10-inch tube or angel food pan — do NOT grease',
    steps: [
      'Ensure all equipment — bowl, whisk, beaters — is completely clean and grease-free. Even a trace of fat will prevent the egg whites from whipping to stiff peaks.',
      'Separate eggs carefully. Even a single drop of yolk will ruin the whites. Separate each egg into a small cup before adding to the bowl.',
      'Sift the flour 2–3 times to make it as light as possible. Weigh it after sifting for accuracy.',
      'In a clean stand mixer bowl, whip egg whites on medium speed until foamy. Add cream of tartar (if using) and increase to medium-high.',
      'With the mixer running, gradually add the sugar in a slow, steady stream. Continue whipping until the whites form stiff, glossy peaks that hold their shape — when you lift the beater, the tip of the peak stands straight up without drooping.',
      'Add any extracts or flavorings to the whipped whites and fold once or twice.',
      'Sift about one-third of the flour over the whites. Using a large rubber spatula, fold gently — cut down through the center, sweep along the bottom, and fold up the sides. Rotate the bowl a quarter turn after each fold. Fold only until the flour disappears, then repeat with the next third.',
      'Pour batter gently into the UNGREASED pan. Run a thin knife or skewer through the batter in circles to pop any large air pockets.',
      'Bake at the lower temperature — foam cakes need a slower, gentler bake to prevent collapse.',
      'Test doneness at the low end: the top should be deep golden brown and spring back firmly when pressed. A toothpick should come out clean.',
      'IMMEDIATELY invert the pan onto its built-in legs or onto the neck of a glass bottle. The cake must cool upside down — this prevents it from collapsing under its own weight while the structure is still setting. Do not remove from pan until completely cool, at least 1.5–2 hours.',
      'To unmold, run a long thin knife around the outer edge and the inner tube. The cake should release cleanly. Use a serrated knife and a gentle sawing motion to slice.',
    ],
    doneness: 'Deep golden top that springs back firmly when pressed; toothpick comes out clean; cake begins pulling slightly from the pan sides',
    coolingNote: 'Must cool completely upside-down in the pan — minimum 1.5 to 2 hours. Removing early will cause the cake to collapse. Foam cakes are best the day they are made but hold well for 2 days wrapped at room temperature.',
    tips: [
      'Any grease — even fingerprints — on the bowl or beaters will prevent egg whites from reaching full volume',
      'Do not skip the inverted cooling — without it, the cake will deflate and become dense',
      'Sift flour 3 times for maximum lightness; spoon it into the measuring cup rather than scooping',
      'Fold, do not stir — every extra fold deflates the batter. Count your folds and stop at 30–35 total',
    ],
  },
  chiffon: {
    tempF: 325, tempC: 165, timeMin: 55, timeMax: 65,
    pan: 'Ungreased 10-inch tube pan — do NOT grease',
    steps: [
      'Separate eggs while they are cold — yolks separate more cleanly when cold. Then let them come to room temperature before using.',
      'Preheat oven. Do NOT grease the tube pan — the batter needs to cling to the sides to rise tall and even.',
      'Whisk together the dry ingredients (flour, sugar, leavening, salt) in a large bowl and make a well in the center.',
      'In a separate bowl, whisk egg yolks, oil, liquid (water, juice, or milk), and any extracts until smooth and homogenous.',
      'Pour the yolk mixture into the well in the dry ingredients and whisk until completely smooth. Set aside.',
      'In a clean stand mixer bowl with clean beaters, whip egg whites (with cream of tartar if using) to firm, glossy peaks — stiffer than for foam cake but not so stiff they look dry or clumpy.',
      'Scoop about one-third of the whipped whites into the yolk batter and stir vigorously — this loosens the batter to make folding easier.',
      'Add the remaining whites in two additions, folding gently each time with a large rubber spatula. Use slow, deliberate strokes. Stop as soon as the whites are incorporated — you want a light, even batter with no streaks.',
      'Pour the batter into the ungreased pan and smooth the top. Run a thin knife or skewer through the batter to eliminate air pockets.',
      'Bake at 325°F — chiffon needs low, slow heat. Do not open the oven door in the first 45 minutes.',
      'Test at 55 minutes: the cake should be deeply golden and spring back when pressed firmly. A toothpick should come out clean.',
      'IMMEDIATELY invert the pan and cool upside-down for at least 1 hour. To unmold, run a knife around both the outer and inner edges and lift the cake out. Slice with a serrated knife.',
    ],
    doneness: 'Deeply golden, domed top; springs back firmly when pressed; toothpick clean; cake may pull slightly from the pan',
    coolingNote: 'Must cool completely inverted for at least 1 hour — do not rush this. Once unmolded, chiffon can be stored wrapped at room temperature for 3 days or refrigerated for up to 5 days.',
    tips: [
      'Never grease the pan — the batter climbs the walls to rise; a greased pan means a flat, dense cake',
      'Invert immediately after baking — gravity does the work of keeping the delicate structure intact while it sets',
      'Cut with a serrated knife using a long, gentle sawing motion — pressing down crushes the airy crumb',
      'Oil-based chiffon stays moister than butter-based foam cakes and holds up better to citrus glazes and soaking syrups',
    ],
  },
  flourless: {
    tempF: 325, tempC: 165, timeMin: 20, timeMax: 25,
    pan: '9-inch springform pan, greased and lined with parchment — water bath recommended',
    steps: [
      'Preheat oven. Grease the springform pan and line the bottom with parchment. If using a water bath, wrap the outside of the pan tightly in 2–3 layers of heavy-duty foil to prevent leaking.',
      'Fill a roasting pan with about 1 inch of hot water and place it in the oven to preheat.',
      'Chop chocolate finely for faster, more even melting. Combine chocolate and butter in a heatproof bowl over barely simmering water (the bowl should NOT touch the water), or microwave in 30-second bursts, stirring between each.',
      'Stir gently until fully melted and smooth. Remove from heat and let cool for 5–10 minutes — adding eggs to hot chocolate will cook them.',
      'Whisk sugar into the cooled chocolate mixture until dissolved.',
      'Add eggs one at a time, whisking vigorously after each until fully incorporated. The batter will become glossy and slightly thickened.',
      'Whisk in any extracts, liqueurs, or espresso powder.',
      'Pour batter into the prepared pan and smooth the top.',
      'Place the springform pan inside the roasting pan of hot water (water bath). The water should come about halfway up the sides of the springform.',
      'Bake 20–25 minutes. The edges should be just set but the center will still have a pronounced jiggle — like set Jell-O rather than liquid. This is correct. It firms dramatically as it cools.',
      'Remove from water bath and let cool on a wire rack to room temperature — about 1 hour. Then refrigerate at least 2 hours before serving.',
      'To unmold: run a knife around the edge, release the springform clasp, and remove the ring. Serve at room temperature or slightly warm for a fudgy center.',
    ],
    doneness: 'Edges fully set and slightly pulling from the pan; center has a definite but gentle jiggle (like firm Jell-O). Do not wait for the center to fully set — it will overbake.',
    coolingNote: 'Cool in the pan completely before refrigerating. The texture firms dramatically as it cools — what looks underdone at 25 minutes will be perfectly fudgy after 2 hours of chilling. Best served at room temperature or slightly warmed.',
    tips: [
      'The water bath is not optional for a crack-free, silky result — dry heat causes the surface to crack and the texture to dry out',
      'Use good-quality chocolate — with no flour or leavening, chocolate is the entire flavor of the cake',
      'The "jiggle test" is your best doneness indicator — more reliable than a toothpick for this style',
      'Dust the top with cocoa powder or powdered sugar just before serving — the top surface darkens and can look matte',
    ],
  },
  cheesecake: {
    tempF: 325, tempC: 165, timeMin: 55, timeMax: 70,
    pan: '9-inch springform pan in a water bath — foil-wrapped outside',
    steps: [
      'Take cream cheese and eggs out of the fridge at least 1 hour before starting. Cold cream cheese never becomes fully smooth and creates a lumpy cheesecake.',
      'Preheat oven to 325°F. Wrap the outside of the springform pan in 2–3 layers of heavy-duty foil. Fill a roasting pan with 1 inch of hot water and place in the oven.',
      'Make the crust: pulse graham crackers in a food processor until fine crumbs. Mix with melted butter and sugar. Press firmly into the bottom of the pan — use the bottom of a measuring cup to press it flat and even. Bake the crust alone for 8–10 minutes, then let cool slightly.',
      'Beat cream cheese with a paddle attachment on medium speed until completely smooth — 3–5 full minutes. Scrape the bowl and paddle several times. There should be absolutely no lumps at this stage.',
      'Add sugar and beat until combined, scraping the bowl down.',
      'Add eggs one at a time on low speed, beating just until incorporated after each. Do not overbeat at this stage — excess air causes cracks and puffing.',
      'Add sour cream, heavy cream, vanilla, and any other flavorings. Mix on low until just smooth. Scrape the bowl once more.',
      'Strain the batter through a fine mesh sieve for the silkiest possible texture (optional but recommended).',
      'Pour batter over the cooled crust and smooth the top. Tap the pan gently on the counter to pop surface bubbles.',
      'Place the springform pan inside the roasting pan of hot water. The water should come about halfway up the sides.',
      'Bake 55–70 minutes. The cheesecake is done when the edges are set and slightly puffed and the center still has a gentle wobble — a 2-inch circle in the center should jiggle like firm Jell-O when the pan is gently shaken.',
      'Turn off the oven, crack the door open about 1 inch, and leave the cheesecake inside for 1 full hour. This gradual cooling dramatically reduces cracking.',
      'Remove from the water bath and run a thin knife around the edge of the cheesecake immediately. Refrigerate uncovered for at least 4 hours — overnight gives the best texture.',
      'To serve: release the springform, slice with a clean hot knife (run under hot water, wipe dry between each slice).',
    ],
    doneness: 'Edges fully set and slightly puffed; the center 2-inch zone still has a gentle, smooth wobble when the pan is shaken. It will set completely during chilling.',
    coolingNote: 'The gradual oven cool-down (1 hour with door cracked) is the best insurance against cracking. After that, a minimum of 4 hours refrigeration is required — overnight is strongly preferred. Cheesecake keeps refrigerated for 5 days.',
    tips: [
      'Full-fat cream cheese only — reduced-fat versions have too much moisture and will not set properly',
      'All ingredients must be at room temperature — cold cream cheese will leave lumps that no amount of beating will fix',
      'Do not overbeat after adding eggs — air in the batter causes the cheesecake to puff and then crack as it deflates',
      'The water bath insulates the pan and prevents the edges from overcooking while the center catches up',
      'If your cheesecake cracks, cover it with sour cream topping, whipped cream, or fruit — no one will ever know',
    ],
  },
  icecream: {
    tempF: 350, tempC: 175, timeMin: 18, timeMax: 22,
    pan: 'Two 9-inch round cake pans for the layers; 9-inch springform for final assembly',
    nutritionNote: '⚠️ Nutrition Note: The nutritional facts shown reflect only the cake layers in this recipe. Ice cream is not tracked as an ingredient because the calories, fat, and sugar vary enormously by brand, flavor, and fat content. A standard 2-cup layer of vanilla ice cream adds roughly 550–700 calories, 30–40g of fat, and 60–80g of sugar to the whole cake. Account for this when calculating per-slice totals.',
    steps: [
      'Plan ahead — this cake requires multiple freezing stages and is best assembled over 2 days. Read all steps before starting.',
      'Bake the cake layers using any butter or oil cake recipe. Make the layers slightly thinner than usual — about 1 inch tall — so the finished cake is not too tall once the ice cream layer is added.',
      'Cool cake layers COMPLETELY. Wrap tightly in plastic wrap and freeze for at least 1 hour — frozen layers are much easier to work with and will not buckle under the weight of ice cream.',
      'Take your ice cream out of the freezer and leave at room temperature for 10–15 minutes until it is softened and spreadable but NOT melted. You want the consistency of thick peanut butter.',
      'Work quickly from this point. Place the first frozen cake layer on a parchment-lined plate or the base of the springform pan.',
      'Spread the softened ice cream over the first cake layer in an even, thick layer (about 1 inch). Work fast — if the ice cream starts to melt significantly, immediately put the whole assembly back in the freezer for 20–30 minutes before continuing.',
      'Place the second frozen cake layer on top and press gently to level.',
      'If adding additional ice cream or mousse layers, freeze the assembly for 30 minutes between each layer.',
      'Wrap the assembled cake tightly in plastic wrap and freeze for a minimum of 4 hours — overnight is strongly recommended.',
      'To unmold: remove the springform ring. If using a plate, briefly wrap the sides with a warm towel for 10 seconds to release.',
      'Frost the outside with whipped cream, additional softened ice cream, or ganache while the cake is still frozen.',
      'Return to the freezer until ready to serve. Remove the finished cake 5–10 minutes before serving. Slice with a long, sharp knife dipped in hot water and wiped dry between each cut.',
    ],
    doneness: 'Cake layers: toothpick comes out clean, top springs back when pressed. Final assembled cake: completely frozen solid — minimum 4 hours, preferably overnight.',
    coolingNote: 'This cake must stay frozen until minutes before serving. Store leftovers wrapped tightly in the freezer for up to 2 weeks. The cake layers become denser when frozen — this is normal and intentional.',
    tips: [
      'Frozen cake layers are your best friend — they stay firm while you work with the ice cream and prevent sogginess',
      'Have your freezer cleared and ready before starting — you will need to move the cake in and out quickly',
      'For cleaner layers, use an offset spatula and work fast with slightly-softened (not melted) ice cream',
      'A springform pan makes assembly and unmolding much cleaner than trying to stack layers free-form',
    ],
  },
  layer: {
    tempF: 350, tempC: 175, timeMin: 28, timeMax: 35,
    pan: 'Two or three 8–9 inch round pans, greased and lined with parchment',
    steps: [
      'Prepare all your pans before mixing the batter. Grease the sides, line the bottoms with parchment circles, and grease the parchment.',
      'Make your cake batter according to its type (butter, oil, etc.). For layer cakes, accuracy matters more — weigh ingredients if possible.',
      'Divide the batter equally between pans. The most accurate way is to use a kitchen scale — weigh each filled pan and adjust until they match exactly.',
      'Bake until a toothpick inserted in the center comes out clean. All pans will bake at the same rate if they are the same size and have the same amount of batter.',
      'Cool in the pans on a wire rack for 10–15 minutes. Run a knife around the edges, then invert onto the rack and remove the parchment.',
      'Wrap the cooled layers individually in plastic wrap. Refrigerate for at least 1 hour or freeze for 30 minutes. Cold layers are infinitely easier to level, fill, and frost — room-temperature layers crumble and slide.',
      'Level the layers: using a long serrated knife, carefully slice off any domed tops to create flat, even surfaces. A cake leveling guide or ruler helps here.',
      'Place the first layer on your serving plate or cardboard cake round. Pipe a "dam" of thick buttercream around the outer edge — this prevents fillings from squeezing out when you stack.',
      'Fill the center of the dam with filling (frosting, curd, ganache, jam). Smooth it level.',
      'Stack the next layer, pressing gently to level. Repeat for additional layers.',
      'Apply a thin "crumb coat" — a light coat of frosting over the entire outside of the cake that seals in any loose crumbs. Refrigerate for 20–30 minutes until the crumb coat is firm.',
      'Apply the final coat of frosting. Use a bench scraper and an offset spatula for smooth, professional sides. Decorate as desired.',
    ],
    doneness: 'Toothpick clean from the center; layers spring back when pressed; cake pulls slightly from the pan sides; layers should appear level when viewed from the side',
    coolingNote: 'Always work with cold cake layers. The crumb coat step before final frosting is not optional for a professional finish — it seals crumbs and gives the final coat something to grip.',
    tips: [
      'Level your layers before stacking — even a slight dome causes the whole cake to tilt and slide',
      'The buttercream dam is crucial for keeping fillings inside — do not skip it',
      'Refrigerate the crumb-coated cake before the final frost — warm crumb coats drag and pull',
      'For perfectly smooth sides, use a bench scraper held at 90° while slowly spinning the turntable',
      'A rotating cake turntable is one of the most useful investments for anyone making layer cakes regularly',
    ],
  },
  specialty: {
    tempF: 350, tempC: 175, timeMin: 25, timeMax: 30,
    pan: '9×13 pan, or deep 9-inch round pan, greased and lined',
    steps: [
      'Bake the base sponge using a butter or oil cake method appropriate to the recipe. For soaking cakes (tres leches, poke cake), a lighter, more open crumb absorbs liquid better — avoid dense batters.',
      'Immediately while the cake is still hot (within 5 minutes of coming out of the oven), prepare the soaking liquid.',
      'For poke cakes: use a thick wooden skewer or the handle of a wooden spoon to poke deep holes across the entire surface of the cake, about 1 inch apart. The holes should go all the way to the bottom.',
      'Pour about one-third of the soaking liquid slowly and evenly over the hot cake. Let it absorb for 2 minutes.',
      'Add the second third. Let absorb again. Repeat with the final third. Pouring all at once causes overflow and uneven absorption.',
      'Cover the cake loosely and refrigerate for at least 2 hours — overnight is far better. The soaking liquid redistributes through the crumb as it chills, creating an evenly moist texture throughout.',
      'For tres leches: spread the sweetened whipped cream or topping over the chilled cake just before serving — this keeps it from weeping.',
      'For mirror glaze cakes: freeze the mousse cake completely solid before glazing. Heat the glaze to exactly 90°F / 32°C. Pour in one smooth motion from the center outward, letting it run down the sides.',
      'Let any glaze set completely (10–15 minutes at room temperature or 5 minutes in the fridge) before moving or slicing the cake.',
    ],
    doneness: 'Base sponge: toothpick clean, top springs back. Soaking: cake absorbs all liquid and feels moist but not waterlogged — it should feel damp and heavy, not soggy or disintegrating.',
    coolingNote: 'Soaking cakes must rest refrigerated overnight for full flavor development. The texture and flavor improve dramatically between making and serving. Top with whipped cream, fruit, or glaze just before serving.',
    tips: [
      'Only soak while the cake is still warm — the heat opens the crumb structure and allows maximum absorption',
      'Work in stages with the soaking liquid — patience here prevents overflow and uneven distribution',
      'Mirror glazes need a frozen cake (at least 4 hours) — the temperature contrast is what creates the perfect glass-like set',
      'Refrigerate overnight before serving for the flavors to fully meld — the difference between 2 hours and overnight is dramatic',
    ],
  },
  small: {
    tempF: 350, tempC: 175, timeMin: 16, timeMax: 20,
    pan: 'Standard 12-cup muffin tin with paper or foil liners',
    steps: [
      'Preheat oven. Line the muffin tin with paper or foil liners. Foil liners hold their shape better and peel away cleanly; paper liners are fine for most recipes.',
      'Make the batter using the appropriate method for the cake type (creaming for butter-based, mix-and-fold for oil-based).',
      'Use a cookie scoop or ice cream scoop for portioning — this ensures every cupcake is exactly the same size for even baking.',
      'Fill each liner exactly 2/3 full. This is the sweet spot: less gives a flat top, more gives a muffin-top overflow.',
      'Tap the pan gently on the counter once or twice to level the batter and pop any air bubbles.',
      'Bake in the center rack. Cupcakes bake faster than full cakes — check at 16 minutes. A toothpick inserted in the center should come out clean, and the tops should spring back when lightly pressed.',
      'Let cool in the pan for exactly 5 minutes — enough for the cupcakes to firm up, but not so long that steam makes the bottoms soggy.',
      'Transfer to a wire rack and cool completely — at least 45 minutes to 1 hour. Even slightly warm cupcakes will melt buttercream on contact.',
      'Frost using a piping bag for the best result. For a classic swirl: hold the bag perpendicular to the cupcake, start at the outer edge, and pipe in a spiral toward the center, finishing with a slight upward pull.',
      'If storing before serving, refrigerate frosted cupcakes and bring to room temperature 30 minutes before serving for the best texture.',
    ],
    doneness: 'Toothpick comes out clean with no wet batter; tops spring back when pressed lightly; a slight dome should be visible; edges just beginning to pull from the liner',
    coolingNote: 'Cool completely before frosting — even slightly warm cupcakes will cause buttercream to melt and slide. If in a hurry, place them in the fridge or freezer for 10 minutes to accelerate cooling.',
    tips: [
      '2/3 full is the magic number — measure it once and you will nail it every time',
      'A cookie scoop makes perfectly uniform cupcakes that all finish baking at the same time',
      'Cool 5 minutes in the pan only — longer makes the bottoms steam and become dense',
      'Frost with a piping bag and large star tip for a bakery-quality look — it is faster and cleaner than a spatula once you practice a few',
      'Cupcakes freeze beautifully unfrosted — make a large batch, freeze, and thaw as needed',
    ],
  },
};

const ICING_DATA: Record<string, IcingData> = {
  'american-bc': {
    emoji: '🧈',
    method: 'No-cook — beat together',
    prepTime: '10–15 minutes',
    difficulty: 'Easy',
    steps: [
      'Beat softened butter on medium-high for 3–5 minutes until pale and creamy.',
      'Add powdered sugar 1 cup at a time, mixing on low until incorporated before adding more.',
      'Add cream, vanilla, and salt. Beat on medium-high for 2–3 more minutes until light and fluffy.',
      'Adjust consistency: add cream 1 tsp at a time to thin, or powdered sugar 1 tbsp at a time to thicken.',
    ],
    tips: [
      'Butter must be soft but not melted — if it looks greasy, it was too warm',
      'Beat longer for a lighter, fluffier texture',
      'Sift powdered sugar to avoid lumps',
      'Add a pinch of salt to cut the sweetness',
    ],
    application: 'Pipe or spread directly onto a cooled cake. For layer cakes, apply a thin crumb coat first, chill 20 min, then apply the final layer.',
  },
  'swiss-meringue-bc': {
    emoji: '🥚',
    method: 'Cooked meringue — double boiler',
    prepTime: '30–40 minutes',
    difficulty: 'Intermediate',
    steps: [
      'Combine egg whites and sugar in a heatproof bowl over a pot of simmering water (not touching).',
      'Whisk constantly until sugar dissolves and mixture reaches 160°F / 71°C. Test by rubbing between fingers — it should feel smooth with no sugar granules.',
      'Transfer to stand mixer and whip on high until stiff, glossy peaks form and bowl is completely cool (10–15 min).',
      'With mixer on medium, add softened butter one tablespoon at a time. If it looks curdled, keep mixing — it will come together.',
      'Add vanilla and any flavorings. Mix until silky smooth.',
    ],
    tips: [
      'The bowl must be completely cool before adding butter — warm meringue will melt it',
      'If the buttercream looks soupy or curdled, refrigerate for 15 min and re-whip',
      'Butter must be room temperature — cold butter creates lumps',
      'Less sweet than American buttercream — perfect for those who find frosting too cloying',
    ],
    application: 'Apply with an offset spatula or pipe. Holds detail well for decorating. Refrigerate decorated cake up to 3 days; bring to room temperature before serving.',
  },
  'italian-meringue-bc': {
    emoji: '🇮🇹',
    method: 'Hot sugar syrup poured into whipping egg whites',
    prepTime: '35–45 minutes',
    difficulty: 'Advanced',
    steps: [
      'Cook sugar and water in a saucepan to 240°F / 115°C (soft ball stage) — use a candy thermometer.',
      'While syrup cooks, whip egg whites to soft peaks in a stand mixer.',
      'With the mixer running on medium, slowly pour the hot syrup in a thin steady stream down the side of the bowl — avoid the whisk.',
      'Increase to high and whip until the bowl is cool to the touch and meringue is stiff and glossy (10–15 min).',
      'With mixer on medium, add butter one tablespoon at a time until fully incorporated and silky.',
    ],
    tips: [
      'Do not stop whipping while adding syrup — the stream must be slow and steady',
      'The safest between Swiss and Italian — both are excellent. Italian is slightly more stable.',
      'If it breaks, warm the bowl briefly with a torch and re-whip',
      'Excellent for decorating and piping — holds shape beautifully',
    ],
    application: 'Use immediately or refrigerate up to 1 week. Re-whip briefly after refrigerating. Pipes beautifully and holds sharp edges.',
  },
  'cream-cheese': {
    emoji: '🧀',
    method: 'No-cook — beat together',
    prepTime: '10–15 minutes',
    difficulty: 'Easy',
    steps: [
      'Beat softened cream cheese alone for 2 minutes until completely smooth with no lumps.',
      'Add softened butter and beat until fully combined and creamy.',
      'Add powdered sugar 1 cup at a time on low speed.',
      'Add vanilla and salt. Beat on medium for 1–2 minutes until light and fluffy.',
    ],
    tips: [
      'Both cream cheese and butter must be fully softened — cold cream cheese creates lumps that do not disappear',
      'Do not overbeat after adding sugar — cream cheese frosting can become runny if overworked',
      'If too soft to pipe, refrigerate for 20–30 minutes to firm up',
      'Tangy and slightly less sweet than American buttercream — pairs perfectly with carrot, red velvet, and banana cakes',
    ],
    application: 'Spread or pipe onto a completely cooled cake. Refrigerate the finished cake — cream cheese frosting must be kept cold. Remove from fridge 30 minutes before serving.',
  },
  'ganache': {
    emoji: '🍫',
    method: 'Hot cream poured over chopped chocolate',
    prepTime: '15 min + 1–2 hours setting time',
    difficulty: 'Intermediate',
    steps: [
      'Finely chop chocolate and place in a heatproof bowl.',
      'Heat cream to just below a boil — small bubbles around the edges. Do not boil.',
      'Pour hot cream over chocolate. Let sit undisturbed for 2 minutes.',
      'Stir from the center outward in slow circles until fully emulsified and glossy.',
      'For pourable glaze: use warm. For spreadable frosting: cool at room temperature 1–2 hours. For pipeable: refrigerate until set, then re-whip.',
    ],
    tips: [
      'Use good quality chocolate — the chocolate is the entire flavour here',
      'Standard ratio: 1:1 (equal parts cream and chocolate by weight) for frosting. 1:2 (more chocolate) for truffles. 2:1 (more cream) for a pourable glaze.',
      'If ganache splits (looks oily), add a splash of warm cream and stir gently',
      'Strain through a fine sieve for an ultra-smooth finish',
    ],
    application: 'Pour warm ganache over a cake set on a wire rack for a glossy drip finish. For frosting, spread or pipe cooled ganache. For a mirror shine, glaze in one smooth pour.',
  },
  'whipped-cream': {
    emoji: '☁️',
    method: 'Whip cold heavy cream',
    prepTime: '5–10 minutes',
    difficulty: 'Easy',
    steps: [
      'Chill your bowl and whisk attachment in the freezer for 15 minutes before starting.',
      'Pour cold heavy cream into the chilled bowl.',
      'Whip on medium until cream starts to thicken, then increase to medium-high.',
      'Add sugar and vanilla when soft peaks form.',
      'Continue whipping until stiff peaks — stop here. Over-whipping creates butter.',
    ],
    tips: [
      'Cold equipment and cold cream are essential — warmth prevents proper whipping',
      'Add 1–2 tsp of cornstarch or instant pudding powder to stabilize if the cake will sit out',
      'Stop at stiff peaks — just a little beyond soft peaks. Over-whipping turns cream grainy then into butter.',
      'Use immediately or refrigerate up to 2 hours',
    ],
    application: 'Dollop, spread, or pipe onto a cold cake. Serve immediately or keep refrigerated. Whipped cream weeps over time — stabilize with gelatin or cornstarch for cakes that need to hold.',
  },
  'fondant': {
    emoji: '🎨',
    method: 'Roll out and drape',
    prepTime: '30–60 minutes (plus setting time)',
    difficulty: 'Advanced',
    steps: [
      'Knead fondant until pliable and smooth. If it tears, it is too cold — warm in hands. If sticky, dust with powdered sugar.',
      'Apply a thin crumb coat of buttercream to the cake and refrigerate until firm — fondant needs something to stick to.',
      'Roll fondant on a clean surface dusted with powdered sugar or cornstarch to about 4–5mm thick.',
      'Carefully lift using a rolling pin and drape over the cake. Smooth from the top down to sides using a fondant smoother.',
      'Trim excess with a sharp knife flush to the base. Smooth any creases by working them to the bottom.',
    ],
    tips: [
      'Fondant dries out quickly — keep it covered when not working with it',
      'Colour fondant with gel food colouring, not liquid — liquid makes it sticky',
      'If you get a tear or air bubble, carefully smooth it out — small imperfections can be hidden with decorations',
      'Humidity is fondant\'s enemy — avoid working in a humid environment',
    ],
    application: 'Drape over a crumb-coated cake. Smooth with smoother tools. Decorate with additional fondant pieces, edible paint, or dusting powder. Room temperature up to 3 days.',
  },
  'specialty': {
    emoji: '✨',
    method: 'Varies by recipe — see below',
    prepTime: '15–45 minutes',
    difficulty: 'Intermediate',
    steps: [
      'For mirror glazes: prepare gelatin-based glaze and cool to 90°F / 32°C before pouring.',
      'For drip glazes: heat until pourable and test on the back of a cold spoon — adjust thickness with cream or more chocolate.',
      'For cooked frostings: follow the specific recipe closely — timing and temperature are critical.',
      'Pour or apply when at the correct temperature — too hot causes runoff, too cool causes uneven coating.',
    ],
    tips: [
      'Mirror glazes need a frozen cake to set properly — freeze at least 4 hours before glazing',
      'Drip frosting looks best applied to a cold, crumb-coated cake',
      'Work quickly with glazes — they set fast and cannot be re-applied without creating streaks',
      'Strain all glazes through a fine sieve before using for a flawless finish',
    ],
    application: 'Place cake on a wire rack over a parchment-lined tray. Pour glaze in one continuous motion from the center outward. Let set fully before moving the cake.',
  },
};

export function BakingInstructions({
  cakeTypeId, totalWeight, servings, measurementMode,
  icingTypeId, icingName, hasIcing,
}: BakingInstructionsProps) {
  const data = BAKING_DATA[cakeTypeId] || BAKING_DATA['butter'];
  const icingData = icingTypeId ? ICING_DATA[icingTypeId] : null;
  const servingWeight = servings > 0 ? totalWeight / servings : 0;

  const fmtTemp = (f: number, c: number) =>
    measurementMode === 'imperial' ? `${f}°F` : `${c}°C`;

  const fmtWeight = (g: number) =>
    measurementMode === 'imperial' ? `${(g * 0.035274).toFixed(1)} oz` : `${g.toFixed(0)} g`;

  return (
    <div className="space-y-5">

      {/* ── CAKE INSTRUCTIONS ── */}
      <div className="rounded-xl border border-orange-200 shadow-sm p-6"
           style={{ background: 'linear-gradient(135deg, #fff7ed, #fef3c7)' }}>
        <div className="flex items-center gap-2 mb-5">
          <Flame className="w-6 h-6 text-orange-700" />
          <h3 className="text-xl font-bold text-orange-900">🎂 Baking Instructions</h3>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <StatCard icon={<Flame className="w-5 h-5 text-orange-600" />}
                    label="Temperature"
                    main={fmtTemp(data.tempF, data.tempC)}
                    sub={measurementMode === 'imperial' ? `${data.tempC}°C` : `${data.tempF}°F`} />
          <StatCard icon={<Clock className="w-5 h-5 text-orange-600" />}
                    label="Baking Time"
                    main={`${data.timeMin}–${data.timeMax} min`}
                    sub="Check early" />
          <StatCard icon={<Layers className="w-5 h-5 text-orange-600" />}
                    label="Yield"
                    main={`${servings} servings`}
                    sub={servingWeight > 0 ? `~${fmtWeight(servingWeight)} each` : ''} />
        </div>

        {/* Nutrition note for ice cream cake */}
        {data.nutritionNote && (
          <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-4 flex gap-3">
            <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">{data.nutritionNote}</p>
          </div>
        )}

        {/* Pan */}
        <Section label="🥘 Recommended Pan" content={data.pan} />

        {/* Step-by-step method */}
        <div className="bg-white/70 p-4 rounded-lg mb-4">
          <div className="text-sm font-semibold text-orange-700 mb-3">📋 Step-by-Step Method</div>
          <ol className="space-y-3">
            {data.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-orange-900">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-200 text-orange-800 font-bold text-xs flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Doneness */}
        <Section label="✅ How to Tell It's Done" content={data.doneness} />

        {/* Cooling note */}
        {data.coolingNote && (
          <Section label="❄️ Cooling & Storage" content={data.coolingNote} />
        )}

        {/* Tips */}
        <TipList label="💡 Pro Tips" tips={data.tips} />
      </div>

      {/* ── ICING INSTRUCTIONS ── */}
      {hasIcing && icingData && (
        <div className="rounded-xl border border-pink-200 shadow-sm p-6"
             style={{ background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)' }}>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xl">{icingData.emoji}</span>
            <h3 className="text-xl font-bold text-pink-900">
              🧁 {icingName ? `${icingName}` : 'Icing'} Instructions
            </h3>
          </div>

          {/* Icing stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <IcingStatCard label="Method" value={icingData.method} />
            <IcingStatCard label="Prep Time" value={icingData.prepTime} />
            <IcingStatCard label="Difficulty" value={icingData.difficulty}
              valueColor={
                icingData.difficulty === 'Easy' ? 'text-green-700' :
                icingData.difficulty === 'Intermediate' ? 'text-amber-700' :
                'text-red-700'
              } />
          </div>

          {/* Step-by-step */}
          <div className="bg-white/70 p-4 rounded-lg mb-4">
            <div className="text-sm font-semibold text-pink-700 mb-3">📋 Step-by-Step</div>
            <ol className="space-y-2">
              {icingData.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-pink-900">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-200 text-pink-800 font-bold text-xs flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Application */}
          <div className="bg-white/70 p-4 rounded-lg mb-4">
            <div className="text-sm font-semibold text-pink-700 mb-1">🎂 How to Apply</div>
            <div className="text-sm text-pink-900">{icingData.application}</div>
          </div>

          {/* Tips */}
          <div className="bg-white/70 p-4 rounded-lg">
            <div className="text-sm font-semibold text-pink-700 mb-2">💡 Pro Tips</div>
            <ul className="space-y-1">
              {icingData.tips.map((tip, i) => (
                <li key={i} className="text-sm text-pink-900 flex gap-2">
                  <span className="text-pink-400 flex-shrink-0">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Placeholder when icing selected but no type data */}
      {hasIcing && !icingData && (
        <div className="rounded-xl border border-pink-200 p-6 text-center text-pink-400 text-sm"
             style={{ background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)' }}>
          🧁 Select an icing type above to see preparation instructions here.
        </div>
      )}

    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────

function Section({ label, content }: { label: string; content: string }) {
  return (
    <div className="bg-white/70 p-4 rounded-lg mb-4">
      <div className="text-sm font-semibold text-orange-700 mb-1">{label}</div>
      <div className="text-sm text-orange-800">{content}</div>
    </div>
  );
}

function TipList({ label, tips }: { label: string; tips: string[] }) {
  return (
    <div className="bg-white/70 p-4 rounded-lg">
      <div className="text-sm font-semibold text-orange-700 mb-2">{label}</div>
      <ul className="space-y-1">
        {tips.map((tip, i) => (
          <li key={i} className="text-sm text-orange-800 flex gap-2">
            <span className="text-orange-400 flex-shrink-0">•</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatCard({ icon, label, main, sub }: { icon: React.ReactNode; label: string; main: string; sub: string }) {
  return (
    <div className="bg-white/70 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm font-semibold text-orange-700">{label}</span>
      </div>
      <div className="text-2xl font-bold text-orange-900">{main}</div>
      {sub && <div className="text-xs text-orange-600 mt-1">{sub}</div>}
    </div>
  );
}

function IcingStatCard({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="bg-white/70 p-3 rounded-lg">
      <div className="text-xs font-semibold text-pink-600 mb-1">{label}</div>
      <div className={`text-sm font-bold ${valueColor ?? 'text-pink-900'} leading-tight`}>{value}</div>
    </div>
  );
}
