// frappe.ui.form.on("Work Order",{
//     onload_post_render:function(frm){
//         if(frm.doc.operations){
//             frm.doc.operations.forEach(async (row)=>{
//                 row.actual_operation_time = (await frappe.db.get_value("Operation",row.operation,"custom_operation_time")).message.custom_operation_time
//                 frm.refresh_field("operations");
//               })
//         }
        
//     }
// })

// // Client Script Code from Script for 
// frappe.ui.form.on('PCB Details', {
//     scan(frm, cdt, cdn) {
//             var child = locals[cdt][cdn];
//             const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
//             new frappe.ui.Scanner({
//             dialog: true, // open camera scanner in a dialog
//             multiple: false, // stop after scanning one value
//             on_scan(data) {
//                 frappe.model.set_value(cdt, cdn, 'qr_code', data.decodedText);
//                 frm.refresh_field("qr_code");
//                 frm.refresh_table("pcb_details");
//              }
//           });
//         }
//     });
    
    
//     frappe.ui.form.on('PCB Details', {
//       async scan_barcode(frm, cdt, cdn) {
//            var child = locals[cdt][cdn];
//         const scanner = new Instascan.Scanner({
//           video: document.getElementById('scanner-container'),
//           mirror: false,
//           captureImage: true,
//           refractoryPeriod: 200,
//         });
    
//         scanner.addListener('scan', async function(content) {
//         // //   frm.set_value('qr_code', content);
//         // //  child.qr_code=  data.decodedText;
//         //   child.set_value("qr_code", data.decodedText);
//          frm.refresh_field("qr_code");
//          frm.refresh_table("pcb_details");
//           scanner.stop();
//         });
    
//         try {
//           const cameras = await Instascan.Camera.getCameras();
//           if (cameras.length > 0) {
//             const chosenCamera = cameras[0];
//             const stream = await navigator.mediaDevices.getUserMedia({
//               video: { deviceId: chosenCamera.id },
//             });
    
//             const capabilities = chosenCamera.capabilities;
//             const resolution = getBestResolution(capabilities);
    
//             const constraints = {
//               width: { ideal: resolution.width },
//               height: { ideal: resolution.height },
//             };
    
//             stream.getTracks().forEach(track => track.stop()); // Stop previous stream if any
//             const newStream = await navigator.mediaDevices.getUserMedia({
//               video: { deviceId: chosenCamera.id, ...constraints },
//             });
    
//             scanner.start(newStream);
//           } else {
//             console.error('No cameras found.');
//           }
//         } catch (error) {
//           console.error('Error accessing camera:', error);
//         }
//       },
//     });
    
//     function getBestResolution(capabilities) {
//       // Implement your logic to determine the best resolution based on capabilities
//       // You can choose the highest resolution, or a resolution suitable for small QR codes
//       // Example logic: return capabilities.reduce((prev, curr) => prev.width > curr.width ? prev : curr);
//       // Replace the example logic with your custom logic based on the capabilities object
//       // You can consider factors like width, height, and frame rate to choose the best resolution.
//       return capabilities[0]; // Example: Return the first resolution in capabilities
//     }
    
    
//     frappe.ui.form.on("PCB Details", "qr_code", function(frm, cdt, cdn) {
//       var d = locals[cdt][cdn];
//       var result = frappe.datetime.now_datetime()
//       frappe.model.set_value(cdt, cdn, 'work_order_pcb_date', result);
//     });
    
//     frappe.ui.form.on('PCB Details', {
//         // qr_code: function (frm, cdt, cdn) {
//         //     let d = locals[cdt][cdn];
//         //     let table = frm.fields_dict['pcb_details'].grid;
//         //     let table_index = table.grid_rows.findIndex(row => row.doc === d);
//         //     frappe.call({
//         //         method: "already_exist",
//         //         args: {
//         //             row_index: table_index
//         //         },
//         //         doc: frm.doc,
//         //     });
//         // },

//         qr_code: function (frm, cdt, cdn) {
//           let d = locals[cdt][cdn];
//           let table = frm.fields_dict['pcb_details'].grid;
  
//           // Get all rows in the table
//           let all_rows = frm.doc.pcb_details || [];
  
//           // Get the index of the current row
//           let table_index = table.grid_rows.findIndex(row => row.doc === d);
  
//           // Check for duplicate QR code in other rows
//           let duplicate_found = all_rows.some((row, idx) => {
//               return idx !== table_index && row.qr_code === d.qr_code;
//           });
  
//           if (duplicate_found) {
//               frappe.msgprint({
//                   title: __("Error"),
//                   indicator: "red",
//                   message: __("QR Code Already Scanned")
//               });
//               d.qr_code = null
//               frm.refresh_field("qr_code")
//               // frappe.model.set_value(cdt, cdn, "qr_code", null); // Clear the invalid QR code
//           }
//       }
//     });
    
//     frappe.ui.form.on('Work Order', {
//       // barcodescn: function(frm) {
//       //   frm.call({
//       //     method:'barcodescn_set',//function name defined in python
//       //     doc: frm.doc, //current document
//       //   });
//       // }
//       before_submit: async function (frm) {
//         try {
//             // Calculate pcb_total as the length of pcb_details
//             const pcb_total = frm.doc.pcb_details ? frm.doc.pcb_details.length : 0;
//             frm.set_value('pcb_total', pcb_total);

//             // Fetch all items with a limit_qty > 0
//             const items = await frappe.db.get_list('Item', {
//                 filters: { limit_qty: [">", 0] },
//                 fields: ['used_qty', 'name', 'limit_qty']
//             });

//             if (items && items.length > 0) {
//                 for (let item of items) {
//                     for (let required_item of frm.doc.required_items || []) {
//                         if (required_item.item_code === item.name) {
//                             const total = (item.used_qty || 0) + pcb_total;

//                             if (total <= item.limit_qty) {
//                                 // Update the used_qty and available_qty in the Item doctype
//                                 await frappe.db.set_value('Item', item.name, 'used_qty', total);

//                                 const available_qty = item.limit_qty - total;
//                                 await frappe.db.set_value('Item', item.name, 'available_qty', available_qty);

//                                 frappe.msgprint({
//                                     title: __('Updated'),
//                                     message: `Item ${item.name} updated successfully. Available Quantity: ${available_qty}`,
//                                     indicator: 'green'
//                                 });
//                             } else {
//                                 frappe.throw({
//                                     title: __('Limit Exceeded'),
//                                     message: `Your Used Quantity for ${item.name} exceeds its limit (${item.limit_qty}).`,
//                                     indicator: 'red'
//                                 });
//                             }
//                         }
//                     }
//                 }
//             }
//         } catch (error) {
//             frappe.msgprint({
//                 title: __('Error'),
//                 message: `An error occurred while updating items: ${error.message}`,
//                 indicator: 'red'
//             });
//             console.error('Error during before_submit:', error);
//         }
//     },
//       before_cancel: async function (frm) {
//         try {
//             // Fetch all items with a limit_qty > 0
//             const items = await frappe.db.get_list('Item', {
//                 filters: { limit_qty: [">", 0] },
//                 fields: ['used_qty', 'name', 'limit_qty']
//             });

//             if (items && items.length > 0) {
//                 for (let item of items) {
//                     for (let required_item of frm.doc.required_items) {
//                         if (required_item.item_code === item.name) {
//                             // Calculate the updated used_qty
//                             const updated_qty = item.used_qty - parseFloat(frm.doc.pcb_total || 0);

//                             // Update the used_qty field in the Item doctype
//                             await frappe.db.set_value('Item', item.name, 'used_qty', updated_qty);

//                             frappe.msgprint({
//                                 title: __('Updated'),
//                                 message: `Item ${item.name} updated successfully.`,
//                                 indicator: 'green'
//                             });
//                         }
//                     }
//                 }
//             }
//         } catch (error) {
//             frappe.msgprint({
//                 title: __('Error'),
//                 message: `An error occurred while updating items: ${error.message}`,
//                 indicator: 'red'
//             });
//             console.error('Error during before_cancel:', error);
//         }
//     },

//       barcodescn: function (frm) {
//         // Ensure the barcodescn field is not empty
//         if (!frm.doc.barcodescn) {
//             return;
//         }

//         // Get the current child index and the PCB details table
//         let pcb_details = frm.doc.pcb_details || [];
//         let current_idx = frm.doc.child_idx || 0;

//         // Check if the QR code is already scanned
//         let duplicate_found = pcb_details.some((row) => row.qr_code === frm.doc.barcodescn);
//         if (duplicate_found) {
//             frappe.msgprint({
//                 title: __("Error"),
//                 indicator: "red",
//                 message: __("QR Code Already Scanned")
//             });
//             frm.set_value("barcodescn", null);
//             return;
//         }

//         // Check if the current index exceeds or equals the quantity
//         if (current_idx >= frm.doc.qty) {
//             frappe.msgprint({
//                 title: __("Error"),
//                 indicator: "red",
//                 message: __("QR Code Completed..........")
//             });
//             frm.set_value("barcodescn", null);
//             return;
//         }

//         // Update the current row in the PCB details table
//         if (pcb_details[current_idx]) {
//             frappe.model.set_value(pcb_details[current_idx].doctype, pcb_details[current_idx].name, {
//                 qr_code: frm.doc.barcodescn,
//                 current_time: frappe.datetime.now_datetime(),
//                 work_order_pcb_date: frappe.datetime.now_datetime()
//             });
//         }

//         // Increment the child index
//         frm.set_value("child_idx", current_idx + 1);

//         // Clear the barcodescn field
//         frm.set_value("barcodescn", null);
//       }
//     });
    
//     frappe.ui.form.on('Work Order', {
//       // after_save: function(frm) {
//       //   frm.call({
//       //     method:'set_qty_single',//function name defined in python
//       //     doc: frm.doc, //current document
//       //   });
//       //   refresh_field("required_items");
//       // }
//       after_save: function (frm) {
//         let assemble_qty = 0;
//         // Fetch the 'assemble_qty' from the BOM
//         frappe.db.get_value('BOM', { name: frm.doc.bom_no }, 'assemble_qty')
//             .then(r => {
//                 if (r.message) {
//                     assemble_qty = r.message.assemble_qty;
                    
//                     // Fetch the BOM Items
//                     frappe.db.get_list('BOM Item', {
//                         filters: { parent: frm.doc.bom_no },
//                         fields: ['item_code', 'qty', 'is_bulk_use', 'uom']
//                     }).then(bom_items => {
//                         if (bom_items && bom_items.length > 0) {
//                             // Iterate through the required items table in the Work Order
//                             frm.doc.required_items.forEach(item => {
//                                 bom_items.forEach(bom_item => {
//                                     if (item.item_code === bom_item.item_code) {
//                                         if (bom_item.is_bulk_use) {
//                                             // Calculate the total required quantity
//                                             let total = frm.doc.qty / assemble_qty;
//                                             total = Math.ceil(total); // Round up if not a whole number
//                                             frappe.model.set_value(item.doctype, item.name, 'required_qty', total);
//                                         }
//                                         // Set the UOM
//                                         frappe.model.set_value(item.doctype, item.name, 'uom', bom_item.uom);
//                                     }
//                                 });
//                             });
//                         }
//                         frm.refresh_field('required_items');
//                     });
//                 }
//             });
//     }
//     });
    
//     frappe.ui.form.on("PCB Details", {
//         qr_code: function(frm) {
//             var total1 = frm.doc.pcb_details.length;
//             frm.set_value("pcb_total", total1);
//             refresh_field("pcb_total");
//         },
//       pcb_details_remove:function(frm){
//             var total1 = frm.doc.pcb_details.length;
//             frm.set_value("pcb_total", total1);
//             refresh_field("pcb_total");
//         },
//     });
    
//     // frappe.ui.form.on('PCB Details', {
//     //     scan: function (frm, cdt, cdn) {
//     //         let d = locals[cdt][cdn];
//     //         let table = frm.fields_dict['pcb_details'].grid;
//     //         let table_index = table.grid_rows.findIndex(row => row.doc === d);
//     //         frappe.call({
//     //             method: "check_ducplicate_value",
//     //             args: {
//     //                 row_index: table_index
//     //             },
//     //             doc: frm.doc,
//     //         });
//     //     },
//     // });
    
//     // frappe.ui.form.on("Work Order", {
//     //     before_save: function(frm, cdt, cdn) {
//     // 		var d = locals[cdt][cdn];
//     //         if(d.qty == d_total){
//     // 			frappe.throw("Not Match Process PCB Qty")
//     //         }
//     //     } 
//     // });
    
//     // frappe.ui.form.on("Quotation", {
//     //     click_refresh: function(frm, cdt, cdn) {
//     //         var d = locals[cdt][cdn];
//     //         var total = 0;
//     //         if(d.conversion_rate >= 0 && d.purc_brokaerage_fob >= 0){
//     //         total = (((d.purc_brokaerage_fob / d.contracted_qty) / d.conversion_rate)).toFixed(2);
//     //         frm.set_value('purc_brokaerage_doller', total);
//     //         }
//     //     }
//     // });
    
    
//     frappe.ui.form.on("PCB Details", "qr_code", function(frm, cdt, cdn) {
//       var d = locals[cdt][cdn];
//       var entre = frappe.datetime.now_datetime()
//       frappe.model.set_value(cdt, cdn, 'current_time', entre);
//     });
//     //---------------------- End Custom Code 


// Work Order - Post Load Operations
frappe.ui.form.on("Work Order", {
    onload_post_render: function(frm) {
        if (frm.doc.operations) {
            frm.doc.operations.forEach(async (row) => {
                try {
                    const result = await frappe.db.get_value("Operation", row.operation, "custom_operation_time");
                    row.actual_operation_time = result.message.custom_operation_time;
                    frm.refresh_field("operations");
                } catch (error) {
                    console.error("Error fetching operation time:", error);
                }
            });
        }
    }
});

// PCB Details - QR Code Scanner
frappe.ui.form.on('PCB Details', {
    scan: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        const currentTime = new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
        
        new frappe.ui.Scanner({
            dialog: true,
            multiple: false,
            on_scan: function(data) {
                frappe.model.set_value(cdt, cdn, 'qr_code', data.decodedText);
                frm.refresh_field("qr_code");
                frm.refresh_table("pcb_details");
            }
        });
    }
});

// PCB Details - Barcode Scanner (Alternative Implementation)
frappe.ui.form.on('PCB Details', {
    scan_barcode: async function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        
        const scanner = new Instascan.Scanner({
            video: document.getElementById('scanner-container'),
            mirror: false,
            captureImage: true,
            refractoryPeriod: 200,
        });

        scanner.addListener('scan', async function(content) {
            frappe.model.set_value(cdt, cdn, 'qr_code', content);
            frm.refresh_field("qr_code");
            frm.refresh_table("pcb_details");
            scanner.stop();
        });

        try {
            const cameras = await Instascan.Camera.getCameras();
            if (cameras.length > 0) {
                const chosenCamera = cameras[0];
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { deviceId: chosenCamera.id },
                });

                const capabilities = chosenCamera.capabilities;
                const resolution = getBestResolution(capabilities);

                const constraints = {
                    width: { ideal: resolution.width },
                    height: { ideal: resolution.height },
                };

                stream.getTracks().forEach(track => track.stop());
                const newStream = await navigator.mediaDevices.getUserMedia({
                    video: { deviceId: chosenCamera.id, ...constraints },
                });

                scanner.start(newStream);
            } else {
                console.error('No cameras found.');
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    }
});

// Helper function for camera resolution
function getBestResolution(capabilities) {
    // Return the first resolution in capabilities as default
    // You can implement custom logic here based on your requirements
    return capabilities[0];
}

// PCB Details - QR Code Change Handler
frappe.ui.form.on("PCB Details", "qr_code", function(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
    var result = frappe.datetime.now_datetime();
    frappe.model.set_value(cdt, cdn, 'work_order_pcb_date', result);
});

// PCB Details - Duplicate QR Code Check
frappe.ui.form.on('PCB Details', {
    qr_code: function(frm, cdt, cdn) {
        let d = locals[cdt][cdn];
        let table = frm.fields_dict['pcb_details'].grid;
        let all_rows = frm.doc.pcb_details || [];
        let table_index = table.grid_rows.findIndex(row => row.doc === d);

        // Check for duplicate QR code in other rows
        let duplicate_found = all_rows.some((row, idx) => {
            return idx !== table_index && row.qr_code === d.qr_code;
        });

        if (duplicate_found) {
            frappe.msgprint({
                title: __("Error"),
                indicator: "red",
                message: __("QR Code Already Scanned")
            });
            d.qr_code = null;
            frm.refresh_field("qr_code");
        }
    }
});

// Work Order - Main Form Events
frappe.ui.form.on('Work Order', {
    before_submit: async function(frm) {
        try {
            // Calculate PCB total
            const pcb_total = frm.doc.pcb_details ? frm.doc.pcb_details.length : 0;
            frm.set_value('pcb_total', pcb_total);

            // Fetch items with limit_qty > 0
            const items = await frappe.db.get_list('Item', {
                filters: { limit_qty: [">", 0] },
                fields: ['used_qty', 'name', 'limit_qty']
            });

            if (items && items.length > 0) {
                for (let item of items) {
                    for (let required_item of frm.doc.required_items || []) {
                        if (required_item.item_code === item.name) {
                            const total = (item.used_qty || 0) + pcb_total;

                            if (total <= item.limit_qty) {
                                // Update used_qty and available_qty
                                await frappe.db.set_value('Item', item.name, 'used_qty', total);
                                const available_qty = item.limit_qty - total;
                                await frappe.db.set_value('Item', item.name, 'available_qty', available_qty);

                                frappe.msgprint({
                                    title: __('Updated'),
                                    message: `Item ${item.name} updated successfully. Available Quantity: ${available_qty}`,
                                    indicator: 'green'
                                });
                            } else {
                                frappe.throw({
                                    title: __('Limit Exceeded'),
                                    message: `Your Used Quantity for ${item.name} exceeds its limit (${item.limit_qty}).`,
                                    indicator: 'red'
                                });
                            }
                        }
                    }
                }
            }
        } catch (error) {
            frappe.msgprint({
                title: __('Error'),
                message: `An error occurred while updating items: ${error.message}`,
                indicator: 'red'
            });
            console.error('Error during before_submit:', error);
        }
    },

    before_cancel: async function(frm) {
        try {
            const items = await frappe.db.get_list('Item', {
                filters: { limit_qty: [">", 0] },
                fields: ['used_qty', 'name', 'limit_qty']
            });

            if (items && items.length > 0) {
                for (let item of items) {
                    for (let required_item of frm.doc.required_items) {
                        if (required_item.item_code === item.name) {
                            const updated_qty = item.used_qty - parseFloat(frm.doc.pcb_total || 0);
                            await frappe.db.set_value('Item', item.name, 'used_qty', updated_qty);

                            frappe.msgprint({
                                title: __('Updated'),
                                message: `Item ${item.name} updated successfully.`,
                                indicator: 'green'
                            });
                        }
                    }
                }
            }
        } catch (error) {
            frappe.msgprint({
                title: __('Error'),
                message: `An error occurred while updating items: ${error.message}`,
                indicator: 'red'
            });
            console.error('Error during before_cancel:', error);
        }
    },

    barcodescn: function(frm) {
        if (!frm.doc.barcodescn) {
            return;
        }

        let pcb_details = frm.doc.pcb_details || [];
        let current_idx = frm.doc.child_idx || 0;

        // Check for duplicate QR code
        let duplicate_found = pcb_details.some((row) => row.qr_code === frm.doc.barcodescn);
        if (duplicate_found) {
            frappe.msgprint({
                title: __("Error"),
                indicator: "red",
                message: __("QR Code Already Scanned")
            });
            frm.set_value("barcodescn", null);
            return;
        }

        // Check if current index exceeds quantity
        if (current_idx >= frm.doc.qty) {
            frappe.msgprint({
                title: __("Error"),
                indicator: "red",
                message: __("QR Code Completed..........")
            });
            frm.set_value("barcodescn", null);
            return;
        }

        // Update current row in PCB details
        if (pcb_details[current_idx]) {
            frappe.model.set_value(pcb_details[current_idx].doctype, pcb_details[current_idx].name, {
                qr_code: frm.doc.barcodescn,
                current_time: frappe.datetime.now_datetime(),
                work_order_pcb_date: frappe.datetime.now_datetime()
            });
        }

        // Increment child index and clear barcode field
        frm.set_value("child_idx", current_idx + 1);
        frm.set_value("barcodescn", null);
    },

    after_save: function(frm) {
        let assemble_qty = 0;
        
        // Fetch assemble_qty from BOM
        frappe.db.get_value('BOM', { name: frm.doc.bom_no }, 'assemble_qty')
            .then(r => {
                if (r.message) {
                    assemble_qty = r.message.assemble_qty;
                    
                    // Fetch BOM Items
                    frappe.db.get_list('BOM Item', {
                        filters: { parent: frm.doc.bom_no },
                        fields: ['item_code', 'qty', 'is_bulk_use', 'uom']
                    }).then(bom_items => {
                        if (bom_items && bom_items.length > 0) {
                            frm.doc.required_items.forEach(item => {
                                bom_items.forEach(bom_item => {
                                    if (item.item_code === bom_item.item_code) {
                                        if (bom_item.is_bulk_use) {
                                            let total = frm.doc.qty / assemble_qty;
                                            total = Math.ceil(total);
                                            frappe.model.set_value(item.doctype, item.name, 'required_qty', total);
                                        }
                                        frappe.model.set_value(item.doctype, item.name, 'uom', bom_item.uom);
                                    }
                                });
                            });
                        }
                        frm.refresh_field('required_items');
                    });
                }
            });
    }
});

// PCB Details - Total Count Updates
frappe.ui.form.on("PCB Details", {
    qr_code: function(frm) {
        var total = frm.doc.pcb_details.length;
        frm.set_value("pcb_total", total);
        frm.refresh_field("pcb_total");
    },
    
    pcb_details_remove: function(frm) {
        var total = frm.doc.pcb_details.length;
        frm.set_value("pcb_total", total);
        frm.refresh_field("pcb_total");
    }
});

// PCB Details - Current Time Update
frappe.ui.form.on("PCB Details", "qr_code", function(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
    var current_time = frappe.datetime.now_datetime();
    frappe.model.set_value(cdt, cdn, 'current_time', current_time);
});
