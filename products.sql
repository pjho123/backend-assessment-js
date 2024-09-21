-- public.products definition

-- Drop table

-- DROP TABLE public.products;

CREATE TABLE public.products (
	id int8 NOT NULL,
	title varchar(255) NULL,
	tags varchar(255) NULL,
	created_at timestamp NULL DEFAULT now(),
	updated_at timestamp NULL DEFAULT now(),
	sku varchar(40) NULL,
	CONSTRAINT products_pkey PRIMARY KEY (id)
);
INSERT INTO public.products (id,title,tags,created_at,updated_at,sku) VALUES
	 (49692916220193,'The Complete Snowboard Electric comp-4','Premium, Snow, Snowboard, Sport, Winter','2024-06-28 09:31:00','2024-09-21 18:08:26.48393','comp-4'),
	 (49692916252961,'The Complete Snowboard Sunset comp-5','Premium, Snow, Snowboard, Sport, Winter','2024-06-28 09:31:00','2024-09-21 18:08:26.65327','comp-5'),
	 (49692916351265,'The Draft Snowboard Default Title draft-1','','2024-06-28 09:31:01','2024-09-21 18:08:26.828476','draft-1'),
	 (49692916285729,'The Hidden Snowboard Default Title hide-2','Premium, Snow, Snowboard, Sport, Winter','2024-06-28 09:31:00','2024-09-21 18:08:27.040956','hide-2'),
	 (49692916515105,'The Inventory Not Tracked Snowboard Default Title sku-untracked-1','Accessory, Sport, Winter','2024-06-28 09:31:01','2024-09-21 18:08:27.204532','sku-untracked-1'),
	 (49692916384033,'The Out of Stock Snowboard Default Title oos-1','Accessory, Sport, Winter','2024-06-28 09:31:01','2024-09-21 18:08:27.910641','oos-1'),
	 (50040694407457,'The Compare at Price Snowboard Large lar-2','Accessory, Sport, Winter','2024-07-29 00:14:32','2024-09-21 18:08:25.495225','lar-2'),
	 (49692916121889,'The Complete Snowboard Ice comp-1','Premium, Snow, Snowboard, Sport, Winter','2024-06-28 09:31:00','2024-09-21 18:08:25.664681','comp-1'),
	 (49692916154657,'The Complete Snowboard Dawn comp-2','Premium, Snow, Snowboard, Sport, Winter','2024-06-28 09:31:00','2024-09-21 18:08:25.825959','comp-2'),
	 (49692916187425,'The Complete Snowboard Powder comp-3','Premium, Snow, Snowboard, Sport, Winter','2024-06-28 09:31:00','2024-09-21 18:08:26.325012','comp-3');
