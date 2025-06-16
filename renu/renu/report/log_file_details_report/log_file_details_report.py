import frappe
from frappe import _

def execute(filters=None):
    # Fetching columns
    columns = get_columns()

    # Fetching data based on filters
    data = get_data(filters)

    return columns, data


def get_columns():
    return [
        {
            "label": _("Work Order"),
            "fieldname": "work_order",
            "fieldtype": "Link",
            "options": "Work Order",
            "width": 150
        },
          {
            "label": _("Employee"),
            "fieldname": "employee_name",
            "fieldtype": "Data",
            "width": 150
        },
        {
            "label": _("Operation"),
            "fieldname": "operation",
            "fieldtype": "Data",
            "width": 150
        },
        {
            "label": _("Pcb QR Code"),
            "fieldname": "pcb_qr_code",
            "fieldtype": "Data",
            "width": 200
        },
        {
            "label": _("From Time"),
            "fieldname": "from_time",
            "fieldtype": "Datetime",
            "width": 150
        },
        {
            "label": _("To Time"),
            "fieldname": "to_time",
            "fieldtype": "Datetime",
            "width": 150
        },
        {
            "label": _("PCB Test Results"),
            "fieldname": "pcb_test_results",
            "fieldtype": "Data",
            "width": 200
        }
    ]


def get_data(filters):
    if not filters:
        filters = {}

    # Base query
    query = """
        SELECT
            w.name AS work_order,
            jct.employee AS employee_name,
            j.operation AS operation,
            jct.pcb_qr_code AS pcb_qr_code,
            jct.from_time AS from_time,
            jct.to_time AS to_time,
            jct.pcb_test_results AS pcb_test_results
        FROM
            `tabWork Order` w
        LEFT JOIN `tabJob Card` j ON w.name = j.work_order
        LEFT JOIN `tabJob Card Time Log` jct ON j.name = jct.parent
        WHERE
            DATE(jct.from_time) >= %(from_date)s
            AND DATE(jct.to_time) <= %(to_date)s
    """

    # Add optional filter for work order if provided
    if filters.get("name"):
        query += " AND w.name = %(name)s"

    # Grouping
    query += " GROUP BY w.name, j.operation"

    # Execute the query using frappe.db.sql and pass filters for parameters
    return frappe.db.sql(query, filters, as_dict=True)