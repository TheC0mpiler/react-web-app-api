import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/search", (req, res) => {
	res.json({
		books: [
			{
				goodreadsId: 1,
				title: "1984",
				authors: "Orwell",
				covers: [
					"https://fr.cdn.v5.futura-sciences.com/buildsv6/images/wide1920/8/5/4/854c15a2cc_100124_chameau-dromadaire-difference-01.jpg",
					"http://resize-parismatch.ladmedia.fr/img/var/news/storage/images/paris-match/actu/faits-divers/un-ado-mordu-et-pietine-par-un-chameau-sur-le-chemin-de-l-ecole-1208516/20459249-1-fre-FR/Un-ado-mordu-et-pietine-par-un-chameau-sur-le-chemin-de-l-ecole.jpg"
				],
				pages: 198
			},
			{
				goodreadsId: 2,
				title: "salu",
				authors: "dsqsd",
				covers: [
					"https://fr.cdn.v5.futura-sciences.com/buildsv6/images/wide1920/8/5/4/854c15a2cc_100124_chameau-dromadaire-difference-01.jpg",
					"http://resize-parismatch.ladmedia.fr/img/var/news/storage/images/paris-match/actu/faits-divers/un-ado-mordu-et-pietine-par-un-chameau-sur-le-chemin-de-l-ecole-1208516/20459249-1-fre-FR/Un-ado-mordu-et-pietine-par-un-chameau-sur-le-chemin-de-l-ecole.jpg"
				],
				pages: 198
			}
		]
	});
});
export default router;
