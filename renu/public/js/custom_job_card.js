// // Copyright (c) 2018, Frappe Technologies Pvt. Ltd. and contributors
// // For license information, please see license.txt

// // ---------------------- Start Custom Code 


// frappe.ui.form.on('Job Card Time Log', {
// 	// product_type: function (frm,cdt,cdn) {
// 	// 	var child=locals[cdt][cdn]
// 	// 	frm.call({
// 	// 		method: 'renu.renu.utilities.insert_result_todb',//function name defined in python
// 	// 		args:{
// 	// 			self:frm.doc, //current 
// 	// 			row_index:child.idx
// 	// 		}
// 	// 	});
// 	// }
//     custom_pcb_test_results:async function(frm,cdt,cdn){
//         var d = locals[cdt][cdn]
//         // console.log("from_time:"+d.from_time)
//         d.from_time = frappe.datetime.now_datetime()
//         frm.refresh_fields()
//     }
// });
// frappe.ui.form.on('Job Card', {
// 	employee: function(frm) {
// 		if (frm.doc.clear_table_count == 0) {
// 			frm.clear_table("time_logs"); 
// 			frm.refresh_field('time_logs'); 
// 		}
// 		var total = 1
// 		frm.set_value('clear_table_count', total);
// 	}
// });
// frappe.ui.form.on('Job Card', {
// 	// before_save: function (frm) {
// 	// 	frm.call({
// 	// 		method: 'renu.renu.utilities.pcb',//function name defined in python
// 	// 		args:{
// 	// 		 self:frm.doc, //current document
// 	// 		}
				
// 	// 	});
// 	// }
// 	// before_save: async function (frm) {
       
//     // }
// });

// frappe.ui.form.on('Job Card', {
// 	// pcb_code: function (frm) {
// 	// 		frm.call({
// 	// 			method:'append_data_qrend',//function name defined in python
// 	// 			doc: frm.doc, //current document
// 	// 		}
// 	// 		);
// 	// }

//     before_submit: async function(frm){
//         await frm.call({
//             method:"renu.renu.utilities.check_operation_lock_time",
//             args:{
//                 doc:frm.doc
//             }
//         })

//     },
//     onload: function(frm){
//         frm.clear_table("time_logs")
//     },


//     onload: function(frm){
//         let flag = true
//         frm.doc.time_logs.forEach((row)=>{
//             if(row.pcb_qr_code){
//                 flag = false
//             }
//         })
//         if(flag){
//             frm.clear_table("time_logs")
//         }
//     },
// 	pcb_code: function (frm) {
//         frm.call({
//             method: 'renu.renu.utilities.append_data_qrend', // Function name defined in Python
//             args: {
//                 doc: frm.doc, // Pass the document object
//                 pcb_code: frm.doc.pcb_code // Pass the PCB code if needed
//             }
//         });
//     }
// });

// frappe.ui.form.on('Job Card', {
	
// 	// start_qr: function (frm) {
// 	// 		frm.call({
// 	// 			method:'get_prev_stage_data',//function name defined in python
// 	// 			doc: frm.doc, //current document
// 	// 		}
// 	// 		);
// 	// }

// 	// start_qr: function (frm) {
//     //     frm.call({
//     //         method: 'renu.renu.utilities.get_prev_stage_data',  // Function name defined in the Python code
//     //         args: {
//     //             doc: frm.doc,  // Pass the current document
//     //         }
//     //     });
//     // },
//     before_submit: async function(frm){
//         await frm.call({
//             method:"renu.renu.utilities.check_operation_lock_time",
//             args:{
//                 doc:frm.doc
//             }
//         })

//     }
// });

// frappe.ui.form.on('Job Card', {
// 	// add_sub_process: async function (frm) {                                                                      
// 	// 		await frm.call({
// 	// 			method:'append_to_subprocess_details',//function name defined in python
// 	// 			doc: frm.doc, //current document
// 	// 		},
// 	// 		frm.refresh_field("on_work_use")
// 	// 		);
// 	// }
//     custom_scan_pcb: function(frm) {
//         if (frm.doc.custom_scan_pcb) {
//             let updated_item_index = -1;
    
//             frm.doc.time_logs.forEach((item, index) => {
//                 if (item.pcb_qr_code == frm.doc.custom_scan_pcb) {
//                     console.log("scanned QR: "+frm.doc.custom_scan_pcb);
//                     item.custom_scanned_pcb = frm.doc.custom_scan_pcb
//                     item.to_time = frappe.datetime.now_datetime();
//                     updated_item_index = index; 
//                 }
//             });
    
//             if (updated_item_index !== -1) {
//                 // Remove and move the updated row to the top
//                 let updated_row = frm.doc.time_logs.splice(updated_item_index, 1)[0];
//                 frm.doc.time_logs.unshift(updated_row);
//             }
    
//             // Update serial numbers (idx) to maintain proper order
//             frm.doc.time_logs.forEach((item, index) => {
//                 item.idx = index + 1; // Assign new index starting from 1
//             });
//             frm.doc.custom_scan_pcb = ""
//             frm.refresh_fields();
//         }
//     },
// 	before_save: async function (frm) {
        
//                 // Call the Python method in the external file
                                                                                                                                                            
//                 await frappe.call({
//                     method: 'renu.renu.utilities.update_testing_status', // Path to the external method
//                     args: {
//                         job_card_doc: frm.doc // Pass the current document
//                     },
                    
//                 });
            
                
//         //} await frm.call({
//         //     method: 'renu.renu.utilities.get_prev_stage_time',  // Function name in the Python code
//         //     args: {
//         //         doc: frm.doc,  // Pass the current document
//         //     }
//         // });
        
//         // Refresh the field to reflect changes after the method execution
//         // frm.refresh_field("on_work_use");
//     },
//     refresh:async function(frm){
//         frm.add_custom_button(__("Get Data"),async function(){
//             const response = await frappe.call({
//                 method: 'renu.renu.utilities.pcb', // Path to the external method
//                 args: {
//                     job_card_doc: frm.doc // Pass the current document
//                 },
                
//             });
//             // Update the form with the response
//             if (frm.doc.pcd_counter == 0 && frm.doc.counter == 1) {
//                 if (response.message) {
//                     const { shift_incharge, incharge_name, shift, pcb_details } = response.message;
//                     // console.log(response);
                    
//                     frm.set_value('shift_incharge', shift_incharge);
//                     frm.set_value('incharge_name', incharge_name);
//                     frm.set_value('shift', shift);
                    
//                     // Add time_logs based on PCB details
//                     if (pcb_details && pcb_details.length > 0 ) { // && frm.doc.time_logs.length <= 0
//                         pcb_details.forEach(detail => {
//                             frm.add_child('time_logs', {
//                                 pcb_qr_code: detail.qr_code,
//                                 completed_qty: 1,
//                                 from_time: detail.current_time
//                             });
//                         });
//                         frm.refresh_field('time_logs');
//                     } else {
//                         frappe.msgprint(__('No PCB details found in the Work Order.'));
//                     }
//                 }
                
//                 frm.set_value('pcd_counter', 1);
//             } 
//             if(frm.doc.counter > 1){
//                 console.log(response.message);
                
//                 if (response.message.length > 0) {
//                     // if(frm.doc.time_logs.length <= 0){
                        
//                         response.message.forEach(detail => {
//                             frm.add_child('time_logs', {
//                                 pcb_qr_code: detail.pcb_qr_code,
//                                 completed_qty: 1,
//                                 product_type: detail.product_type,
//                                 time_in_mins: detail.time_in_mins,
//                                 // pcb_test_results: detail.pcb_test_results
                                
//                             });
//                         });
//                         frm.refresh_field('time_logs');
//                     // }
//                 }
                
//             }
//             if(frm.doc.time_logs && frm.doc.operation == "ICT"){
//                 for (let row of frm.doc.time_logs) {
//                     if (row.pcb_qr_code) {
//                         // Fetch ICT Log Info based on qr_code
//                         let ict_log_info = (await frm.call({
//                             method:"renu.renu.utilities.get_ict_data",
//                             args:{
//                                 qr:row.pcb_qr_code
//                             }
//                         }
                           
//                         )).message;
            
//                         if (ict_log_info) {
//                             // Set the values using frappe.model.set_value
//                             frappe.model.set_value(row.doctype, row.name, 'from_time', ict_log_info.date_time);
//                             frappe.model.set_value(row.doctype, row.name, 'custom_pcb_test_results', (typeof ict_log_info.result === 'string' ? ict_log_info.result.toLowerCase() : ''));
                            
//                         }
//                     }
//             }
//         }
//     const dbs = {"FCT1-1":"Merlin_NBIoT_FCT1_units",
//                  "FCT1-2":"Merlin_NBIoT_FCT1_units",
//                  "RF1":"Merlin_NBIoT_RF1_units",
//                  "RF1-1":"Merlin_NBIoT_RF1_units",
//                 //  RF1-2	new stage add 
//                  "FCT2":"Merlin_NBIoT_FCT2_units",
//                 //  "POTTING":
//                  "LEAK TEST":"Merlin_NBIoT_LKG_units",
//                  "FCT3":"Merlin_NBIoT_FCT3_units",
//                  "RF2":"Merlin_NBIoT_RF2_units",
//                  "RF2-1":"Merlin_NBIoT_RF2_units",
//                 //  RF2-2	new stage add
//                 //  "PDI":

//     }   
//          if(frm.doc.operation in dbs){
//            console.log(frm.doc.time_logs);
           
//            await frappe.call({
//                 method:"renu.renu.utilities.get_db_data",
//                 args: {
//                     job_card_doc: frm.doc,
//                     db_name : dbs[frm.doc.operation]
//                 },
//                 callback:(r)=>{
//                     if(r.message){
//                         for (let row of frm.doc.time_logs) {
//                             if (row.pcb_qr_code && r.message[row.idx-1] && row.pcb_qr_code == r.message[row.idx - 1][5]) {
//                                     frappe.model.set_value(row.doctype, row.name, 'custom_pcb_test_results',r.message[row.idx - 1][7].toLowerCase());
//                             }
//                     }
//                     }
//                 }

//             })
//          }else{
//             console.log(frm.doc.operation)
//          }
//         }).addClass("btn-danger")
//         $('button:contains("Get Data")').prop('disabled', false); 
//         frm.refresh_fields()
//         if(frm.doc.operation == "ICT"){
//             frm.add_custom_button(__("Verify Results"),async function(){
//                 if(frm.doc.time_logs && frm.doc.operation == "ICT"){
//                     for (let row of frm.doc.time_logs) {
//                         if (row.pcb_qr_code) {
//                             // Fetch ICT Log Info based on qr_code
//                             let ict_log_info = (await frm.call({
//                                 method:"renu.renu.utilities.get_ict_data",
//                                 args:{
//                                     qr:row.pcb_qr_code
//                                 }
//                             }
                               
//                             )).message;
                
//                             if (ict_log_info) {
//                                 // Set the values using frappe.model.set_value
//                                 frappe.model.set_value(row.doctype, row.name, 'from_time', ict_log_info.date_time);
//                                 frappe.model.set_value(row.doctype, row.name, 'custom_pcb_test_results', (typeof ict_log_info.result === 'string' ? ict_log_info.result.toLowerCase() : ''));
//                             }
//                         }
//                 }
//             }

//             if(frm.doc.time_logs && frm.doc.counter == 3){
//                 for (let row of frm.doc.time_logs) {
//                     if (row.pcb_qr_code) {
//                         // Fetch ICT Log Info based on qr_code
//                         let ict_log_info = (await frappe.db.get_value(
//                             "ICT Log Info",
//                             { "qr_code": row.pcb_qr_code },
//                             ["qr_code", "date_time", "result"]
//                         )).message;
            
//                         if (ict_log_info) {
//                             // Set the values using frappe.model.set_value
//                             frappe.model.set_value(row.doctype, row.name, 'from_time', ict_log_info.date_time);
//                             frappe.model.set_value(row.doctype, row.name, 'pcb_test_results', ict_log_info.result);
//                         }
//                     }
//             }
//         }
//         // await frm.call({
//         //     method: 'renu.renu.utilities.get_prev_stage_time',  // Function name in the Python code
//         //     args: {
//         //         doc: frm.doc,  // Pass the current document
//         //     }
//         // });
        
//         // Refresh the field to reflect changes after the method execution
//         // frm.refresh_field("on_work_use");
//     },

//             })
//         }
//         if( frm.doc.counter > 3){
//             frm.add_custom_button(__("Verify Results"),async function(){
//                 const dbs = {"FCT1-1":"Merlin_NBIoT_FCT1_units",
//                     "FCT1-2":"Merlin_NBIoT_FCT1_units",
//                     "RF1":"Merlin_NBIoT_RF1_units",
//                     "RF1-1":"Merlin_NBIoT_RF1_units",
//                    //  RF1-2	new stage add 
//                     "FCT2":"Merlin_NBIoT_FCT2_units",
//                    //  "POTTING":
//                     "LEAK TEST":"Merlin_NBIoT_LKG_units",
//                     "FCT3":"Merlin_NBIoT_FCT3_units",
//                     "RF2":"Merlin_NBIoT_RF2_units",
//                     "RF2-1":"Merlin_NBIoT_RF2_units",
//                    //  RF2-2	new stage add
//                    //  "PDI":
   
//        }   
//             if(frm.doc.operation in dbs){
//               console.log(frm.doc.time_logs);
              
//               await frappe.call({
//                    method:"renu.renu.utilities.get_db_data",
//                    args: {
//                        job_card_doc: frm.doc,
//                        db_name : dbs[frm.doc.operation]
//                    },
//                    callback:(r)=>{
//                        if(r.message){
//                            for (let row of frm.doc.time_logs) {
//                                if (row.pcb_qr_code && r.message[row.idx-1] && row.pcb_qr_code == r.message[row.idx - 1][5]) {
//                                        frappe.model.set_value(row.doctype, row.name, 'custom_pcb_test_results',r.message[row.idx - 1][7].toLowerCase());
//                                }else{
//                                     frappe.model.set_value(row.doctype, row.name, 'custom_pcb_test_results',"".toLowerCase());

//                                }
//                        }
//                        }
//                    }
   
//                })
//             }
//             }).addClass("btn-dark")
//         }
//     }

// 	// add_sub_process: async function (frm) {
//     //     await frm.call({
//     //         method: 'renu.renu.utilities.append_to_subprocess_details',  // Function name in the Python code
//     //         args: {
//     //             doc: frm.doc,  // Pass the current document
//     //         }
//     //     });
        
//     //     // Refresh the field to reflect changes after the method execution
//     //     frm.refresh_field("on_work_use");
//     // }
	
// });

// // frappe.ui.form.on("Job Card Time Log", "scan_qr_start", function(frm, cdt, cdn) {
// //     	var d = locals[cdt][cdn];
// // 		var entre = frappe.datetime.now_datetime()
// // 		var usernm = frappe.session.user
// // 		frappe.model.set_value(cdt, cdn, 'from_time', entre);
// // 		frappe.model.set_value(cdt, cdn, 'user', usernm);
// // });
// // ---------------------- End Custom Code 

// Copyright (c) 2018, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

// ---------------------- Start Custom Code 

frappe.ui.form.on('Job Card Time Log', {
    custom_pcb_test_results: async function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        d.from_time = frappe.datetime.now_datetime();
        frm.refresh_fields();
    }
});

frappe.ui.form.on('Job Card', {
    employee: function(frm) {
        if (frm.doc.clear_table_count == 0) {
            frm.clear_table("time_logs"); 
            frm.refresh_field('time_logs'); 
        }
        var total = 1;
        frm.set_value('clear_table_count', total);
    },

    before_submit: async function(frm) {
        await frm.call({
            method: "renu.renu.utilities.check_operation_lock_time",
            args: {
                doc: frm.doc
            }
        });
    },

    onload: function(frm) {
        let flag = true;
        frm.doc.time_logs.forEach((row) => {
            if (row.pcb_qr_code) {
                flag = false;
            }
        });
        if (flag) {
            frm.clear_table("time_logs");
        }
    },

    pcb_code: function(frm) {
        frm.call({
            method: 'renu.renu.utilities.append_data_qrend',
            args: {
                doc: frm.doc,
                pcb_code: frm.doc.pcb_code
            }
        });
    },

    custom_scan_pcb: function(frm) {
        if (frm.doc.custom_scan_pcb) {
            let updated_item_index = -1;
    
            frm.doc.time_logs.forEach((item, index) => {
                if (item.pcb_qr_code == frm.doc.custom_scan_pcb) {
                    console.log("scanned QR: " + frm.doc.custom_scan_pcb);
                    item.custom_scanned_pcb = frm.doc.custom_scan_pcb;
                    item.to_time = frappe.datetime.now_datetime();
                    updated_item_index = index; 
                }
            });
    
            if (updated_item_index !== -1) {
                // Remove and move the updated row to the top
                let updated_row = frm.doc.time_logs.splice(updated_item_index, 1)[0];
                frm.doc.time_logs.unshift(updated_row);
            }
    
            // Update serial numbers (idx) to maintain proper order
            frm.doc.time_logs.forEach((item, index) => {
                item.idx = index + 1;
            });
            frm.doc.custom_scan_pcb = "";
            frm.refresh_fields();
        }
    },

    before_save: async function(frm) {
        await frappe.call({
            method: 'renu.renu.utilities.update_testing_status',
            args: {
                job_card_doc: frm.doc
            }
        });
    },

    refresh: async function(frm) {
        frm.add_custom_button(__("Get Data"), async function() {
            const response = await frappe.call({
                method: 'renu.renu.utilities.pcb',
                args: {
                    job_card_doc: frm.doc
                }
            });

            // Update the form with the response
            if (frm.doc.pcd_counter == 0 && frm.doc.counter == 1) {
                if (response.message) {
                    const { shift_incharge, incharge_name, shift, pcb_details } = response.message;
                    
                    frm.set_value('shift_incharge', shift_incharge);
                    frm.set_value('incharge_name', incharge_name);
                    frm.set_value('shift', shift);
                    
                    // Add time_logs based on PCB details
                    if (pcb_details && pcb_details.length > 0) {
                        pcb_details.forEach(detail => {
                            frm.add_child('time_logs', {
                                pcb_qr_code: detail.qr_code,
                                completed_qty: 1,
                                from_time: detail.current_time
                            });
                        });
                        frm.refresh_field('time_logs');
                    } else {
                        frappe.msgprint(__('No PCB details found in the Work Order.'));
                    }
                }
                
                frm.set_value('pcd_counter', 1);
            }

            if (frm.doc.counter > 1) {
                console.log(response.message);
                
                if (response.message.length > 0) {
                    response.message.forEach(detail => {
                        frm.add_child('time_logs', {
                            pcb_qr_code: detail.pcb_qr_code,
                            completed_qty: 1,
                            product_type: detail.product_type,
                            time_in_mins: detail.time_in_mins
                        });
                    });
                    frm.refresh_field('time_logs');
                }
            }

            // Handle ICT operations
            if (frm.doc.time_logs && frm.doc.operation == "ICT") {
                for (let row of frm.doc.time_logs) {
                    if (row.pcb_qr_code) {
                        let ict_log_info = (await frm.call({
                            method: "renu.renu.utilities.get_ict_data",
                            args: {
                                qr: row.pcb_qr_code
                            }
                        })).message;
            
                        if (ict_log_info) {
                            frappe.model.set_value(row.doctype, row.name, 'from_time', ict_log_info.date_time);
                            frappe.model.set_value(row.doctype, row.name, 'custom_pcb_test_results', 
                                (typeof ict_log_info.result === 'string' ? ict_log_info.result.toLowerCase() : ''));
                        }
                    }
                }
            }

            // Database mapping for different operations
            const dbs = {
                "FCT1-1": "Merlin_NBIoT_FCT1_units",
                "FCT1-2": "Merlin_NBIoT_FCT1_units",
                "RF1": "Merlin_NBIoT_RF1_units",
                "RF1-1": "Merlin_NBIoT_RF1_units",
                "FCT2": "Merlin_NBIoT_FCT2_units",
                "LEAK TEST": "Merlin_NBIoT_LKG_units",
                "FCT3": "Merlin_NBIoT_FCT3_units",
                "RF2": "Merlin_NBIoT_RF2_units",
                "RF2-1": "Merlin_NBIoT_RF2_units"
            };

            if (frm.doc.operation in dbs) {
                console.log(frm.doc.time_logs);
                
                await frappe.call({
                    method: "renu.renu.utilities.get_db_data",
                    args: {
                        job_card_doc: frm.doc,
                        db_name: dbs[frm.doc.operation]
                    },
                    callback: (r) => {
                        if (r.message) {
                            for (let row of frm.doc.time_logs) {
                                if (row.pcb_qr_code && r.message[row.idx - 1] && 
                                    row.pcb_qr_code == r.message[row.idx - 1][5]) {
                                    frappe.model.set_value(row.doctype, row.name, 'custom_pcb_test_results',
                                        r.message[row.idx - 1][7].toLowerCase());
                                }
                            }
                        }
                    }
                });
            } else {
                console.log(frm.doc.operation);
            }
        }).addClass("btn-danger");

        $('button:contains("Get Data")').prop('disabled', false); 
        frm.refresh_fields();

        // Add ICT Verify Results button
        if (frm.doc.operation == "ICT") {
            frm.add_custom_button(__("Verify Results"), async function() {
                if (frm.doc.time_logs && frm.doc.operation == "ICT") {
                    for (let row of frm.doc.time_logs) {
                        if (row.pcb_qr_code) {
                            let ict_log_info = (await frm.call({
                                method: "renu.renu.utilities.get_ict_data",
                                args: {
                                    qr: row.pcb_qr_code
                                }
                            })).message;
                
                            if (ict_log_info) {
                                frappe.model.set_value(row.doctype, row.name, 'from_time', ict_log_info.date_time);
                                frappe.model.set_value(row.doctype, row.name, 'custom_pcb_test_results', 
                                    (typeof ict_log_info.result === 'string' ? ict_log_info.result.toLowerCase() : ''));
                            }
                        }
                    }
                }

                if (frm.doc.time_logs && frm.doc.counter == 3) {
                    for (let row of frm.doc.time_logs) {
                        if (row.pcb_qr_code) {
                            let ict_log_info = (await frappe.db.get_value(
                                "ICT Log Info",
                                { "qr_code": row.pcb_qr_code },
                                ["qr_code", "date_time", "result"]
                            )).message;
                
                            if (ict_log_info) {
                                frappe.model.set_value(row.doctype, row.name, 'from_time', ict_log_info.date_time);
                                frappe.model.set_value(row.doctype, row.name, 'pcb_test_results', ict_log_info.result);
                            }
                        }
                    }
                }
            });
        }

        // Add Verify Results button for counter > 3
        if (frm.doc.counter > 3) {
            frm.add_custom_button(__("Verify Results"), async function() {
                const dbs = {
                    "FCT1-1": "Merlin_NBIoT_FCT1_units",
                    "FCT1-2": "Merlin_NBIoT_FCT1_units",
                    "RF1": "Merlin_NBIoT_RF1_units",
                    "RF1-1": "Merlin_NBIoT_RF1_units",
                    "FCT2": "Merlin_NBIoT_FCT2_units",
                    "LEAK TEST": "Merlin_NBIoT_LKG_units",
                    "FCT3": "Merlin_NBIoT_FCT3_units",
                    "RF2": "Merlin_NBIoT_RF2_units",
                    "RF2-1": "Merlin_NBIoT_RF2_units"
                };

                if (frm.doc.operation in dbs) {
                    console.log(frm.doc.time_logs);
                    
                    await frappe.call({
                        method: "renu.renu.utilities.get_db_data",
                        args: {
                            job_card_doc: frm.doc,
                            db_name: dbs[frm.doc.operation]
                        },
                        callback: (r) => {
                            if (r.message) {
                                for (let row of frm.doc.time_logs) {
                                    if (row.pcb_qr_code && r.message[row.idx - 1] && 
                                        row.pcb_qr_code == r.message[row.idx - 1][5]) {
                                        frappe.model.set_value(row.doctype, row.name, 'custom_pcb_test_results',
                                            r.message[row.idx - 1][7].toLowerCase());
                                    } else {
                                        frappe.model.set_value(row.doctype, row.name, 'custom_pcb_test_results', "");
                                    }
                                }
                            }
                        }
                    });
                }
            }).addClass("btn-dark");
        }
    }
});

// ---------------------- End Custom Code