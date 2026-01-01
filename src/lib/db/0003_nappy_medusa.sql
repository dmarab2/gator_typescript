ALTER TABLE "feed_follows" DROP CONSTRAINT "feed_follows_name_unique";--> statement-breakpoint
ALTER TABLE "feed_follows" DROP CONSTRAINT "feed_follows_url_unique";--> statement-breakpoint
ALTER TABLE "feed_follows" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "feed_follows" DROP COLUMN "url";