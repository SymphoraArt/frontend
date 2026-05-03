-- Enki Art mock data for local XAMPP database: symphora
-- Safe to re-run. Uses fixed IDs in the 1000 range and ON DUPLICATE KEY UPDATE.

USE symphora;
SET NAMES utf8mb4;

SET @creator_a = '0x4a0000000000000000000000000000000000ef21';
SET @creator_b = '0x8b0000000000000000000000000000000000cafe';
SET @buyer_a = '0x120000000000000000000000000000000000b0b0';

INSERT INTO symphora_profile (wallet, avatar_url, banner_url, bio)
VALUES
(@creator_a, NULL, NULL, 'Editorial prompts, quiet rooms, cinematic portraits, and variable-first image systems.'),
(@creator_b, NULL, NULL, 'Infographics, architecture, and product prompt editions for creative teams.'),
(@buyer_a, NULL, NULL, 'Collector and generator on Enki Art.')
ON DUPLICATE KEY UPDATE
  bio = VALUES(bio),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO symphora_users (id, wallet_addresses, profile, stats, seller_profile, specialty, created_at, updated_at, last_active)
VALUES
(1001,
 JSON_ARRAY(JSON_OBJECT('chainId', 84532, 'chain', 'Base Sepolia', 'address', @creator_a, 'isPrimary', true, 'addedAt', NOW())),
 JSON_OBJECT('username', 'mira.veil', 'displayName', 'Mira Veil', 'bio', 'Editorial prompt designer.', 'avatar', 'MV'),
 JSON_OBJECT('followers', 128, 'following', 21, 'totalGenerations', 430),
 JSON_OBJECT('verified', true, 'rating', 4.8, 'sales', 37),
 'normal', NOW(3), NOW(3), NOW(3)),
(1002,
 JSON_ARRAY(JSON_OBJECT('chainId', 84532, 'chain', 'Base Sepolia', 'address', @creator_b, 'isPrimary', true, 'addedAt', NOW())),
 JSON_OBJECT('username', 'kael.atrium', 'displayName', 'Kael Atrium', 'bio', 'Architecture and infographic prompt systems.', 'avatar', 'KA'),
 JSON_OBJECT('followers', 87, 'following', 14, 'totalGenerations', 260),
 JSON_OBJECT('verified', true, 'rating', 4.6, 'sales', 19),
 'normal', NOW(3), NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  wallet_addresses = VALUES(wallet_addresses),
  profile = VALUES(profile),
  stats = VALUES(stats),
  seller_profile = VALUES(seller_profile),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO symphora_prompts (
  id, creator, type, title, description, category, ai_settings, pricing,
  prompt_data, showcase_images, stats, created_at, updated_at, published_at, is_featured
)
VALUES
(1001, @creator_a, 'paid', 'Quiet Window, Late Afternoon',
 'A cinematic portrait prompt with editable subject, location, wardrobe, and window-light controls.',
 'portrait',
 JSON_OBJECT('aspectRatio', '3:4', 'includeText', false, 'usePromptEnhancement', true, 'model', 'Nano Banana Pro'),
 JSON_OBJECT('pricePerGeneration', 0.10),
 JSON_OBJECT(
   'segments', JSON_ARRAY(JSON_OBJECT('type', 'text', 'content', 'A photograph of [subject] in [location], [mood], lit by [lighting]. Wardrobe: [wardrobe]. Editorial, restrained, no logos.', 'order', 0)),
   'variables', JSON_ARRAY(
     JSON_OBJECT('name', 'subject', 'description', 'Main person or object', 'type', 'text', 'required', true, 'defaultValue', 'a young woman with dark hair', 'order', 0),
     JSON_OBJECT('name', 'location', 'description', 'Scene location', 'type', 'text', 'required', true, 'defaultValue', 'a small wooden room', 'order', 1),
     JSON_OBJECT('name', 'mood', 'description', 'Emotional tone', 'type', 'text', 'required', false, 'defaultValue', 'contemplative', 'order', 2),
     JSON_OBJECT('name', 'lighting', 'description', 'Lighting direction and quality', 'type', 'text', 'required', true, 'defaultValue', 'late afternoon window light', 'order', 3),
     JSON_OBJECT('name', 'wardrobe', 'description', 'Clothing and styling', 'type', 'text', 'required', false, 'defaultValue', 'natural linen, no logos', 'order', 4)
   )
 ),
 JSON_ARRAY(
   JSON_OBJECT('url', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 640"><rect width="480" height="640" fill="%232a3142"/><rect y="384" width="480" height="256" fill="%238b8d8e"/><circle cx="330" cy="290" r="58" fill="%23999" opacity=".8"/></svg>', 'thumbnail', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 640"><rect width="480" height="640" fill="%232a3142"/><rect y="384" width="480" height="256" fill="%238b8d8e"/><circle cx="330" cy="290" r="58" fill="%23999" opacity=".8"/></svg>', 'isPrimary', true)
 ),
 JSON_OBJECT('totalGenerations', 2840, 'bookmarks', 211, 'likes', 184, 'reviews', JSON_OBJECT('total', 28, 'averageRating', 4.8, 'distribution', JSON_OBJECT('5', 22, '4', 6))),
 DATE_SUB(NOW(3), INTERVAL 2 DAY), NOW(3), DATE_SUB(NOW(3), INTERVAL 2 DAY), 1),

(1002, @creator_b, 'paid', 'The Editor - Scientific Infographic',
 'A clean scientific infographic prompt for editorial spreads, data panels, and explainers.',
 'infographic',
 JSON_OBJECT('aspectRatio', '4:5', 'includeText', true, 'usePromptEnhancement', true, 'model', 'Imagen 4'),
 JSON_OBJECT('pricePerGeneration', 0.15),
 JSON_OBJECT(
   'segments', JSON_ARRAY(JSON_OBJECT('type', 'text', 'content', 'An editorial scientific infographic about [topic], using [palette], with [layout] composition and precise visual hierarchy.', 'order', 0)),
   'variables', JSON_ARRAY(
     JSON_OBJECT('name', 'topic', 'description', 'Infographic subject', 'type', 'text', 'required', true, 'defaultValue', 'climate data', 'order', 0),
     JSON_OBJECT('name', 'palette', 'description', 'Color palette', 'type', 'text', 'required', true, 'defaultValue', 'deep green, ivory, muted teal', 'order', 1),
     JSON_OBJECT('name', 'layout', 'description', 'Composition system', 'type', 'text', 'required', true, 'defaultValue', 'modular magazine spread', 'order', 2)
   )
 ),
 JSON_ARRAY(JSON_OBJECT('url', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 640"><rect width="480" height="640" fill="%231f2a1a"/><ellipse cx="240" cy="390" rx="90" ry="170" fill="%237c8c6e"/><circle cx="240" cy="235" r="42" fill="%237c8c6e" opacity=".8"/></svg>', 'thumbnail', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 640"><rect width="480" height="640" fill="%231f2a1a"/><ellipse cx="240" cy="390" rx="90" ry="170" fill="%237c8c6e"/><circle cx="240" cy="235" r="42" fill="%237c8c6e" opacity=".8"/></svg>', 'isPrimary', true)),
 JSON_OBJECT('totalGenerations', 1460, 'bookmarks', 92, 'likes', 111, 'reviews', JSON_OBJECT('total', 17, 'averageRating', 4.6, 'distribution', JSON_OBJECT('5', 12, '4', 5))),
 DATE_SUB(NOW(3), INTERVAL 3 DAY), NOW(3), DATE_SUB(NOW(3), INTERVAL 3 DAY), 1),

(1003, @creator_b, 'free', 'Concrete Cathedral',
 'A brutalist interior prompt for architectural light studies and quiet atriums.',
 'architecture',
 JSON_OBJECT('aspectRatio', '3:4', 'includeText', false, 'usePromptEnhancement', true, 'model', 'Flux 1.1 Pro'),
 NULL,
 JSON_OBJECT(
   'segments', JSON_ARRAY(JSON_OBJECT('type', 'text', 'content', 'A brutalist [space] made of concrete and glass, [lighting], empty, quiet, editorial architecture photography.', 'order', 0)),
   'variables', JSON_ARRAY(
     JSON_OBJECT('name', 'space', 'description', 'Architectural scene', 'type', 'text', 'required', true, 'defaultValue', 'cathedral lobby', 'order', 0),
     JSON_OBJECT('name', 'lighting', 'description', 'Light setup', 'type', 'text', 'required', true, 'defaultValue', 'late afternoon shafts of light', 'order', 1)
   )
 ),
 JSON_ARRAY(JSON_OBJECT('url', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 640"><rect width="480" height="640" fill="%233a1f1f"/><rect x="70" y="220" width="150" height="340" fill="%23a86b6b" opacity=".65"/><rect x="260" y="160" width="150" height="400" fill="%23a86b6b" opacity=".45"/></svg>', 'thumbnail', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 640"><rect width="480" height="640" fill="%233a1f1f"/><rect x="70" y="220" width="150" height="340" fill="%23a86b6b" opacity=".65"/><rect x="260" y="160" width="150" height="400" fill="%23a86b6b" opacity=".45"/></svg>', 'isPrimary', true)),
 JSON_OBJECT('totalGenerations', 780, 'bookmarks', 55, 'likes', 66, 'reviews', JSON_OBJECT('total', 9, 'averageRating', 4.4, 'distribution', JSON_OBJECT('5', 6, '4', 3))),
 DATE_SUB(NOW(3), INTERVAL 4 DAY), NOW(3), DATE_SUB(NOW(3), INTERVAL 4 DAY), 0),

(1004, @creator_a, 'paid', 'Boy with the Linen Shirt',
 'Soft editorial fashion portrait with camera, lens, and styling variables.',
 'fashion',
 JSON_OBJECT('aspectRatio', '4:5', 'includeText', false, 'usePromptEnhancement', true, 'model', 'Nano Banana Pro'),
 JSON_OBJECT('pricePerGeneration', 0.20),
 JSON_OBJECT(
   'segments', JSON_ARRAY(JSON_OBJECT('type', 'text', 'content', 'A fashion editorial portrait of [subject], wearing [wardrobe], shot on [lens], [composition], [lighting].', 'order', 0)),
   'variables', JSON_ARRAY(
     JSON_OBJECT('name', 'subject', 'description', 'Model description', 'type', 'text', 'required', true, 'defaultValue', 'a young man with calm expression', 'order', 0),
     JSON_OBJECT('name', 'wardrobe', 'description', 'Wardrobe', 'type', 'text', 'required', true, 'defaultValue', 'white linen shirt', 'order', 1),
     JSON_OBJECT('name', 'lens', 'description', 'Camera lens', 'type', 'text', 'required', false, 'defaultValue', '85mm f/1.8', 'order', 2),
     JSON_OBJECT('name', 'composition', 'description', 'Framing', 'type', 'text', 'required', false, 'defaultValue', 'waist-up, centered', 'order', 3),
     JSON_OBJECT('name', 'lighting', 'description', 'Light', 'type', 'text', 'required', false, 'defaultValue', 'soft key light', 'order', 4)
   )
 ),
 JSON_ARRAY(JSON_OBJECT('url', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 640"><rect width="480" height="640" fill="%232a1f3a"/><circle cx="170" cy="330" r="105" fill="%238b7ca8" opacity=".7"/><circle cx="330" cy="470" r="78" fill="%234a3a6b" opacity=".8"/></svg>', 'thumbnail', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 640"><rect width="480" height="640" fill="%232a1f3a"/><circle cx="170" cy="330" r="105" fill="%238b7ca8" opacity=".7"/><circle cx="330" cy="470" r="78" fill="%234a3a6b" opacity=".8"/></svg>', 'isPrimary', true)),
 JSON_OBJECT('totalGenerations', 2240, 'bookmarks', 133, 'likes', 176, 'reviews', JSON_OBJECT('total', 24, 'averageRating', 4.9, 'distribution', JSON_OBJECT('5', 23, '4', 1))),
 DATE_SUB(NOW(3), INTERVAL 5 DAY), NOW(3), DATE_SUB(NOW(3), INTERVAL 5 DAY), 0)
ON DUPLICATE KEY UPDATE
  creator = VALUES(creator),
  type = VALUES(type),
  title = VALUES(title),
  description = VALUES(description),
  category = VALUES(category),
  ai_settings = VALUES(ai_settings),
  pricing = VALUES(pricing),
  prompt_data = VALUES(prompt_data),
  showcase_images = VALUES(showcase_images),
  stats = VALUES(stats),
  updated_at = CURRENT_TIMESTAMP(3),
  published_at = VALUES(published_at),
  is_featured = VALUES(is_featured);

INSERT INTO symphora_generations (
  id, user_id, prompt_id, variable_values, reference_images, final_prompt,
  generated_image, used_settings, transaction_data, status, is_private,
  likes, bookmarks, created_at, completed_at
)
VALUES
(1001, @buyer_a, 1001,
 JSON_OBJECT('subject', 'a young ceramicist', 'location', 'a small wooden room', 'lighting', 'late afternoon window light'),
 JSON_ARRAY(),
 JSON_OBJECT('encrypted', 'mock-final-prompt', 'iv', 'mock', 'authTag', 'mock'),
 JSON_OBJECT('url', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 640"><rect width="480" height="640" fill="%233a2a1f"/><path d="M0 450 Q170 350 320 420 T480 390 L480 640 L0 640 Z" fill="%23a8866b"/></svg>', 'thumbnail', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 640"><rect width="480" height="640" fill="%233a2a1f"/><path d="M0 450 Q170 350 320 420 T480 390 L480 640 L0 640 Z" fill="%23a8866b"/></svg>', 'width', 480, 'height', 640, 'format', 'svg'),
 JSON_OBJECT('aspectRatio', '3:4', 'resolution', '2K'), JSON_OBJECT('chain', 'base-sepolia', 'amountUsd', 0.10), 'completed', 0, 7, 2, DATE_SUB(NOW(3), INTERVAL 1 DAY), DATE_SUB(NOW(3), INTERVAL 1 DAY))
ON DUPLICATE KEY UPDATE
  variable_values = VALUES(variable_values),
  generated_image = VALUES(generated_image),
  status = VALUES(status),
  completed_at = VALUES(completed_at);

INSERT INTO marketplace_prompts (
  id, prompt_id, seller_id, price_usd_cents, license_type, is_listed,
  listing_status, category, tags, description, total_views, total_sales,
  total_revenue_cents, average_rating, review_count, listed_at, created_at
)
VALUES
('mp-1001', '1001', @creator_a, 10, 'personal', 1, 'active', 'portrait', JSON_ARRAY('portrait', 'cinematic', 'editorial'), 'Quiet Window, Late Afternoon', 920, 18, 180, 4.80, 28, NOW(), NOW()),
('mp-1002', '1002', @creator_b, 15, 'commercial', 1, 'active', 'infographic', JSON_ARRAY('infographic', 'editorial'), 'The Editor - Scientific Infographic', 540, 12, 180, 4.60, 17, NOW(), NOW()),
('mp-1004', '1004', @creator_a, 20, 'personal', 1, 'active', 'fashion', JSON_ARRAY('fashion', 'portrait'), 'Boy with the Linen Shirt', 710, 19, 380, 4.90, 24, NOW(), NOW())
ON DUPLICATE KEY UPDATE
  seller_id = VALUES(seller_id),
  price_usd_cents = VALUES(price_usd_cents),
  listing_status = VALUES(listing_status),
  tags = VALUES(tags),
  total_views = VALUES(total_views),
  total_sales = VALUES(total_sales),
  total_revenue_cents = VALUES(total_revenue_cents),
  average_rating = VALUES(average_rating),
  review_count = VALUES(review_count);

INSERT INTO user_earnings (
  id, user_id, total_earnings_cents, total_sales, total_prompts_listed,
  pending_earnings_cents, available_earnings_cents, earnings_this_month_cents,
  earnings_this_week_cents, sales_this_month, earnings_last_7d_cents,
  earnings_last_30d_cents, sales_last_7d, sales_last_30d,
  best_selling_prompt_id, avg_sale_price_cents, conversion_rate,
  total_views, total_unlocks, last_activity_at, last_sale_at
)
VALUES
('earn-creator-a', @creator_a, 560, 37, 2, 0, 560, 260, 90, 14, 90, 260, 4, 14, '1004', 15, 0.0520, 1630, 37, NOW(), NOW()),
('earn-creator-b', @creator_b, 320, 20, 2, 0, 320, 180, 60, 8, 60, 180, 3, 8, '1002', 16, 0.0380, 1250, 20, NOW(), NOW())
ON DUPLICATE KEY UPDATE
  total_earnings_cents = VALUES(total_earnings_cents),
  total_sales = VALUES(total_sales),
  total_prompts_listed = VALUES(total_prompts_listed),
  available_earnings_cents = VALUES(available_earnings_cents),
  earnings_this_month_cents = VALUES(earnings_this_month_cents),
  earnings_this_week_cents = VALUES(earnings_this_week_cents),
  sales_this_month = VALUES(sales_this_month),
  best_selling_prompt_id = VALUES(best_selling_prompt_id),
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO prompt_purchases (
  id, prompt_id, buyer_id, seller_id, amount_usd_cents, platform_fee_cents,
  creator_earnings_cents, transaction_hash, chain_id, chain_name, status,
  payment_scheme, prompt_title, prompt_preview_image_url, purchased_at,
  created_at, completed_at
)
VALUES
('purchase-1001', '1001', @buyer_a, @creator_a, 10, 1, 9, '0xmocktx1001', 84532, 'base-sepolia', 'completed', 'exact', 'Quiet Window, Late Afternoon', NULL, DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
('purchase-1002', '1002', @buyer_a, @creator_b, 15, 2, 13, '0xmocktx1002', 84532, 'base-sepolia', 'completed', 'exact', 'The Editor - Scientific Infographic', NULL, DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY))
ON DUPLICATE KEY UPDATE
  status = VALUES(status),
  amount_usd_cents = VALUES(amount_usd_cents),
  creator_earnings_cents = VALUES(creator_earnings_cents),
  updated_at = CURRENT_TIMESTAMP;

INSERT IGNORE INTO symphora_prompt_likes (prompt_id, user_id)
VALUES
(1001, @buyer_a),
(1002, @creator_a),
(1004, @buyer_a);

INSERT IGNORE INTO symphora_follows (follower, following)
VALUES
(@buyer_a, @creator_a),
(@buyer_a, @creator_b),
(@creator_a, @creator_b);

SELECT 'Seed complete' AS status,
  (SELECT COUNT(*) FROM symphora_prompts WHERE id BETWEEN 1001 AND 1004) AS prompts_seeded,
  (SELECT COUNT(*) FROM symphora_generations WHERE id = 1001) AS generations_seeded,
  (SELECT COUNT(*) FROM user_earnings WHERE id IN ('earn-creator-a', 'earn-creator-b')) AS earnings_seeded;
