CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"description" text NOT NULL,
	"published_at" timestamp DEFAULT now() NOT NULL,
	"feed_id" uuid,
	CONSTRAINT "posts_name_unique" UNIQUE("name"),
	CONSTRAINT "posts_url_unique" UNIQUE("url"),
	CONSTRAINT "posts_description_unique" UNIQUE("description")
);
--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_feed_id_feeds_id_fk" FOREIGN KEY ("feed_id") REFERENCES "public"."feeds"("id") ON DELETE cascade ON UPDATE no action;