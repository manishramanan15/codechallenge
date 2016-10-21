using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using DB.OAuth.Service.DataBase;

namespace DB.OAuth.Service.Controllers
{

    [Authorize]
    public class SuppliersController : ODataController
    {
        private Northwind db = new Northwind();

        // GET: odata/Suppliers
        [EnableQuery]
        public IQueryable<Supplier> GetSuppliers()
        {
            return db.Suppliers;
        }

        // GET: odata/Suppliers(5)
        [EnableQuery]
        public SingleResult<Supplier> GetSupplier([FromODataUri] int key)
        {
            return SingleResult.Create(db.Suppliers.Where(supplier => supplier.SupplierID == key));
        }

        // PUT: odata/Suppliers(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Supplier> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Supplier supplier = db.Suppliers.Find(key);
            if (supplier == null)
            {
                return NotFound();
            }

            patch.Put(supplier);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupplierExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(supplier);
        }

        // POST: odata/Suppliers
        public IHttpActionResult Post(Supplier supplier)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Suppliers.Add(supplier);
            db.SaveChanges();

            return Created(supplier);
        }

        // PATCH: odata/Suppliers(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Supplier> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Supplier supplier = db.Suppliers.Find(key);
            if (supplier == null)
            {
                return NotFound();
            }

            patch.Patch(supplier);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupplierExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(supplier);
        }

        // DELETE: odata/Suppliers(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Supplier supplier = db.Suppliers.Find(key);
            if (supplier == null)
            {
                return NotFound();
            }

            db.Suppliers.Remove(supplier);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Suppliers(5)/Products
        [EnableQuery]
        public IQueryable<Product> GetProducts([FromODataUri] int key)
        {
            return db.Suppliers.Where(m => m.SupplierID == key).SelectMany(m => m.Products);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SupplierExists(int key)
        {
            return db.Suppliers.Count(e => e.SupplierID == key) > 0;
        }
    }
}
