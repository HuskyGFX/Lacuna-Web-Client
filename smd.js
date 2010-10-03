YAHOO.namespace("lacuna");

if (typeof YAHOO.lacuna.SMD == "undefined" || !YAHOO.lacuna.SMD) {

(function(){
	var smd = {
		Alliance : {
			"SMDVersion":"2.0",
			"description": "Body",
			"envelope":"JSON-RPC-2.0",
			"transport":"POST",
			"target":"/body",

			"services": {
				"find" : {
					"description": "Find an alliance by name. Returns a hash reference containing alliance ids and alliance names",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"name", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"view_profile" : {
					"description": "Provides a list of the data that's publicly known about this alliance.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"alliance_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				}
			}
		},
		Body : {
			"SMDVersion":"2.0",
			"description": "Body",
			"envelope":"JSON-RPC-2.0",
			"transport":"POST",
			"target":"/body",

			"services": {
				"abandon" : {
					"description": "Abandon's a colony, and destroys everything on the planet.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"body_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"get_buildings" : {
					"description": "Retrieves a list of the buildings on a planet.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"body_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"get_buildable" : {
					"description": "Provides a list of all the building types that are available to be built on a given space on a planet.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"body_id", "type":"string", "optional":false},
						{"name":"x", "type":"string", "optional":false},
						{"name":"y", "type":"string", "optional":false},
						{"name":"tag", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"get_build_queue" : {
					"description": "Returns a list of the buildings being constructed or upgraded",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"body_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
						 {
							"build_queue" : {
								"building-id-goes-here" : {
									"seconds_remaining" : 60,
									"start" : "01 31 2010 11:08:03 +0600",
									"end" : "01 31 2010 13:09:05 +0600",
								},
								...
							},
							"status" : "get_status",
						 }
					*/
				},
				"rename" : {
					"description": "Renames a body, provided the empire attached to the session owns the body. Returns a 1 on success.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"body_id", "type":"string", "optional":false},
						{"name":"name", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				}

			}
		},
		Buildings : {
			Generic : {
				"SMDVersion":"2.0",
				"description": "Buildings",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				//Target will be passed in "target":"/buildings",

				"services": {
					"build" : {
						"description": "Adds this building to the planet's build queue.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"planet_id", "type":"string", "optional":false},
							{"name":"x", "type":"string", "optional":false},
							{"name":"y", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
					},
					"demolish" : {
						"description": "Allows you to instantly destroy a building provided it wouldn't put you into a negative resource production situation. For example, if you're producing only a net positive of 100 food per hour, and you destroy a corn field that would take away 200 food per hour, then the game won't allow you to demolish that building.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
					},
					"view" : {
						"description": "Retrieves the properties of the building.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
					},
					"upgrade" : {
						"description": "Adds the requested upgrade to the build queue. On success returns the view() method.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
					},
					"repair" : {
						"description": "Repair buildings Efficiency to 100%",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
					}
				}
			},
			Archaeology : {
				"SMDVersion":"2.0",
				"description": "Archaeology Ministry",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				"target":"/archaeology",
				
				"services": {
					"search_for_glyph" : {
						"description": "Searches through ore looking for glyphs left behind by the ancient race. Takes 10,000 of one type of ore to search.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"ore_type", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						{
							"status" : { get_status() },
							"seconds_remaining" : 10800
						 }
						*/
					},
					"get_glyphs" : {
						"description": "Returns a list of glyphs that have been found by this archaeology ministry.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"status" : { ... },
							"glyphs" : [
								{
									"id" : "id-goes-here",
									"type" : "bauxite",
								},
								...
							]
						 }
						*/
					},
					"assemble_glyphs" : {
						"description": "Turns glyphs into rare ancient items.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"ids", "type":"array", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"status" : { ... },
							"item_name" : "Volcano"
						 }
						*/
					},
					"get_ores_available_for_processing" : {
						"description": "Returns a list of ore names that the user has enough of to process for glyphs.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"status" : { ... },
							"ore" : {
								"bauxite" : 39949,
								"rutile" : 19393
							}
						 }
						*/
					}
					
				}
			},
			Development : {
				"SMDVersion":"2.0",
				"description": "Development Ministry",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				"target":"/development",
				
				"services": {
					"subsidize_build_queue" : {
						"description": "Allows a player to instantly finish any buildings in their build queue. The cost is returned by the view method.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
					}
					/*
					{
						"status" : { get_status() },
						"essentia_spent" : 8
					 }
					*/
				}
			},
			Embassy : {
				"SMDVersion":"2.0",
				"description": "Embassy",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				"target":"/embassy",
				
				"services": {
					"create_alliance" : {
						"description": "Create a new alliance. Returns the same output as get_alliance_status.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"name", "type":"string", "optional":false}
						],
						/*
						# create_alliance ( session_id, building_id, name )

							* session_id
							* building_id
							* name 
						*/
						"returns":{"type":"object"}
						/*
						 {
							"status" : { ... },
						 }
						*/
					},
					"dissolve_alliance" : {
						"description": "Can only be called by alliance leader. Disbands and existing alliance.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						/*
						# dissolve_alliance ( session_id, building_id )

							* session_id
							* building_id 
						*/
						"returns":{"type":"object"}
						/*
						 {
							"status" : { ... },
						 }
						*/
					},
					"get_alliance_status" : {
						"description": "Returns everything about an alliance that members should know.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						/*
						# get_alliance_status ( session_id, building_id )

							* session_id
							* building_id 
						*/
						"returns":{"type":"object"}
						/*
						 {
							"status" : { ... },
							"alliance" : {
								"id" : "id-goes-here",
								"name" : "United Federation of Planets",
								"members" : [
									{
										"empire_id" : "id goes here",
										"name" : "Klingons",
									}
									...
								],
								"leader_id" : "id goes here",
								"forum_uri" : "http://forum.example.com/",
								"description" : "This is public information.",
								"announcements" : "This is private information.",
								"date_created" : "01 31 2010 13:09:05 +0600"
							 }
						 }
						*/
					},
					"send_invite" : {
						"description": "Can only be called by alliance leader. Invite an empire to an alliance.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"invitee_id", "type":"string", "optional":false},
							{"name":"message", "type":"string", "optional":true}
						],
						/*
						# send_invite ( session_id, building_id, invitee_id, [ message ] )

							* session_id
							* building_id
							* invitee_id
							* message 
						*/
						"returns":{"type":"object"}
						/*
						 {
							"status" : { ... },
						 }
						*/
					},
					"withdraw_invite" : {
						"description": "Can only be called by alliance leader. Delete an invitation.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"invite_id", "type":"string", "optional":false},
							{"name":"message", "type":"string", "optional":true}
						],
						/*
						# withdraw_invite ( session_id, building_id, invite_id, [ message ] )

							* session_id
							* building_id
							* invite_id
							* message 
						*/
						"returns":{"type":"object"}
						/*
						 {
							"status" : { ... },
						 }
						*/
					},
					"accept_invite" : {
						"description": "Accept an invitation. Returns the same output as get_alliance_status.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"invite_id", "type":"string", "optional":false},
							{"name":"message", "type":"string", "optional":true}
						],
						/*
						# accept_invite ( session_id, building_id, invite_id, [ message ] )

							* session_id
							* building_id
							* invite_id
							* message 
						*/
						"returns":{"type":"object"}
						/*
						 {
							"get_alliance_status" : { ... },
						 }
						*/
					},
					"reject_invite" : {
						"description": "Delete an invitation.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"invite_id", "type":"string", "optional":false},
							{"name":"message", "type":"string", "optional":true}
						],
						/*
						# reject_invite ( session_id, building_id, invite_id, [ message ] )

							* session_id
							* building_id
							* invite_id
							* message 
						*/
						"returns":{"type":"object"}
						/*
						 {
							"status" : { ... },
						 }
						*/
					},
					"get_pending_invites" : {
						"description": "Can only be called by the alliance leader. Returns a list of invitations that have been sent out, but that have not been accepted, rejected, or withdrawn.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						/*
						# get_pending_invites ( session_id, building_id )

							* session_id
							* building_id 
						*/
						"returns":{"type":"object"}
						/*
						 {
							"status" : { ... },
							"invites" : [
								{
									"id" : "id-goes-here",
									"name" : "The Borg",
									"empire_id" : "id-goes-here"
								},
								...
							]
						 }
						*/
					},
					"get_my_invites" : {
						"description": "Returns a list of invitations that have been offered to this empire.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						/*
						# get_my_invites ( session_id, building_id )

							* session_id
							* building_id 
						*/
						"returns":{"type":"object"}
						/*
						 {
							"status" : { ... },
							"invites" : [
								{
									"id" : "id-goes-here",
									"name" : "United Federation of Planets",
									"alliance_id" : "id-goes-here"
								},
								...
							]
						 }
						*/
					},
					"assign_alliance_leader" : {
						"description": "Sets a new empire to lead the alliance. Can only be called by the current alliance leader. Returns the same thing as get_alliance_status.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"new_leader_id", "type":"string", "optional":false}
						],
						/*
						# assign_alliance_leader ( session_id, building_id, new_leader_id )

							* session_id
							* building_id
							* new_leader_id 
						*/
						"returns":{"type":"object"}
						/*
						 {
							"get_alliance_status" : { ... },
						 }
						*/
					},
					"update_alliance" : {
						"description": "Updates the properties of an alliance. Returns the same thing as get_alliance_status. Can only be called by the alliance leader.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"params", "type":"object", "optional":false}
						],
						/*
						# update_alliance ( session_id, building_id, params )

							* session_id
							* building_id
							* params 
								- forum_uri
								- description
								- announcements
						*/
						"returns":{"type":"object"}
						/*
						 {
							"get_alliance_status" : { ... },
						 }
						*/
					},
					"leave_alliance" : {
						"description": "A member of an alliance revokes their own membership.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"message", "type":"string", "optional":true}
						],
						/*
						# leave_alliance ( session_id, building_id, [ message ] )

							* session_id
							* building_id
							* message 
						*/
						"returns":{"type":"object"}
						/*
						 {
							"status" : { ... },
						 }
						*/
					},
					"expel_member" : {
						"description": "Forcibly removes a member from an alliance. Returns the same thing as get_alliance_status. Can only be called by the alliance leader.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"empire_id", "type":"string", "optional":false},
							{"name":"message", "type":"string", "optional":true}
						],
						/*
						# expel_member ( session_id, building_id, empire_id, [ message ] )

							* session_id
							* building_id
							* empire_id
							* message 
						*/
						"returns":{"type":"object"}
						/*
						 {
							"get_alliance_status" : { ... },
						 }
						*/
					}
				}
			},
			Intelligence : {
				"SMDVersion":"2.0",
				"description": "Intelligence",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				"target":"/intelligence",

				"services": {
					"train_spy" : {
						"description": "Allows you to train more spies",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"quantity", "type":"number", "optional":true}
						],
						"returns":{"type":"object"}
						/*
						 {
							"status" : { get_status() },
							"trained" : 3,
							"not_trained" : 2
						 }
						*/
					},
					"view_spies" : {
						"description": "Returns the list of spies you have on your roster.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"page_number", "type":"number", "optional":true}
						],
						"returns":{"type":"object"}
						/*
						 {
							"status" : { get_status() },
							"spies" : {
								"id-goes-here" : {
									"assignment" : "Idle",
									"assigned_to" : {
										"body_id" : "id-goes-here",
										"name" : "Earth",
									},
									"is_available" : 1, # can be reassigned
									"available_on" : "01 31 2010 13:09:05 +0600" # if can't be reassigned, this is when will be available
								},
								...
							}
						 }
						*/
					},
					"burn_spy" : {
						"description": "Allows you to eliminate one of your spies from your payroll.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"spy_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"status" : { get_status() },
						 }
						*/
					},
					"assign_spy" : {
						"description": "Set a spy on a new task.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"spy_id", "type":"string", "optional":false},
							{"name":"assignment", "type":"string", "optional":false} // "Idle", "Counter Intelligence", "Sting"
						],
						"returns":{"type":"object"}
					},
					"name_spy" : {
						"description": "Set the name of the spy",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"spy_id", "type":"string", "optional":false},
							{"name":"name", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
					}
				}
			},
			Mining : {
				"SMDVersion":"2.0",
				"description": "Mining Ministry",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				"target":"/miningministry",

				"services": {
					"view_platforms" : {
						"description": "Returns a list of the mining platforms currently controlled by this ministry.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"status" : { ... },
							"max_platforms" : 1,
							"platforms" : [
								{
									"id" : "id-goes-here",
									"asteroid" : {
										"id" : "id-goes-here",
										"name" : "Kuiper"
									},
									"rutile_hour" : 10,
									"chromite_hour" : 10,
									"chalcopyrite_hour" : 10,
									"galena_hour" : 10,
									"gold_hour" : 10,
									"uraninite_hour" : 10,
									"bauxite_hour" : 10,
									"goethite_hour" : 10,
									"halite_hour" : 10,
									"gypsum_hour" : 10,
									"trona_hour" : 10,
									"kerogen_hour" : 10,
									"methane_hour" : 10,
									"anthracite_hour" : 10,
									"sulfur_hour" : 10,
									"zircon_hour" : 10,
									"monazite_hour" : 10,
									"fluorite_hour" : 10,
									"beryl_hour" : 10,
									"magnetite_hour" : 10,  
									"production_capacity" : 100, # expressed as a percentage
									"shipping_capacity" : 51 # expressed as a percentage
								},
								...
							]
						 }
						*/
					},
					"view_ships" : {
						"description": "Shows you the ships that are working in the mining fleet, and available to work in the mining fleet.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"ships" : [
								{
									"name" : "CS4",
									"id" : "id-goes-here",
									"task" : "Mining",
									"speed" : 350,
									"hold_size" : 5600
								},
								...
							],
							"status" : { ... }
						 }
						*/
					},
					"add_cargo_ship_to_fleet" : {
						"description": "Take a cargo ship from the space port and add it to the mining fleet.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"ship_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"} //status
					},
					"remove_cargo_ship_from_fleet" : {
						"description": "Tell one of the cargo ships in the mining fleet to come home and park at the space port.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"ship_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"} //status
					},
					"abandon_platform" : {
						"description": "Close down an existing mining platform.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"asteroid_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"} //status
					}
				}
			},
			Network19 : {
				"SMDVersion":"2.0",
				"description": "Network19",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				"target":"/network19",

				"services": {
					"restrict_coverage" : {
						"description": "You can enact or disband a policy to restrict what Network 19 covers about your planet. Restricting coverage does make your citizens unhappy.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"onoff", "type":"number", "optional":false} // 0 or 1
						],
						"returns":{"type":"object"}
					},
					"view_news" : {
						"description": "Get the top 100 headlines from your region of space. It also returns a list of RSS feeds that can be used outside the game to see the same news in a given region.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"news" : [
								{
									"headline" : "HCorp founded a new colony on Rigel 4.",
									"date" : "01 31 2010 13:09:05 +0600"
								},
								...
							],
							"feeds" : [
								'http://feeds.game.lacunaexpanse.com/78d5e7b2-b8d7-317c-b244-3f774264be57.rss'
							],
							"status" : { get_status() }
						 }
						*/
					}
				}
			},
			Observatory : {
				"SMDVersion":"2.0",
				"description": "Observatory",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				"target":"/observatory",

				"services": {
					"abandon_probe" : {
						"description": "The probe is deactivated, and allowed to burn up in the star.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"star_id", "type":"number", "optional":false}
						],
						"returns":{"type":"object"} // status
					},
					"get_probed_stars" : {
						"description": "Returns a list of the stars that have been probed by this planet.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"page_number", "type":"number", "optional":false}
						],
						"returns":{"type":"object"}
						/*
							 {
									"status" : { get_status() },
									"stars" : [
											"color" : "yellow",
											"name" : "Sol",
											"x" : 17,
											"y" : 4,
											"z" : -3,
											"alignments" : "self-hostile"
									]       
							 }
						*/
					}
				}
			},
			Park : {
				"SMDVersion":"2.0",
				"description": "Park",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				"target":"/park",

				"services": {
					"throw_a_party" : {
						"description": "Initiates a party. It will cost you 10,000 food, and the party will last for a day. For 10,000 food you'll get 3,000 happiness. For each type of food available in quantities of 500 or more, you'll get a multiplier added to that. So if you have 4 types of food, you'll get 12,000 happiness. In addition, you get a 0.3 to your multiplier for each level of park that you have. Therefore a level 10 park is the same as adding three extra foods to your party!",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"} // status
					}
				}
			},
			Recycler : {
				"SMDVersion":"2.0",
				"description": "Waste Recycler",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				"target":"/wasterecycling",
				
				"services": {
					"recycle" : {
						"description": "Converts waste into water, ore, and energy. You can choose which amounts of each you want, so long as their total does not go over the amount of waste you have on hand. For each unit of waste converted, the recycling center will take 1 second to complete the recycling process. However, the amount of time is reduced a bit by the level of the Recycling Center.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"water", "type":"number", "optional":false},
							{"name":"ore", "type":"number", "optional":false},
							{"name":"energy", "type":"number", "optional":false},
							{"name":"use_essentia", "type":"number", "optional":false}
						],
						"returns":{"type":"object"}
					},
					"subsidize_recycling" : {
						"description": "Will spend 2 essentia to complete the current recycling job immediately.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
					}
				}
			},
			Security : {
				"SMDVersion":"2.0",
				"description": "Security",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				"target":"/security",

				"services": {
					"view_prisoners" : {
						"description": "Displays a list of the spies that have been captured.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"page_number", "type":"number", "optional":true}
						],
						"returns":{"type":"object"}
						/*
						 {
							"status" : { ... },
							"prisoners" : [
								{
									"id" : "id-goes-here",
									"name" : "James Bond",
									"level" : "20",
									"sentence_expires" : "01 31 2010 13:09:05 +0600"
								},
								...
							]
						 }
						*/
					},
					"execute_prisoner" : {
						"description": "You may choose to execute a prisoner rather than letting him serve his sentence and be released. However, that will cost you 10,000 times the prisoner's level in happiness from your planet. So a level 11 prisoner would cost you 110,000 happiness.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"prisoner_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
					},
					"release_prisoner" : {
						"description": "You may choose to release a prisoner by calling this method.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"prisoner_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
					},
					"view_foreign_spies" : {
						"description": "Displays a list of the spies that are on your planet, and have a level lower than your security ministry.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"page_number", "type":"number", "optional":true}
						],
						"returns":{"type":"object"}
						/*
						 {
							"status" : { ... },
							"spies" : [
								{
									"name" : "James Bond",
									"level" : 11,
									"next_mission" : "01 31 2010 13:09:05 +0600"
								},
								...
							]
						 }
						*/
					}
				}
			},
			Shipyard : {
				"SMDVersion":"2.0",
				"description": "Shipyard",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				"target":"/shipyard",

				"services": {
					"view_build_queue" : {
						"description": "Retrieves what is already being built at this shipyard.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"page_number", "type":"number", "optional":true}
						],
						"returns":{"type":"object"}
					},
					"subsidize_build_queue" : {
						"description": "Will spend 1 essentia per ship to complete the current build queue immediately.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
					},
					"get_buildable" : {
						"description": "Returns a list of buildable ships and their costs, and if they're not buildable, gives a reason why not in the form of an exception.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
							 {
								"buildable" : {
									"probe" : {
										"can" : 1,             # can it be built or not
										"reason" : null,       # if it can't an array ref will be here with the exception for why not
										"cost" : {
											"seconds" : 900,
											"food" : 1100,
											"water" : 1000,
											"energy" : 1200,
											"ore" : 1200,
											"waste" : 100,
										},
										attributes : {
											"speed" : 1000,    # 100 roughly equals 1 star in 1 hour
										}
									},
									...
								},
								"docks_available" : 7,         # you can only build ships up to the number of docks you have available
								"status" : { get_status() },
							 }
						*/
					},
					"build_ship" : {
						"description": "Adds a ship to the build queue.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"type", "type":"string", "optional":false}, //'probe','colony_ship','spy_pod','cargo_ship','space_station','smuggler_ship','mining_platform_ship','terraforming_platform_ship', or 'gas_giant_settlement_ship'
							{"name":"quantity", "type":"number", "optional":false}
						],
						"returns":{"type":"object"}
						/*
							 {
								"ship_build_queue" : {
									"next_completed" : "01 31 2010 13:09:05 +0600",
									"queue" : [
										{
										   "type" : "probe",
										   "seconds_each" : 120,
										   "quantity" : 12
										},
										...
									]
								},
								"status" : { get_status() }
							 }
						*/
					}
				}				
			},
			SpacePort : {
				"SMDVersion":"2.0",
				"description": "SpacePort",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				"target":"/spaceport",

				"services": {
					"prepare_fetch_spies" : {
						"description": "Gathers the information needed to call the fetch_spies method",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"on_body_id", "type":"string", "optional":false},
							{"name":"to_body_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
							{
								"status" : { ... },
								"ships" : [
									{
										"id" : "id-goes-here",
										"name" : "CS4",
										"hold_size" : 1100,
										"speed" : 400,
										"type" : "cargo_ship",
										...
									},
									...
								],
								"spies" : [
									{
										"id" : "id-goes-here",
										"level" : 12,
										"name" : "Jack Bauer",
										"assigned_to" : {
										"body_id" : "id-goes-here",
										"name" : "Earth"
										},
										...
									},
									...
								]
							}
						*/
					},
					"fetch_spies" : {
						"description": "Sends a specified ship to fetch specified spies from on_body_id, and bring them back to to_body_id. See also prepare_fetch_spies",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"on_body_id", "type":"string", "optional":false},
							{"name":"to_body_id", "type":"string", "optional":false},
							{"name":"ship_id",    "type":"string", "optional":false},
							{"name":"spy_ids",    "type":"array",  "optional":false}
						],
						"returns":{"type":"object"}
						/*
							{
								"ship" : {
									"id" : "id-goes-here",
									"name" : "CS4",
									"hold_size" : 1100,
									"speed" : 400,
									"type" : "cargo_ship",
									"date_arrives" : "01 31 2010 13:09:05 +0600",
									...
								},
								"status" : { ... }
							}
						*/
					},
					"prepare_send_spies" : {
						"description": "Gathers the information needed to call the send_spies method.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"on_body_id", "type":"string", "optional":false},
							{"name":"to_body_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
							{
								"status" : { ... },
								"ships" : [
									{
										"id" : "id-goes-here",
										"name" : "CS4",
										"hold_size" : 1100,
										"speed" : 400,
										"type" : "cargo_ship",
										...
									},
									...
								],
								"spies" : [
									{
										"id" : "id-goes-here",
										"level" : 12,
										"name" : "Jack Bauer",
										"assigned_to" : {
										"body_id" : "id-goes-here",
										"name" : "Earth"
										},
										...
									},
									...
								]
							}
						*/
					},
					"send_spies" : {
						"description": "Sends one or more of spies to a planet using a selected ship. See also prepare_send_spies.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"on_body_id", "type":"string", "optional":false},
							{"name":"to_body_id", "type":"string", "optional":false},
							{"name":"ship_id",    "type":"string", "optional":false},
							{"name":"spy_ids",    "type":"array",  "optional":false}
						],
						"returns":{"type":"object"}
						/*
							{
								"ship" : {
									"id" : "id-goes-here",
									"name" : "CS4",
									"hold_size" : 1100,
									"speed" : 400,
									"type" : "cargo_ship",
									"date_arrives" : "01 31 2010 13:09:05 +0600",
									...
								},
								"spies_sent" : ["id-goes-here","id-goes-here","id-goes-here"],
								"spies_not_sent" : ["id-goes-here","id-goes-here","id-goes-here"],
								"status" : { ... }
							}
						 * 
						*/
					},

					"get_ships_for" : {
						"description": "Provides a list of incoming ships and ships that are available to send to a specific target. Use with send_ship.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"from_body_id", "type":"string", "optional":false},
							{"name":"target", "type":"object", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						{
							"incoming" : [
								{
									"id" : "id-goes-here",
									"name" : "P13",
									"type_human" : "Probe",
									"type" : "probe",
									"task" : "Travelling",
									"speed" : "1200",
									"stealth" : "0",
									"hold_size" : "0",
									"date_started" : "01 31 2010 13:09:05 +0600",
									"date_available" : "02 01 2010 10:08:33 +0600",
									"date_arrives" : "02 01 2010 10:08:33 +0600",
									"from" : {
									   "id" : "id-goes-here",
									   "type" : "body",
									   "name" : "Earth"
									},
									"to" : {
									   "id" : "id-goes-here",
									   "type" : "star",
									   "name" : "Sol"
									}
								},
								...
							],
							"available" : [
								{
									"id" : "id-goes-here",
									"name" : "D13",
									"type_human" : "Detonator",
									"type" : "detonator",
									"task" : "Docked",
									"speed" : "700",
									"stealth" : "0",
									"hold_size" : "0",
									"date_started" : "01 31 2010 13:09:05 +0600",
									"date_available" : "01 31 2010 13:09:05 +0600"
								},
								...
							],
							"mining_platforms" : [
								{
									empire_id   =>  "id-goes-here",
									empire_name => "The Peeps From Across The Street"
								},
								...
							],
							"status" : { ... }
						 }
						*/
					},
					"name_ship" : {
						"description": "Set the name of a ship.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"ship_id", "type":"string", "optional":false},
							{"name":"name", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						* session_id
						* building_id
						* ship_id
						* name 
						*/
					},
					"scuttle_ship" : {
						"description": "Destroy a ship that you no longer need. It must be docked to scuttle it.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"ship_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
					},
					"send_ship" : {
						"description": "Sends a ship to a specified body or star. Use with get_ships_for.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"ship_id", "type":"string", "optional":false},
							{"name":"target", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"status" : { ... },
							"ship" : {
								"id" : "id-goes-here",
								"name" : "P13",
								"type_human" : "Probe",
								"type" : "probe",
								"task" : "Travelling",
								"speed" : "1200",
								"stealth" : "0",
								"hold_size" : "0",
								"date_started" : "01 31 2010 13:09:05 +0600",
								"date_available" : "02 01 2010 10:08:33 +0600",
								"date_arrives" : "02 01 2010 10:08:33 +0600",
								"from" : {
								   "id" : "id-goes-here",
								   "type" : "body",
								   "name" : "Earth"
								},
								"to" : {
								   "id" : "id-goes-here",
								   "type" : "star",
								   "name" : "Sol"
								}
							}  
						 }
						*/
					},
					"view_all_ships" : {
						"description": "Returns a list of all ships",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"page_number", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"ships" : [
								{
									"name" : "CS4",
									"id" : "id-goes-here",
									"task" : "Mining",
									"speed" : 350,
									"hold_size" : 5600
									"type" : "cargo_ship",
								},
								...
							],
							"number_of_ships" : 13,
							"status" : { ... }
						 }
						*/
					},
					"view_foreign_ships" : {
						"description": "Shows you all the foreign ships that are incoming. However, the list is filtered by the stealth of the ship vs the level of the SpacePort.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"page_number", "type":"number", "optional":true}
						],
						"returns":{"type":"object"}
						/*
							 {
								"ships" : [
									{
										"id" : "id-goes-here",
										"name" : "CS3",
										"type_human" : "Cargo Ship",
										"type" : "cargo_ship",
										"date_arrives" : "02 01 2010 10:08:33 +0600",
										"from" : {
											"id" : "id-goes-here",
											"name" : "Earth",
											"empire" : {
												"id" : "id-goes-here",
												"name" : "Earthlings"
											}
										}
									},
									...
								],
								"number_of_ships" : 13,
								"status" : { ... }
							 }
						*/
					},
					"view_ships_travelling" : {
						"description": "Returns a list of the ships that are travelling to or from this planet. NOTE: All inbound/outbound ships are shown regardless of which space port they will eventually land at.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"page_number", "type":"number", "optional":true}
						],
						"returns":{"type":"object"}
						/*
						 {
							"status" : { get_status() },
							"number_of_ships_travelling" : 30,
							"ships_travelling" : [
							   {
								   "id" : "id-goes-here",
								   "ship_type" : "probe",
								   "date_arrives" : "01 31 2010 13:09:05 +0600",
								   "from" : {
									   "id" : "id-goes-here",
									   "type" : "body",
									   "name" : "Earth",
								   },
								   "to" : {
									   "id" : "id-goes-here",
									   "type" : "star",
									   "name" : "Sol",
								   }
							   },
							   ...
							]
						 }
						*/
					}

				}
			},
			Trade : {
				"SMDVersion":"2.0",
				"description": "Trade",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				"target":"/trade",

				"services": {
					"add_trade" : {
						"description": "Queues a trade for others to see. In addition to anything offered in your trade, setting up the trade will cost you 1 essentia.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"offer", "type":"object", "optional":false},
							{"name":"ask", "type":"object", "optional":false}
						],
						/*
					* add_trade ( session_id, building_id, offer, ask )
						  o session_id
						  o building_id
						  o offer
								+ type
								+ quantity
								+ ship_id
								+ glyph_id
								+ prisoner_id
								+ plan_id 
						  o ask
								+ type = water, energy, waste, essentia, bean, lapis, potato, apple, root, corn, cider, wheat, bread, soup, chip, pie, pancake, milk, meal, algae, syrup, fungus, burger, shake, beetle, rutile, chromite, chalcopyrite, galena, gold, uraninite, bauxite, goethite, halite, gypsum, trona, kerogen, methane, anthracite, sulfur, zircon, monazite, fluorite, beryl, or magnetite
								+ quantity 
						*/
						"returns":{"type":"object"}
						/*
						 {
							"trade_id" : "id-goes-here",
							"status" : { ... },
						 }
						*/
					},
					"get_ships" : {
						"description": "Returns a list of ships that may be traded. Used with the add_trade method.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"ships" : [
								{
									"id" : "id-goes-here",
									"name" : "Enterprise",
									"type" : "probe",
									"hold_size" : 0,
									"speed" : 3900
								},
								...
							],
							"cargo_space_used_each" : 10000,
							"status" : { ... }
						 }
						*/
					},
					"get_prisoners" : {
						"description": "Returns a list of prisoners that may be traded. Used with the add_trade method.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"prisoners" : [
								{
									"id" : "id-goes-here",
									"name" : "Jack Bauer",
									"level" : "5"
								},
								...
							],
							"cargo_space_used_each" : 100,
							"status" : { ... }
						 }
						*/
					},
					"get_plans" : {
						"description": "Returns a list of plans that may be traded. Used with the add_trade method.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"plans" : [
								{
									"id" : "id-goes-here",
									"name" : "Intelligence Ministry",
									"level" : "7",
									"extra_build_level" : "0"        # some special plans will build a building from their level all the way to this number
								},
								...
							],
							"cargo_space_used_each" : 100,
							"status" : { ... }
						 }
						*/
					},
					"get_glyphs" : {
						"description": "Returns a list of glyphs that may be traded. Used with the add_trade method.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"glyphs" : [
								{
									"id" : "id-goes-here",
									"type" : "bauxite"
								},
								...
							],
							"cargo_space_used_each" : 100,
							"status" : { ... }
						 }
						*/
					},
					"withdraw_trade" : {
						"description": "Remove a trade that you have offered and collect the items up for trade.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"trade_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
					},
					"accept_trade" : {
						"description": "Accept a trade offer from the list of available trades. In addition to paying whatever the asking price is, the subspace transporter uses 1 essentia to complete the transaction. See view_available_trades.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"trade_id", "type":"string", "optional":false},
							{"name":"captcha_guid", "type":"string", "optional":false},
							{"name":"captcha_solution", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
					},
					"view_available_trades" : {
						"description": "Displays a list of trades available at the present time.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"page_number", "type":"number", "optional":true}
						],
						"returns":{"type":"object"}
						/*
						 {
							"trades" : [
								{
									"date_offered" : "01 31 2010 13:09:05 +0600",
									"id" : "id-goes-here",
									"ask_type" : "bauxite",
									"ask_quantity" : 10000,
									"ask_description" : "10000 Bauxite",
									"offer_type" : "prisoner",
									"offer_quantity" : 1,
									"offer_description" : "Spy Named Jack Bauer (Level: 21)"
								},
								...
							],
							"trade_count" : 1047,
							"page_number" : 1,
							"captcha" : {
								"guid" : "id-goes-here",
								"url" : "https://url.to.image.goes.here/captcha.png"
							},
							"status" : { ... }
						 }
						*/
					},
					"view_my_trades" : {
						"description": "Displays a list of trades the current user has posted.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"page_number", "type":"number", "optional":true}
						],
						"returns":{"type":"object"}
						/*
						 {
							"trades" : [
								{
									"date_offered" : "01 31 2010 13:09:05 +0600",
									"id" : "id-goes-here",
									"ask_type" : "bauxite",
									"ask_quantity" : 10000,
									"ask_description" : "10000 Bauxite",
									"offer_type" : "prisoner",
									"offer_quantity" : 1,
									"offer_description" : "Spy Named Jack Bauer (Level: 21)"
								},
								...
							],
							"trade_count" : 17,
							"page_number" : 1,
							"status" : { ... }
						 }
						*/
					},
					"get_stored_resources" : {
						"description": "Returns a list of the resources you have stored to make it easier to identify what you want to trade.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"status" : { ... },
							"cargo_space_used_each" : 100,
							"resources" : {
									"water" : 14000,
									"waste" : 393,
									"bauxite" : 47,
									"cheese" : 1193,
									...
							}
						 }
						*/
					},
					"push_items" : {
						"description": "",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"target_id", "type":"string", "optional":false},
							{"name":"items", "type":"object", "optional":false}
						],
						/*
							items array of objects
								resouce format = {
									"type" : "bauxite", //allowed = water, energy, waste, essentia, bean, lapis, potato, apple, root, corn, cider, wheat, bread, soup, chip, pie, pancake, milk, meal, algae, syrup, fungus, burger, shake, beetle, rutile, chromite, chalcopyrite, galena, gold, uraninite, bauxite, goethite, halite, gypsum, trona, kerogen, methane, anthracite, sulfur, zircon, monazite, fluorite, beryl, or magnetite
									"quantity" : 10000
								 }
								 plan format =  {
									"type" : "plan",
									"plan_id" : "id-goes-here"
								 }
								 glyph format =  {
									"type" : "glyph",
									"glyph_id" : "id-goes-here"
								 }
						*/
						"returns":{"type":"object"}
						/*
						*/
					}
				}
			},
			Transporter : {
				"SMDVersion":"2.0",
				"description": "Transporter",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				"target":"/transporter",

				"services": {
					"add_trade" : {
						"description": "Queues a trade for others to see. In addition to anything offered in your trade, setting up the trade will cost you 1 essentia.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"offer", "type":"object", "optional":false},
							{"name":"ask", "type":"object", "optional":false}
						],
						/*
					* add_trade ( session_id, building_id, offer, ask )
						  o session_id
						  o building_id
						  o offer
								+ type
								+ quantity
								+ ship_id
								+ glyph_id
								+ prisoner_id
								+ plan_id 
						  o ask
								+ type = water, energy, waste, essentia, bean, lapis, potato, apple, root, corn, cider, wheat, bread, soup, chip, pie, pancake, milk, meal, algae, syrup, fungus, burger, shake, beetle, rutile, chromite, chalcopyrite, galena, gold, uraninite, bauxite, goethite, halite, gypsum, trona, kerogen, methane, anthracite, sulfur, zircon, monazite, fluorite, beryl, or magnetite
								+ quantity 
						*/
						"returns":{"type":"object"}
						/*
						 {
							"trade_id" : "id-goes-here",
							"status" : { ... },
						 }
						*/
					},
					"get_ships" : {
						"description": "Returns a list of ships that may be traded. Used with the add_trade method.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"ships" : [
								{
									"id" : "id-goes-here",
									"name" : "Enterprise",
									"type" : "probe",
									"hold_size" : 0,
									"speed" : 3900
								},
								...
							],
							"cargo_space_used_each" : 10000,
							"status" : { ... }
						 }
						*/
					},
					"get_prisoners" : {
						"description": "Returns a list of prisoners that may be traded. Used with the add_trade method.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"prisoners" : [
								{
									"id" : "id-goes-here",
									"name" : "Jack Bauer",
									"level" : "5"
								},
								...
							],
							"cargo_space_used_each" : 100,
							"status" : { ... }
						 }
						*/
					},
					"get_plans" : {
						"description": "Returns a list of plans that may be traded. Used with the add_trade method.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"plans" : [
								{
									"id" : "id-goes-here",
									"name" : "Intelligence Ministry",
									"level" : "7",
									"extra_build_level" : "0"        # some special plans will build a building from their level all the way to this number
								},
								...
							],
							"cargo_space_used_each" : 100,
							"status" : { ... }
						 }
						*/
					},
					"get_glyphs" : {
						"description": "Returns a list of glyphs that may be traded. Used with the add_trade method.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"glyphs" : [
								{
									"id" : "id-goes-here",
									"type" : "bauxite"
								},
								...
							],
							"cargo_space_used_each" : 100,
							"status" : { ... }
						 }
						*/
					},
					"withdraw_trade" : {
						"description": "Remove a trade that you have offered and collect the items up for trade.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"trade_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
					},
					"accept_trade" : {
						"description": "Accept a trade offer from the list of available trades. In addition to paying whatever the asking price is, the subspace transporter uses 1 essentia to complete the transaction. See view_available_trades.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"trade_id", "type":"string", "optional":false},
							{"name":"captcha_guid", "type":"string", "optional":false},
							{"name":"captcha_solution", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
					},
					"view_available_trades" : {
						"description": "Displays a list of trades available at the present time.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"page_number", "type":"number", "optional":true}
						],
						"returns":{"type":"object"}
						/*
						 {
							"trades" : [
								{
									"date_offered" : "01 31 2010 13:09:05 +0600",
									"id" : "id-goes-here",
									"ask_type" : "bauxite",
									"ask_quantity" : 10000,
									"ask_description" : "10000 Bauxite",
									"offer_type" : "prisoner",
									"offer_quantity" : 1,
									"offer_description" : "Spy Named Jack Bauer (Level: 21)"
								},
								...
							],
							"trade_count" : 1047,
							"page_number" : 1,
							"captcha" : {
								"guid" : "id-goes-here",
								"url" : "https://url.to.image.goes.here/captcha.png"
							},
							"status" : { ... }
						 }
						*/
					},
					"view_my_trades" : {
						"description": "Displays a list of trades the current user has posted.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"page_number", "type":"number", "optional":true}
						],
						"returns":{"type":"object"}
						/*
						 {
							"trades" : [
								{
									"date_offered" : "01 31 2010 13:09:05 +0600",
									"id" : "id-goes-here",
									"ask_type" : "bauxite",
									"ask_quantity" : 10000,
									"ask_description" : "10000 Bauxite",
									"offer_type" : "prisoner",
									"offer_quantity" : 1,
									"offer_description" : "Spy Named Jack Bauer (Level: 21)"
								},
								...
							],
							"trade_count" : 17,
							"page_number" : 1,
							"status" : { ... }
						 }
						*/
					},
					"get_stored_resources" : {
						"description": "Returns a list of the resources you have stored to make it easier to identify what you want to trade.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"status" : { ... },
							"cargo_space_used_each" : 100,
							"resources" : {
									"water" : 14000,
									"waste" : 393,
									"bauxite" : 47,
									"cheese" : 1193,
									...
							}
						 }
						*/
					},
					"push_items" : {
						"description": "",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"target_id", "type":"string", "optional":false},
							{"name":"items", "type":"object", "optional":false}
						],
						/*
							items array of objects
								resouce format = {
									"type" : "bauxite", //allowed = water, energy, waste, essentia, bean, lapis, potato, apple, root, corn, cider, wheat, bread, soup, chip, pie, pancake, milk, meal, algae, syrup, fungus, burger, shake, beetle, rutile, chromite, chalcopyrite, galena, gold, uraninite, bauxite, goethite, halite, gypsum, trona, kerogen, methane, anthracite, sulfur, zircon, monazite, fluorite, beryl, or magnetite
									"quantity" : 10000
								 }
								 plan format =  {
									"type" : "plan",
									"plan_id" : "id-goes-here"
								 }
								 glyph format =  {
									"type" : "glyph",
									"glyph_id" : "id-goes-here"
								 }
						*/
						"returns":{"type":"object"}
						/*
						*/
					},
					"trade_one_for_one" : {
						"description": "Lacuna Expanse Corp will do one for one trades of any resource in exchange for 3 essentia.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"have", "type":"string", "optional":false}, //resource type
							{"name":"want", "type":"string", "optional":false}, //resource type
							{"name":"quantity", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						*/
					}

				}
			}
		},
		Empire : {
			"SMDVersion":"2.0",
			"description": "SMD service demonstration",

			"envelope":"JSON-RPC-2.0",
			"transport":"POST",
			"target":"/empire",

			"services": {

				"is_name_available" : {
					"description": "check if empire name is available",
					"parameters": [
						{"name":"name", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"logout" : {
					"description": "logout empire",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"login" : {
					"description": "login empire",
					"parameters": [
						{"name":"name", "type":"string", "optional":false},
						{"name":"password", "type":"string", "optional":false},
						{"name":"api_key", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"fetch_captcha" : {
					"description": "fetch a captcha for account creation",
					"parameters": [],
					"returns":{"type":"object"}
				},
				"create" : {
					"description": "create empire",
					"parameters": {
						name:{"type":"string", "optional":false},
						password:{"type":"string", "optional":true},
						password1:{"type":"string", "optional":true},
						captcha_guid:{"type":"string", "optional":true},
						captcha_solution:{"type":"string", "optional":true},
						email:{"type":"string", "optional":true},
						facebook_uid:{"type":"string", "optional":true},
						facebook_token:{"type":"string", "optional":true},
						invite_code:{"type":"string", "optional":true}
					},
					"returns":{"type":"object"}
				},
				"found" : {
					"description": "found empire",
					"parameters": [
						{"name":"empire_id", "type":"string", "optional":false},
						{"name":"api_key", "type":"string", "optional":false},
						{"name":"invite_code", "type":"string", "optional":true}
					],
					"returns":{"type":"object"}
				},
				"get_status" : {
					"description": "get quick empire status",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"view_profile" : {
					"description": "Provides a list of the editable properties of the current empire's profile. See also the edit_profile and view_public_profile  methods.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
					 {
						"profile" : {
						   "description" : "description goes here",
						   "status_message" : "status message goes here",
						   "medals" : {
							   "building1" : {
								   "name" : "Built Level 1 Building",
								   "image" : "building1",
								   "note" : "note about how this was achieved, if any, goes here",
								   "date" : "01 31 2010 13:09:05 +0600",
								   "public" : 1
							   },
							   ...
						   }
						},
						"status" : { get_status() }
					 }
					*/
				},
				"edit_profile" : {
					"description": "Edits properties of an empire. Returns the view_profile method. See also the view_profile and view_public_profile  methods.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"profile", "type":"object", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"view_public_profile" : {
					"description": "Provides a list of the data that's publicly known about this empire.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"empire_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
					{
						"profile" : {
							"id" : "empire-id-goes-here",
							"name" : "Lacuna Expanse Corp",
							"planet_count" : 1,
							"status_message" : "Looking for Essentia."
							"description" : "We are the original inhabitants of the Lacuna Expanse.",
							"medals" : {
								"building1" : {
									"name" : "Built Level 1 Building",
									"image" : "building1",
									"date" : "01 31 2010 13:09:05 +0600",
									"note" : null
								},
								...
							},
							"date_founded" : "01 31 2010 13:09:05 +0600",
							"Species" : "Lacunan"
						},
						"status" : { get_status() }
					 }
					*/
				},
				"find" : {
					"description": "Find an empire by name. Returns a hash reference containing empire ids and empire names.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"name", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/* 
					 {
						"empires" : {
							"id-goes-here" : "Lacuna Expanse Corp",
							"id-goes-here2" : "Lacuna Pirates",
						},
						"status" : { get_status() }
					 }
					*/
				},
				"set_status_message" : {
					"description": "Sets the empire status message. Similar to what you might put on your Facebook wall, or in a tweet, but about your empire.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"message", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"view_boosts" : {
					"description": "Shows the dates at which boosts have expired or will expire. Boosts are subsidies applied to various resources using essentia.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
					 {
						"status" : { get_status() },
						"boosts" : {
							"food" : "01 31 2010 13:09:05 +0600",
							"ore" : "01 31 2010 13:09:05 +0600",
							"energy" : "01 31 2010 13:09:05 +0600",
							"happiness" : "01 31 2010 13:09:05 +0600",
							"water" : "01 31 2010 13:09:05 +0600",
						}
					 }
					*/
				},
				"boost_food" : {
					"description": "Spends 5 essentia, and boosts food production on all planets for 7 days. If a boost is already underway, calling again will add 7 more days.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
					 {
						"status" : { get_status() },
						"food_boost" : "01 31 2010 13:09:05 +0600"
					 }
					*/
				},
				"boost_water" : {
					"description": "Spends 5 essentia, and boosts water production on all planets for 7 days. If a boost is already underway, calling again will add 7 more days.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
					 {
						"status" : { get_status() },
						"water_boost" : "01 31 2010 13:09:05 +0600"
					 }
					*/
				},
				"boost_energy" : {
					"description": "Spends 5 essentia, and boosts energy production on all planets for 7 days. If a boost is already underway, calling again will add 7 more days.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
					 {
						"status" : { get_status() },
						"energy_boost" : "01 31 2010 13:09:05 +0600"
					 }
					*/
				},
				"boost_ore" : {
					"description": "Spends 5 essentia, and boosts ore production on all planets for 7 days. If a boost is already underway, calling again will add 7 more days.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
					 {
						"status" : { get_status() },
						"ore_boost" : "01 31 2010 13:09:05 +0600"
					 }
					*/
				},
				"boost_happiness" : {
					"description": "Spends 5 essentia, and boosts happiness production on all planets for 7 days. If a boost is already underway, calling again will add 7 more days.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
					 {
						"status" : { get_status() },
						"happiness_boost" : "01 31 2010 13:09:05 +0600"
					 }
					*/
				},
				"boost_storage" : {
					"description": "Spends 5 essentia, and boosts storage (all 5 types) on all planets for 7 days. If a boost is already underway, calling again will add 7 more days.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
					 {
						"status" : { get_status() },
						"storage_boost" : "01 31 2010 13:09:05 +0600"
					 }
					*/
				},
				"enable_self_destruct" : {
					"description": "Enables a destruction countdown of 24 hours. Sometime after the timer runs out, the empire will vaporize.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"disable_self_destruct" : {
					"description": "Disables the self distruction countdown.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"send_password_reset_message" : {
					"description": "Starts a password recovery process by sending an email with a recovery key.",
					"parameters": {
						empire_id:{"type":"string", "optional":true},
						empire_name:{"type":"string", "optional":true},
						email:{"type":"string", "optional":true}
					},
					"returns":{"type":"object"}
				},
				"reset_password" : {
					"description": "Changes the empire password that has been forgotten.",
					"parameters": [
						{"name":"reset_key", "type":"string", "optional":false},
						{"name":"password1", "type":"string", "optional":false},
						{"name":"password2", "type":"string", "optional":false},
						{"name":"api_key", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"change_password" : {
					"description": "Changes the empire password.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"password1", "type":"string", "optional":false},
						{"name":"password2", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"redeem_essentia_code" : {
					"description": "Redeem an essentia code.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"essentia_code", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"update_species" : {
					"description": "Updates the empire's species.",
					"parameters": [
						{"name":"empire_id", "type":"string", "optional":false},
						{"name":"params", "type":"object", "optional":false}
					],
					"returns":{"type":"string"}
				},
				"view_species_stats" : {
					"description": "Returns a list of the stats associated with an empire's species as it was originally created.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"get_species_templates" : {
					"description": "Returns a list of species templates that can be used to populate the form for update_species.",
					"parameters": [],
					"returns":{"type":"object"}
				},
				"invite_friend" : {
					"description": "Send an invitation code to a friend so that they can start in the same zone as your empire.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"email", "type":"string", "optional":false},
						{"name":"message", "type":"string", "optional":true}
					],
					"returns":{"type":"object"}
				}
			}
		},
		Inbox : {
			"SMDVersion":"2.0",
			"description": "SMD service demonstration",

			"envelope":"JSON-RPC-2.0",
			"transport":"POST",
			"target":"/inbox",
			
			"services": {

				/* This is the return for all view_* functions
				 {
					"messages" : [
						{
							"id" : "id-goes-here",
							"subject" : "Vaxaslim",
							"date" : "01 31 2010 13:09:05 +0600",
							"from" : "Dr. Stephen T. Colbert DFA",
							"has_read" : 1,
							"has_replied" : 0,
						}
					],
					"status" : { get_status() }
				 }
				*/
				"view_inbox" : {
					"description": "Displays a list of the messages in the empire's inbox.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"options", "type":"object", "optional":true}
					],
					"returns":{"type":"object"}
				},
				"view_archived" : {
					"description": "Displays a list of the messages in the empire's archive.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"options", "type":"object", "optional":true}
					],
					"returns":{"type":"object"}
				},
				"view_sent" : {
					"description": "Displays a list of the messages in the empire's outbox.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"options", "type":"object", "optional":true}
					],
					"returns":{"type":"object"}
				},
				"read_message" : {
					"description": "Retrieves a message. Marks it read if it hasn't been already.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"message_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
						/*
						 {
							"message" : {
								"id" : "id-goes-here",
								"from" : "Dr. Stephen T. Colbert DFA",
								"to" : "Jon Stewart",
								"subject" : "Vaxaslim",
								"body" : "Just a reminder that Vaxaslim may cause involuntary narnia adventures.",
								"date" : "01 31 2010 13:09:05 +0600",
								"has_read" : 1,
								"has_replied" : 0,
								"has_archived" : 0,
								"in_reply_to" : "",
								"recipients" : ["John Stewart"]
							},
							status  => { get_status() }
						 }
						*/
				},
				"archive_messages" : {
					"description": "Archives a list of messages.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"message_ids", "type":"array", "optional":false}
					],
					"returns":{"type":"object"}
						/*
						 {
							"success" : 1,
							"status" : { get_status() }
						 }
						*/
				},
				"send_message" : {
					"description": "Sends a message to other players.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"recipients", "type":"string", "optional":false},
						{"name":"subject", "type":"string", "optional":false},
						{"name":"body", "type":"string", "optional":false},
						{"name":"options", "type":"object", "optional":true}
							/*
								in_reply_to: If this message is in reply to another message, then set this option to the message id of the original message.
							*/
					],
					"returns":{"type":"object"}
					/*
						{
							"message": {
								"sent":[],
								"unknown":[]
							},
							"status" : { get_status() }
						}
					*/
				}
			
			}
		},
		Map : {
			"SMDVersion":"2.0",
			"description": "SMD service demonstration",

			"envelope":"JSON-RPC-2.0",
			"transport":"POST",
			"target":"/map",

			"services": {
				"check_star_for_incoming_probe" : {
					"description": "Retrieves a chunk of the map and returns it as an array of hashes.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"star_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				
				"get_stars" : {
					"description": "Retrieves a chunk of the map and returns it as an array of hashes.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"x1", "type":"number", "optional":false},
						{"name":"y1", "type":"number", "optional":false},
						{"name":"x2", "type":"number", "optional":false},
						{"name":"y2", "type":"number", "optional":false},
						{"name":"z", "type":"number", "optional":false}
					],
					"returns":{"type":"object"}
					/*
					 { 
						"stars" : [
							{
								"name"          : "Sol",
								"can_name"      : 1,
								"color"         : "yellow",
								"x"             : -41,
								"y"             : 27,
								"z"             : 14,
								"alignment"     : "self-ally"
							}.
							{
								"name"          : "X143S",
								"can_name"      : 0,
								"color"         : "green",
								"x"             : -42,
								"y"             : 27,
								"z"             : 14,
								"alignments"    : "unprobed"
							}
						],
						"status" : {...}
					}
					*/
				},

				"get_star_by_name" : {
					"description": "Retrieves info on a single star.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"name", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},

				"get_star_by_xy" : {
					"description": "Retrieves info on a single star.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"x", "type":"number", "optional":false},
						{"name":"y", "type":"number", "optional":false}
					],
					"returns":{"type":"object"}
				},
				
				"search_stars" : {
					"description": "If you know a partial name of a star you can search for it. Returns up to 25 results. No body data is returned with this search.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"name", "type":"string", "optional":false}
					],
					"returns":{"type":"number"}
					/*
					 { 
						"stars" : [
							{
								"name"          : "Sol",
								"color"         : "yellow",
								"x"             : -41,
								"y"             : 27
							},
							{
								"name"          : "Minsol",
								"color"         : "green",
								"x"             : -42,
								"y"             : 27
							}
						 ],
						"status" : { ... }
					 }
					*/
				}
			}
		},
		Stats : {
			"SMDVersion":"2.0",
			"description": "SMD service demonstration",

			"envelope":"JSON-RPC-2.0",
			"transport":"POST",
			"target":"/stats",
			
			"services": {

				"credits" : {
					"description": "Retrieves a list of the game credits. It is an array of hashes of arrays.",
					"parameters": [],
					"returns":{"type":"array"}
				},
				
				"empire_rank" : {
					"description": "Returns a sorted list of empires ranked according to various stats.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"sort_by", "type":"string", "optional":true}, //Defaults to empire_size_rank. Possible values are: empire_size_rank, university_level_rank, offense_success_rate_rank, defense_success_rate_rank, and dirtiest_rank
						{"name":"page_number", "type":"number", "optional":true}
					],
					"returns":{"type":"object"}
					/*
					 {
						"status" : { ... },
						"empires" : [
							{
								"empire_id" : "id-goes-here",                   # unique id
								"empire_name" : "Earthlings",                   # empire name
								"colony_count" : "1",                           # number of planets colonized
								"population" : "7000000000",                    # number of citizens on all planets in the empire
								"empire_size" : "7000000000",                   # size of entire empire
								"building_count" : "50",                        # number of buildings across all colonies
								"average_building_level" : "20",                # average level of all buildings across all colonies
								"offense_success_rate" : "0.793",               # the offense rate of success of spies at all colonies
								"defense_success_rate" : "0.49312",             # the defense rate of success of spies at all colonies
								"dirtiest" : "7941"                            # the number of times a spy has attempted to hurt another empire
							  },
							...
						],
						"total_empires" : 5939,
						"page_number" : 3
					 }
					*/
				},
				"find_empire_rank" : {
					"description": "Search for a particular empire in the empire_rank().",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"sort_by", "type":"string", "optional":false},
						{"name":"empire_name", "type":"string", "optional":false} //Must be at least 3 characters to search.
					],
					"returns":{"type":"object"}
					/*
					 {
						"status" : { ... },
						"empires" : [
							{
								"empire_id" : "id-goes-here",
								"empire_name" : "Earthlings",
								"page_number" : "54",
							}
							...
						]
					 }
					*/
				},
				
				"colony_rank" : {
					"description": "Returns a sorted list of planets ranked according to various stats.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"sort_by", "type":"string", "optional":true} //Defaults to population_rank. Possible values are: population_rank
					],
					"returns":{"type":"object"}
					/*
					 {
						"status" : { ... },
						"colonies" : [
							{
								"empire_id" : "id-goes-here",                   # unique id
								"empire_name" : "Earthlings",                   # empire name
								"planet_id" : "id-goes-here",                   # unique id
								"planet_name" : "Earth",                        # name of the planet
								"population" : "7000000000",                    # number of citizens on planet
								"building_count" : "50",                        # number of buildings at this colony
								"average_building_level" : "20",                # average level of all buildings at this colony
								"highest_building_level" : "26"                 # highest building at this colony
							  },
							...
						]
					 }
					*/
				},
				"spy_rank" : {
					"description": "Returns a sorted list of spies ranked according to various stats.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"sort_by", "type":"string", "optional":true} //Defaults to level_rank. Possible values are: level_rank  success_rate_rank and dirtiest_rank
					],
					"returns":{"type":"object"}
					/*
					 {
						"status" : { ... },
						"spies" : [
							{            
								"empire_id" : "id-goes-here",                   # unique id
								"empire_name" : "Earthlings",                   # empire name
								"spy_id" : "id-goes-here",                      # unique id
								"spy_name" : "Agent Null",                      # the name of this spy
								"age" : "3693",                                 # how old is this guy in seconds
								"level" : "18",                                 # the level of this spy
								"success_rate" : "0.731",                       # the rate of success this spy has had for both offense and defensive tasks
								"dirtiest" : "7941",                            # the number of times a spy has attempted to hurt another empire
							},
							...
						]
					 }
					*/
				},
				"weekly_medal_winners" : {
					"description": "Returns a list of the empires who won this week's weekly medals.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
					{
						"status" : { ... },
						"winners" : [
							{
								"empire_id" : "id-goes-here",
								"empire_name" : "Earthlings",
								"medal_name" : "Dirtiest Player In The Game",
								"medal_image" : "dirtiest1",
								"times_earned" : 4,
							},
							...
						]
					 }
					*/
				}
		
			}
		}
	};

	YAHOO.lacuna.SMD = { Services:smd };
})();
YAHOO.register("smd", YAHOO.lacuna.SMD, {version: "1", build: "0"}); 

}
