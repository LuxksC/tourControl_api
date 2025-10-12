CREATE TYPE "public"."user_type" AS ENUM('admin', 'athlete', 'coach', 'referee', 'staff');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"lastname" varchar(255),
	"email" varchar(255) NOT NULL,
	"gender" varchar(6) NOT NULL,
	"birth_date" date NOT NULL,
	"type" "user_type" DEFAULT 'athlete' NOT NULL,
	"phone" varchar(20),
	"cpf" varchar(14),
	"pix" varchar(255),
	"tournaments_managed_ids" varchar(255)[] DEFAULT '{}',
	"tournaments_enrolled_ids" varchar(255)[] DEFAULT '{}',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_cpf_unique" UNIQUE("cpf")
);
